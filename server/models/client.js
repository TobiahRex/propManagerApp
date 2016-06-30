'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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

clientSchema.statics.makeOne = (reqObj, cb) => {
  Client.create(reqObj, (err, newClient)=> {
    if(err) return cb(err);
    Client.find(newClient._id, (err, savedClient)=> {
      err ? cb(err) : cb(null, savedClient);
    });
  });
};

clientSchema.statics.getOne = (reqId, cb) => {
  Client.findById(reqId, (err, dbClient)=> {
    err ? cb(err) : cb(null, dbClient);
  });
};

clientSchema.statics.removeOne = (reqId, cb) => {
  Client.findByIdAndRemove(reqId, (err, oldClient) => {
    err ? cb(err) : cb(null, {SUCCESS: `Client: ${oldClient} has been removed.`});
  });
};

clientSchema.statics.updateOne = (editObj, cb) => {
  Client.findByIdAndUpdate(editObj.id, {$set : editObj.body}, (err, oldDbClient)=> {
    if(err) return cb(err);
    Client.findById(oldDbClient._id, (err, savedClient)=> {
      err ? cb(err) : cb(null, savedClient);
    });
  });
};

let Client = mongoose.model('Client', clientSchema);
module.exports = Client;
