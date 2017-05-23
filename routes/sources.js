var debug = require('debug')('routes:sources');

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var BptSource = require('../models/BptSource.js');

// GET /sources
router.get('/', function (req, res, next) {
  debug("get list");
  BptSource.find().select({
    _id: 1,
    name: 1,
    lang: 1
  }).sort({ posit: 1 }).exec(function (err, records) {
    debug(err);
    debug(records);
    if (err) return next(err);
    return res.json(records);
  });
});

module.exports = router;