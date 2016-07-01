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
  BuyPrice    :   {
    type        :   Number
  },
  BuyDate     :   {
    type        :   Date
  },
  Occupants   :   {
    max         :   {
      type        :   Number
    },
    total       :   {
      type        :   Number,
      default     :   0
    }
  },
  Tenants     :   [{
    type        :   ObjectId,
    ref         :   'Client'
  }],
  MonthlyRent :   {
    type        :   Number
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

propertySchema.statics.sell = (clientId, propId, cb) => {
  if(!clientId || !propId) return cb({ERROR : 'Did not provide necessary Ids'});
  Property.findById(propId, (err1, dbProperty)=> {
    Client.findById(clientId.client, (err2, dbClient)=> {
      (err1 || err2) ? cb(err1 || err2) :
      dbProperty.Owner === dbClient._id ? cb({ERROR : 'Client already owns this property.'}) :
      dbClient.Properties.indexOf(dbProperty._id) !== -1 ? cb({ERROR : 'Client already owns this property.'}) :

      dbClient.Properties.push(dbProperty._id);
      dbProperty.Owner = dbClient._id;
      dbProperty.SellDate = Date.now();

      dbClient.save(errS1 => {
        dbProperty.save(errS2 => {
          (errS1 || errS2) ? cb(errS1 || errS2) : cb(null, {SUCCESS : `Property ${dbProperty._id} has been sold to Client: ${dbClient.Name.first} ${dbClient.Name.last}`});
        });
      });
    });
  });
};

propertySchema.statics.toMarket = (propId, cb) => {
  if(!moveObj) return cb({ERROR : 'DO NOT '});

}


let Property = mongoose.model('Property', propertySchema);
module.exports = Property;
