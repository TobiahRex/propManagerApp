'use strict';

var express   = require('express');
var router    = express.Router();
var Property  = require('../models/property');

router.route('/')
.get((req, res)     => Property.find({}, res.handle))
.post((req, res)    => Property.create(req.body, res.handle));

router.route('/:id')
.get((req, res)     => Property.findById(req.params.id, res.handle))
.delete((req, res)  => Property.findByIdAndRemove(req.params.id, res.handle))
.put((req, res)     => { let editObj = {id : req.params.id, body : req.body};
  Property.updateOne(editObj, res.handle)
});

router.route('/sale/:id')
.put((req, res)     => Property.sale(req.body, res.handle));


module.exports = router;
