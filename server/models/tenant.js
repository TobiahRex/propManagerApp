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
  // Email       :   {
  //   type        :     String,
  //   validate    : {
  //     validator   : function(v){
  //       return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
  //     },
  //     message     : '{VALUE} is not a valid email address!'
  //   },
  //   required    : [true, 'User email required.']
  // },
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
      dbTenant.Address    = dbProperty._id;
      dbTenant.Rent       = dbProperty.MonthlyRent;

      dbProperty.save(se1 => {
        dbTenant.save(se2 => {
          (se1 || se2) ? cb(se1 || se2) : cb(null, {SUCCESS : `Tenant ${dbTenant._id} moved in to ${dbProperty.Address} : ${dbProperty._id}`});
        });
      });
    });
  });
};

tenantSchema.statics.moveOut = (moveObj, cb) => {
  if(!moveObj) return cb({ERROR : 'Did not provide necessary fields.'});
  Tenant.findById(moveObj.tenant, (err1, dbTenant)=>{
    Property.findById(moveObj.property, (err2, dbProperty)=>{
      if(err1 || err2) return cb(err1 || err2);

      if(dbProperty.Tenants.indexOf(dbTenant._id) === -1)   return cb({ERROR : 'Tenant does not live at that Property. INCORRECT TENANT'});
      if(dbTenant.Address !=== dbProperty._id)              return cb({ERROR : 'Tenant lives at a different address. INCORRECT ADDRESS'});

      dbProperty.Tenants.splice(dbProperty.Tenants.indexOf(dbTenant._id));
      dbProperty.Occupants.total -= 1;
      dbTenant.Address  = null;
      dbTenant.Rent     = 0;

      dbTenant.save(se1 => {
        dbProperty.save(se2 => {
          se1 || se2 ? cb(se1 || se2) : cb(null, {SUCCESS : `Tenant ${dbTenant._id} moved out of ${dbProperty.Address} : ${dbProperty._id}`});
        });
      });
    });
  });
};


let Tenant = mongoose.model('Tenant', tenantSchema);
module.exports = Tenant;
