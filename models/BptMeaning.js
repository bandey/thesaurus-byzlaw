var mongoose = require('mongoose');

var BptMeaningSchema = new mongoose.Schema({
  _id: { type: Number, min: 1 },
  parent_id: { type: Number, min: 1 },
  posit: { type: Number, min: 1 },
  font: { type: String, required: true, maxlength: 20 },
  name_en: { type: String, required: true, maxlength: 150 },
  name_ru: { type: String, required: true, maxlength: 150 },
});

/**
 * Method of class: get child records for specified parent, sorted by posit field
 * result records contain all fields
 * @param {Number} parentId - parent id
 * @param {Function(err,records)} cb - pass array of records to callback
 */
BptMeaningSchema.statics.getListOverall = function (parentId, cb) {
  var filter;
  if (parentId) {
    if (/\D/.test(parentId)) { // unallowed value
      return cb(null, []); // return empty erray
    }
    filter = { parent_id: parseInt(parentId, 10) };
  } else {
    filter = {}; // select all records in collection
  }

  BptMeaning.find(filter).sort({ posit: 1 }).exec(cb);
};

/**
 * Method of class: get child records for specified parent, sorted by posit field
 * result records contain fields: _id, font, name - on specified language
 * @param {String} lang - language for name, eg 'en', 'ru'
 * @param {Number} parentId - parent id
 * @return {Promise} - pass array of records to resolve
 */
BptMeaningSchema.statics.getListForLang = function (lang, parentId) {
  if (!lang) {
    return Promise.reject(new Error('No language passed'));
  }

  return new Promise(function (resolve, reject) {
    BptMeaning.getListOverall(parentId, function (err, records) {
      if (err) {
        return reject(err);
      }

      var results = records.map(function (record) {
        var name = record['name_' + lang];
        if (name) name = name.replace(/\^/g, '');
        return {
          _id: record._id,
          font: record.font,
          name: name
        };
      });

      resolve(results);
    });
  });
};

var BptMeaning = mongoose.model('BptMeaning', BptMeaningSchema, 'bpt_meaning');

module.exports = BptMeaning;
