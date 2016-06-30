'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Client     = require('./client');

let propertySchema = new mongoose.Schema({
  Owner       :   {
    type        :     ObjectId,
    ref         :     'Client'
  },
  PostedDate  :   {
    type        :     Date,
    default     :     Date.now
  },
  SaleDate    :   {
    type        :     Date,
  },
  Value       :   {
    type        :     Number,
    min         :     1000
  },
  Address     :   {
    city        :     {
      type        :     String
    },
    state       :     {
      type        :     String
    },
    zip         :     {
      type        :     String
    },
    country     :     {
      type        :     String
    }
  },
  SoldPrice   :   {
    type        :   Number
  },
  Buyer       :   {
    type        :   ObjectId,
    ref         :   'Client'
  }
});

propertySchema.statics.makeOne = (reqObj, cb) => {
  Property.create(reqObj, (err, newProperty)=> {
    if(err) return cb(err);
    Property.find(newProperty._id, (err, savedProperty)=> {
      err ? cb(err) : cb(null, savedProperty);
    });
  });
};

propertySchema.statics.getOne = (reqId, cb) => {
  Property.findById(reqId, (err, dbProperty)=> {
    err ? cb(err) : cb(null, dbProperty);
  });
};

propertySchema.statics.removeOne = (reqId, cb) => {
  Property.findByIdAndRemove(reqId, (err, oldProperty) => {
    err ? cb(err) : cb(null, {SUCCESS: `Property: ${oldProperty} has been removed.`});
  });
};

propertySchema.statics.updateOne = (editObj, cb) => {
  Property.findByIdAndUpdate(editObj.id, {$set : editObj.body}, (err, oldDbProperty)=> {
    if(err) return cb(err);
    Property.findById(oldDbProperty._id, (err, savedProperty)=> {
      err ? cb(err) : cb(null, savedProperty);
    });
  });
};

propertySchema.statics.sale = (saleObj, cb) => {
  if(!saleObj.UserId || !saleObj.PropertyId) return cb({ERROR : 'Did not provide necessary Ids'});

  Property.findById(saleObj.PropertyId, (err, dbProperty)=> {
    if(err) return cb(err);
    Client.findByid(saleObj.ClientId, (err, dbClient)=> {
      err ? cb(err) :
      dbClient.Properties.IndexOf(dbProperty._id) !== -1 ? cb({ERROR : 'Client already owns this property.'}) :
      dbProperty.Owner === dbClient._id ? cb({ERROR : 'Client already owns this property.'}) :

      dbClient.Properties.push(dbProperty._id);
      dbProperty.Owner = dbClient._id;

      dbClient.save(err => {
        dbProperty.save(err => {
          err ? cb(err) : cb(null, {SUCCESS : `Property ${dbProperty._id} has been sold to Client: ${dbClient.Name}`});
        });
      });
    });
  });
};

propertySchema.statics.moveIn = (moveObj, cb) => {
  if(!moveObj) return cb({ERROR : 'DO NOT '});
    
}


let Property = mongoose.model('Property', propertySchema);
module.exports = Property;
