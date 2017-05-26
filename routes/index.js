var debug = require('debug')('routes:index');

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
  BptSource.getListForLang(req.language) // Load initial list of sources
    .then(function (records) {
      debug(records);
      wireUp(records, req, res, next);
    })
    .catch(function (err) {
      debug(err);
      next(err);
    });
});

module.exports = router;