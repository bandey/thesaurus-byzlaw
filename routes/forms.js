var debug = require('debug')('routes:forms');

var express = require('express');
var router = express.Router();

var hpp = require('hpp'); // protection from HTTP Parameter Pollution attacks

var mongoose = require('mongoose');
var BptForm = require('../models/BptForm.js');
var BptMeaning = require('../models/BptMeaning.js');

// GET /forms[?parent_id=x]
router.get('/', hpp(), function (req, res, next) {
  debug("get list");
  var parentId = req.query.parent_id; // really id of grandparent (lexeme_id)
  debug('parent_id = ' + parentId);

  var filter;
  if (parentId) {
    if (/\D/.test(parentId)) { // unallowed value
      return res.json([]);
    }
    filter = { parent_id: parseInt(parentId, 10) };

    // select all meanings with given lexeme_id
    BptMeaning.find(filter).select({_id: 1}).exec(function (err, records) {
      debug(err);
      if (err) return next(err);
      debug(records);

      // form filter as array of meaning ids
      var meaningIds = records.map(function (item) { return item._id; });
      filter = { parent_id: { $in: meaningIds } };
      debug(filter);

      // select all wordforms with meaning_id exists in filter array
      BptForm.find(filter).select({
        _id: 1,
        name: 1,
        font: 1
      }).sort({ posit: 1 }).exec(function (err, records) {
        debug(err);
        if (err) return next(err);
        debug(records);

        // filter duplicating wordforms from result array
        var distinctForms = records.filter(function (record, pos) {
          return pos === records.findIndex(function (item) {
            return (item.name === record.name) && (item.font === record.font);
          }); 
        });

        return res.json(distinctForms);
      });
    });
  } else { // select all records in collection
    BptForm.find({}).select({
      _id: 1,
      name: 1,
      font: 1
    }).sort({ posit: 1 }).exec(function (err, records) {
      debug(err);
      if (err) return next(err);
      debug(records);
      return res.json(records);
    });
  }
});

module.exports = router;