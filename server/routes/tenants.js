'use strict';

const express   = require('express');
const router    = express.Router();
const Client    = require('../models/client');
const Property  = require('../models/property');
const Tenant    = require('../models/tenant');

router.route('/move')
.post((req, res)    => Tenant.moveIn(req.body, res.handle))
.put((req, res)     => Tenant.moveOut(req.body, res.handle));

router.delete('/reset', (req, res)=> {
  Property
  .find({}, (err, dbProperties)=>{
    dbProperties.forEach(property=>{
      property.Tenants = [];
      property.save();
    });
  });
  Tenant.find({}, (err, dbTenants)=> {
    dbTenants.forEach(tenant=> {
      tenant.Properties = []
      tenant.save();
    });
  });
  res.status(200).send('Fields Cleared.');
});

router.route('/:id')
.get((req, res)     => Tenant.findById(req.params.id, res.handle))
.delete((req, res)  => Tenant.findByIdAndRemove(req.params.id, res.handle))
.put((req, res)     => Tenant.findByIdAndUpdate(req.params.id, req.body, {new: true}, res.handle));

router.route('/')
.get((req, res)     => Tenant.find({}, res.handle))
.post((req, res)    => Tenant.create(req.body, res.handle))
.delete((req, res)  => Tenant.remove({}, res.handle));

module.exports = router;
