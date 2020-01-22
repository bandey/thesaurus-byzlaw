var debug = require('debug')('routes:index');

var express = require('express');
var router = express.Router();

var helmet = require('helmet'); // controls security HTTP headers

var mongoose = require('mongoose');
var BptSource = require('./../models/BptSource.js');

var wireUp = require('./../universal/dst/wire-up.js');

// config for security middleware
var configHelmet = { 
  frameguard: { action: 'deny' },
  hidePoweredBy: false, // it was made by hand at begining of app.js
  hsts: false, // to be able to simply switch to http
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://www.googletagmanager.com/",
        "https://www.google-analytics.com/",
      ],
    },
    reportOnly: false,
    setAllHeaders: false,
    disableAndroid: false,
  },
};

// GET home page
router.get('/', helmet(configHelmet), function (req, res, next) {
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