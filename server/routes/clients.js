'use strict';

var express = require('express');
var router = express.Router();
var Client = require('../models/client');

router.route('/sale')
.post((req, res)    => Client.buy(req.body, res.handle))
.delete((req, res)  => Client.sell(req.body, req.params.id, res.handle));

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




module.exports = router;
