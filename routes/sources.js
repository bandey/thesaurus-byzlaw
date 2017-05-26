var debug = require('debug')('routes:sources');

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var BptSource = require('../models/BptSource.js');

// GET /sources
router.get('/', function (req, res, next) {
  debug("get list");
  BptSource.getListForLang(req.language)
    .then(function (records) {
      debug(records);
      res.json(records);
    })
    .catch(function (err) {
      debug(err);
      next(err);
    });
});

module.exports = router;