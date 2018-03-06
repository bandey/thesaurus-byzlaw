var debug = require('debug')('routes:forms');

var express = require('express');
var router = express.Router();

var hpp = require('hpp'); // protection from HTTP Parameter Pollution attacks

var mongoose = require('mongoose');
var BptForm = require('../models/BptForm.js');

// GET /forms[?parent_id=x]
router.get('/', hpp(), function (req, res, next) {
  debug("get list");
  var parentId = req.query.parent_id;
  debug('parent_id = ' + parentId);

  var filter;
  if (parentId) {
    if (/\D/.test(parentId)) { // unallowed value
      return res.json([]);
    }
    filter = { parent_id: parseInt(parentId, 10) };
  } else {
    filter = {}; // select all records in collection
  }

  BptForm.find(filter).select({
    _id: 1,
    name: 1,
    font: 1
  }).sort({ posit: 1 }).exec(function (err, records) {
    debug(err);
    debug(records);
    if (err) return next(err);
    return res.json(records);
  });
});

module.exports = router;