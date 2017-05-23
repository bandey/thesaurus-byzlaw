var debug = require('debug')('routes:undex');

var express = require('express');
var router = express.Router();

var helmet = require('helmet'); // controls security HTTP headers

var mongoose = require('mongoose');
var BptSource = require('./../models/BptSource.js');

var wireUp = require('./../universal/dst/wire-up.js');

// GET home page
router.get('/', helmet({ // security middleware
  frameguard: { action: 'deny' },
  hidePoweredBy: false, // it was made by hand at begining of app.js
  hsts: false, // hsts works only for https
}), function (req, res, next) {
  debug("get list of sources");
  // Load initial list of sources
  BptSource.find().select({ // can be moved into model BptSource as separate function
    _id: 1,
    name: 1,
    lang: 1
  }).sort({ posit: 1 }).exec(function (err, records) {
    debug(err);
    debug(records);
    if (err) return next(err);

    wireUp(records, req, res, next);
  });
});

module.exports = router;