'use strict';

var express = require('express');
var router = express.Router();
var Clients = require('../models/client');


router.route('/')
.get((req, res)     => Clients.find({}, res.handle))
.post((req, res)    => Clients.create(req.body, res.handle))
.delete((req, res)  => Clients.remove({}, res.handle));

router.route('/:id')
.get((req, res)     => Clients.findById(req.params.id, res.handle))
.delete((req, res)  => Clients.findByIdAndRemove(req.params.id, res.handle))
.put((req, res)     => Clients.findByIdAndUpdate(req.params.id, req.body, {new: true}, res.handle));



module.exports = router;
