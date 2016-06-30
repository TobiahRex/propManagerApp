'use strict';

var express   = require('express');
var router    = express.Router();
var Property  = require('../models/property');

router.get('/details', (req, res)=> Property.find({}).populate('Owner').exec(res.handle));

router.route('/sold/:id')
.put((req, res)     => Property.sell(req.body, req.params.id, res.handle))

router.route('/:id')
.get((req, res)     => Property.findById(req.params.id).populate('Owner').exec(res.handle))
.delete((req, res)  => Property.findByIdAndRemove(req.params.id, res.handle))
.put((req, res)     => Property.updateOne(req.params.id, req.body, res.handle));

router.route('/')
.get((req, res)     => Property.find({}, res.handle))
.post((req, res)    => Property.create(req.body, res.handle))
.delete((req, res)  => Property.remove({}, res.handle));

module.exports = router;
