'use strict';

var express = require('express');
var router = express.Router();

router.use('/clients', require('./clients'));
router.use('/properties', require('./properties'));
router.use('/tenants', require('./tenants'));

module.exports = router;
