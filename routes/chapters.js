var debug = require('debug')('routes:chapters');

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var BptChapter = require('../models/BptChapter.js');
var BptLinkChapter = require('../models/BptLinkChapter.js');

// GET /chapters
router.get('/', function (req, res, next) {
  debug("get list");
  BptChapter.find().select({
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

// GET /chapters/of/keyword/5
router.get('/of/:link_name/:link_id', function (req, res, next) {
  debug("get list");
  var linkName = req.params.link_name;
  var linkId = req.params.link_id;
  debug('link_name = ' + linkName);
  debug('link_id = ' + linkId);

  if ((!['keyword'].includes(linkName)) || (/\D/.test(linkId))) {
    return res.json([]); // unallowed values
  }
  var filter = { link_name: linkName, link_id: linkId };

  BptLinkChapter.findOne(filter).populate({
    path: 'chapters',
    select: '_id name font',
    options: { sort: 'posit' }
  }).exec(function (err, linkRecord) {
    debug(err);
    debug(linkRecord);
    if (err) return next(err);
    if (linkRecord && linkRecord.chapters) {
      return res.json(linkRecord.chapters);
    } else {
      return res.json([]);
    }
  });
});

// GET /chapters/2
router.get('/:id', function (req, res, next) {
  var paramId = req.params.id;
  debug("get " + paramId);

  if (/\D/.test(paramId)) { // unallowed value
    return res.json(null);
  }
  var filter = { _id: parseInt(paramId, 10) };

  BptChapter.findOne(filter).select({
    _id: 1,
    content: 1,
    content_font: 1
  }).exec(function (err, record) {
    debug(err);
    debug(record);
    if (err) return next(err);
    return res.json(record);
  });
});

module.exports = router;