var debug = require('debug')('routes:lexemes');

var express = require('express');
var router = express.Router();

var hpp = require('hpp'); // protection from HTTP Parameter Pollution attacks

var mongoose = require('mongoose');
var BptLexeme = require('../models/BptLexeme.js');

// GET /lexemes[?parent_id=x]
router.get('/', hpp(), function (req, res, next) {
  debug("get list");
  var parentId = req.query.parent_id;
  debug('parent_id = ' + parentId);

  BptLexeme.getListForLang(req.language, parentId)
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