var mongoose = require('mongoose');

var BptLexemeSchema = new mongoose.Schema({
  _id: { type: Number, min: 1 },
  parent_id: { type: Number, min: 1 },
  posit: { type: Number, min: 1 },
  lang: { type: String, required: true, maxlength: 10 },
  name: { type: String, required: true, maxlength: 50 },
  annex: { type: String, maxlength: 150 }, // for old version compatibility
  annex_en: { type: String, maxlength: 150 },
  annex_ru: { type: String, maxlength: 150 },
});

/**
 * Method of class: get child records for specified parent, sorted by posit field
 * result records contain all fields
 * @param {Number} parentId - parent id
 * @param {Function(err,records)} cb - pass array of records to callback
 */
BptLexemeSchema.statics.getListOverall = function (parentId, cb) {
  var filter;
  if (parentId) {
    if (/\D/.test(parentId)) { // unallowed value
      return cb(null, []); // return empty erray
    }
    filter = { parent_id: parseInt(parentId, 10) };
  } else {
    filter = {}; // select all records in collection
  }

  BptLexeme.find(filter).sort({ posit: 1 }).exec(cb);
};

/**
 * Method of class: get child records for specified parent, sorted by posit field
 * result records contain fields: _id, lang, name, annex - on specified language
 * @param {String} lang - language for annex, eg 'en', 'ru'
 * @param {Number} parentId - parent id
 * @return {Promise} - pass array of records ro resolve
 */
BptLexemeSchema.statics.getListForLang = function (lang, parentId) {
  if (!lang) {
    return Promise.reject(new Error('No language passed'));
  }

  return new Promise(function (resolve, reject) {
    BptLexeme.getListOverall(parentId, function (err, records) {
      if (err) {
        return reject(err);
      }

      var results = records.map(function (record) {
        return {
          _id: record._id,
          lang: record.lang,
          name: record.name,
          annex: record['annex_' + lang]
        };
      });

      resolve(results);
    });
  });
};

var BptLexeme = mongoose.model('BptLexeme', BptLexemeSchema, 'bpt_lexeme');

module.exports = BptLexeme;
