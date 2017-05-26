var mongoose = require('mongoose');

var BptSourceSchema = new mongoose.Schema({
  _id: { type: Number, min: 1 },
  posit: { type: Number, min: 1 },
  lang: { type: String, required: true, maxlength: 10 },
  name: { type: String, maxlength: 30 }, // for old version compatibility
  name_en: { type: String, required: true, maxlength: 30 },
  name_ru: { type: String, required: true, maxlength: 30 },
});

/**
 * Method of class: get all records sorted by posit field
 * result records contain all fields
 * @param {Function(err,records)} cb - pass array of records to callback
 */
BptSourceSchema.statics.getListOverall = function (cb) {
  BptSource.find().sort({ posit: 1 }).exec(cb);
};

/**
 * Method of class: get all records sorted by posit field
 * result records contain fields: _id, lang, name - on specified language
 * @param {String} lang - language for name, eg 'en', 'ru'
 * @return {Promise} - pass array of records ro resolve
 */
BptSourceSchema.statics.getListForLang = function (lang) {
  if (!lang) {
    return Promise.reject(new Error('No language passed'));
  }

  return new Promise(function (resolve, reject) {
    BptSource.getListOverall(function (err, records) {
      if (err) {
        return reject(err);
      }

      var results = records.map(function (record) {
        return {
          _id: record._id,
          lang: record.lang,
          name: record['name_' + lang]
        };
      });

      resolve(results);
    });
  });
};

var BptSource = mongoose.model('BptSource', BptSourceSchema, 'bpt_source');

module.exports = BptSource;
