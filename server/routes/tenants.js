'use strict';

const express   = require('express');
const router    = express.Router();
const Tenant    = require('../models/tenant');

router.get('/details', (req, res)=> Tenant.find({}).populate('Address').exec(res.handle));

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


router.route('/')
.get((req, res)     => Tenant.find({}, res.handle))
.post((req, res)    =>
{
  console.log('req.body: ', req.body);
  Tenant.create(req.body, res.handle)
})
.delete((req, res)  => Tenant.remove({}, res.handle));

router.route('/:id')
.get((req, res)     => Tenant.findById(req.params.id, res.handle))
.delete((req, res)  => Tenant.findByIdAndRemove(req.params.id, res.handle))
.put((req, res)     => Tenant.findByIdAndUpdate(req.params.id, req.body, {new: true}, res.handle));

module.exports = router;
