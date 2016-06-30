'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Property = require('./property');


let clientSchema = new mongoose.Schema({
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
    },
    required    : [true, 'User email required.']
  },
  Username    :  {
    type        :     String,
    required    :     true,
    unique      :     true,
    max         :     12
  },
  Properties  :  [{
    type        :   ObjectId,
    ref         :   'Property'
  }]
});

clientSchema.statics.buy = (buyObj, cb) => {
  if(!buyObj) return cb({ERROR : 'Did not provide necessary fields.'});
  Client.findById(buyObj.buyer, (err1, dbBuyer)=> {
    Property.findById(buyObj.property, (err2, dbProperty)=>{
      if(err1 || err2) cb(err1 || err2);
      if(dbProperty.Owner === dbBuyer._id.toString())                  return cb({ERROR : 'Client already owns that property.'});
      if(dbBuyer.Properties.indexOf(dbProperty._id.toString()) !== -1) return cb({ERROR : 'Client already owns that property.'});

      dbProperty.Owner      = dbBuyer._id;
      dbProperty.BuyPrice   = buyObj.buyPrice;
      dbProperty.BuyDate    = Date.now();
      dbBuyer.Properties.push(dbProperty._id);

      dbProperty.save(se1 => {
        dbBuyer.save(se2 => {
          (se1 || se2) ? cb(se1 || se2) : cb(null, {SUCCESS : `Property ${dbProperty._id} purchased by ${dbBuyer.Name.first} ${dbBuyer.Name.last} : id ${buyObj.buyer}`});
        });
      });
    });
  });
};

clientSchema.statics.sell = (sellObj, cb) => {
  if(!sellObj) return cb({ERROR : 'Did not provide necessary fields.'});
  Client.findById(sellObj.buyer, (err1, dbBuyer)=>{
    Property.findById(sellObj.property, (err2, dbProperty)=>{
      Client.findById(sellObj.seller, (err3, dbSeller)=> {
        if(err1 || err2 || err3) return cb(err1 || err2 || err3);
        // console.log('dbProperty.Owner === sellObj.buyer: ', dbProperty.Owner.toString() === sellObj.seller);
        if(dbProperty.Owner.toString() !== sellObj.seller)                           return cb({ERROR : 'Seller is not the Owner.'});
        if(dbSeller.Properties.indexOf(dbProperty._id.toString()) === -1) return cb({ERROR : 'Seller does not own that property.'});
        if(dbProperty.Owner.toString() === sellObj.buyer)                            return cb({ERROR : 'Buyer is the Owner.'});
        if(dbBuyer.Properties.indexOf(dbProperty._id.toString()) !== -1)  return cb({ERROR : 'Buyer already owns that property.'});

        console.log('splice test: ', dbSeller.Properties.splice(dbSeller.Properties.indexOf(dbProperty._id)));
        // dbSeller.Properties.splice(dbSeller.Properties.indexOf(dbProperty._id));
        dbBuyer.Properties.push(dbProperty._id);
        dbProperty.Owner     = dbBuyer._id;
        dbProperty.BuyPrice  = sellObj.buyPrice;
        dbProperty.BuyDate   = Date.now();

        dbProperty.save(se1 => {
          dbBuyer.save(se2 => {
            se1 || se2 ? cb(se1 || se2) : cb(null, {SUCCESS : `Property ${dbProperty._id} purchased by ${dbBuyer.Name.first} ${dbBuyer.Name.last} : ${sellObj.buyer} \n from ${dbSeller._id}`});
          })
        });
      });
    });
  });
};


let Client = mongoose.model('Client', clientSchema);
module.exports = Client;
