'use strict';

const mongoose  = require('mongoose');
const ObjectId  = mongoose.Schema.Types.ObjectId;
const Client    = require('./client');
const Property  = require('./property')


let tenantSchema = new mongoose.Schema({
  Name        :   {
    first       :   {
      type        :   String
    },
    last        :   {
      type        :   String
    }
  },
  Email       :   {
    type        :     String,
    validate    : {
      validator   : function(v){
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message     : '{VALUE} is not a valid email address!'
    }
    // required    : [true, 'User email required.']
  },
  Username    :  {
    type        :     String,
    required    :     true,
    unique      :     true,
    max         :     12
  },
  Address     :  {
    type        :   ObjectId,
    ref         :   'Property'
  },
  Rent        :  {
    type        :   Number
  }
});

tenantSchema.statics.moveIn = (moveObj, cb) => {
  if(!moveObj) return cb({ERROR : 'Did not provide necessary fields.'});
  Tenant.findById(moveObj.tenant, (err1, dbTenant)=> {
    Property.findById(moveObj.property, (err2, dbProperty)=>{
      if(err1 || err2) cb(err1 || err2);
      if(dbProperty.Tenants.indexOf(dbTenant._id.toString()) !== -1) return cb({ERROR : 'Client already lives at that property.'});
      if(dbProperty.Occupants.max === dbProperty.Occupants.total) return cb({ERROR : 'That Property already has Max Occupancy'});

      dbProperty.Tenants.push(dbTenant._id);
      dbProperty.Occupants.total += 1;
      dbTenant.Properties.push(dbProperty._id);
      dbTenant.Address    = dbProperty.Address;
      dbTenant.Rent       = dbProperty.MonthlyRent;

      dbProperty.save(se1 => {
        dbTenant.save(se2 => {
          (se1 || se2) ? cb(se1 || se2) : cb(null, {SUCCESS : `Tenant ${dbTenant._id} moved in to ${dbProperty.Address} : ${dbProperty._id}`});
        });
      });
    });
  });
};

tenantSchema.statics.sell = (sellObj, cb) => {
  if(!sellObj) return cb({ERROR : 'Did not provide necessary fields.'});
  Tenant.findById(sellObj.buyer, (err1, dbBuyer)=>{
    Property.findById(sellObj.property, (err2, dbProperty)=>{
      Tenant.findById(sellObj.seller, (err3, dbSeller)=> {
        if(err1 || err2 || err3) return cb(err1 || err2 || err3);
        // console.log('dbProperty.Owner === sellObj.buyer: ', dbProperty.Owner.toString() === sellObj.seller);
        if(dbProperty.Owner.toString() !== sellObj.seller)                           return cb({ERROR : 'Seller is not the Owner.'});
        if(dbSeller.Properties.indexOf(dbProperty._id.toString()) === -1) return cb({ERROR : 'Seller does not own that property.'});
        if(dbProperty.Owner.toString() === sellObj.buyer)                            return cb({ERROR : 'Buyer is the Owner.'});
        if(dbBuyer.Properties.indexOf(dbProperty._id.toString()) !== -1)  return cb({ERROR : 'Buyer already owns that property.'});

        dbSeller.Properties.splice(dbSeller.Properties.indexOf(dbProperty._id));
        dbBuyer.Properties.push(dbProperty._id);
        dbProperty.Owner     = dbBuyer._id;
        dbProperty.BuyPrice  = sellObj.buyPrice;
        dbProperty.BuyDate   = Date.now();

        dbSeller.save(se1 => {
          dbProperty.save(se2 => {
            dbBuyer.save(se3 => {
              se1 || se2 || se3 ? cb(se1 || se2 || se3) : cb(null, {SUCCESS : `Property ${dbProperty._id} purchased by ${dbBuyer.Name.first} ${dbBuyer.Name.last} : ${sellObj.buyer} \n from ${dbSeller._id}`});
            })
          })
        });
      });
    });
  });
};


let Tenant = mongoose.model('Tenant', tenantSchema);
module.exports = Tenant;
