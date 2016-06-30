'use strict';

const express   = require('express');
const router    = express.Router();
const Client    = require('../models/client');
const Property  = require('../models/property');


router.route('/sale')
.post((req, res)    => Client.buy(req.body, res.handle))
.put((req, res)     => Client.sell(req.body, res.handle));

router.delete('/reset', (req, res)=> {
  Property
  .find({}, (err, dbProperties)=>{
    dbProperties.forEach(property=>{
      property.Owner = null;
      property.save();
    });
  });
  Client.find({}, (err, dbClients)=> {
    dbClients.forEach(client=> {
      client.Properties = []
      client.save();
    });
  });
  res.status(200).send('it worked.');
});

router.route('/:id')
.get((req, res)     => Client.findById(req.params.id, res.handle))
.delete((req, res)  => Client.findByIdAndRemove(req.params.id, res.handle))
.put((req, res)     => Client.findByIdAndUpdate(req.params.id, req.body, {new: true}, res.handle));

router.route('/')
.get((req, res)     => Client.find({}, res.handle))
.post((req, res)    => Client.create(req.body, res.handle))
.delete((req, res)  => Client.remove({}, res.handle));

module.exports = router;
