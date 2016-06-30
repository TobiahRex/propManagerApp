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

let Qerr = new Error('Did not provide required fields for Query.');
let Qcheck = (queryData, cb) =>{ if(!queryData) return cb(Qerr);}

clientSchema.statics.buy = (buyObj, cb) => {
  Qcheck(buyObj, cb);
  Client.findById(buyObj.client, (err1, dbClient)=> {
    Property.findById(buyObj.property, (err2, dbProperty)=>{
      if(err1 || err2) cb(err1 || err2);

      dbProperty.Owner === dbClient._id ? cb({ERROR : 'Client already owns that property.'}) :
      dbClient.Properties.indexOf(dbProperty._id) !== -1 ? cb({ERROR : 'Client already owns that property.'}) :

      dbProperty.Owner      = dbClient._id;
      dbProperty.BuyPrice   = buyObj.buyPrice;
      dbProperty.BuyDate    = Date.now();

      dbClient.Properties.push(dbProperty._id);

      dbProperty.save(se1 => {
        dbClient.save(se2 => {
          (se1 || se2) ? cb(se1 || se2) : cb(null, {SUCCESS : `Property ${dbProperty._id} purchased by ${dbClient.Name.first} ${dbClient.Name.last}`});
        });
      });
    });
  });
};

clientSchema.statics.sell = (sellObj, clientId, cb) => {
  Qcheck(sellObj, cb);
  Client.findById(clientId, (err1, dbClient)=> {
    Property.findById(sellObj.property, (err2, dbProperty)=>{
      if(err1 || err2) cb(err1 || err2);
      console.log('property owner?: ', dbProperty.Owner == clientId);
      console.log('Owner: ', dbProperty.Owner, '\nClient: ', clientId);

      dbProperty.Owner != clientId ? cb({ERROR : 'Client does not own that property.'}) :
      dbClient.Properties.indexOf(dbProperty._id) === -1 ? cb({ERROR : 'Client does not own that property.'}) :

      dbProperty.Owner      = null;
      dbProperty.SoldPrice  = sellObj.sellPrice;
      dbProperty.SellDate   = Date.now();

      dbClient.Properties.push(dbProperty._id);

      dbProperty.save(se1 => {
        dbClient.save(se2 => {
          (se1 || se2) ? cb(se1 || se2) : cb(null, {SUCCESS : `Property ${dbProperty._id} purchased by ${dbClient.Name.first} ${dbClient.Name.last} : ${sellObj.buyer}`});
        });
      });
    });
  });
};


let Client = mongoose.model('Client', clientSchema);
module.exports = Client;
