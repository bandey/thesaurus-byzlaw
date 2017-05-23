var mongoose = require('mongoose');

var BptChapterSchema = new mongoose.Schema({
  _id: { type: Number, min: 1 },
  posit: { type: Number, min: 1 },
  name: { type: String, required: true, maxlength: 100 },
  lang: { type: String, required: true, maxlength: 10 },
  cont_lang: { type: String, required: true, maxlength: 10 },
  content: { type: String }
});

module.exports = mongoose.model('BptChapter', BptChapterSchema, 'bpt_chapter');