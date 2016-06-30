'use strict';

const express   = require('express');
const router    = express.Router();
const Client    = require('../models/client');
const Property  = require('../models/property');


router.route('/sale')
.post((req, res)    => Client.buy(req.body, res.handle))
.put((req, res)     => Client.sell(req.body, res.handle));

router.route('/:id')
.get((req, res)     => Client.findById(req.params.id, res.handle))
.delete((req, res)  => Client.findByIdAndRemove(req.params.id, res.handle))
.put((req, res)     => Client.findByIdAndUpdate(req.params.id, req.body, {new: true}, res.handle));

router.route('/move')
.post((req, res)    => Client.moveIn(req.body, res.handle))
.delete((req, res)  => Client.moveOut(req.body, res.handle));

router.route('/')
.get((req, res)     => Client.find({}, res.handle))
.post((req, res)    => Client.create(req.body, res.handle))
.delete((req, res)  => Client.remove({}, res.handle));

router.delete('/reset', (req, res)=> {
  Property
  .find({}, (err, dbProperty)=>{
    dbProperty.Owner = null;
  });


})


module.exports = router;
