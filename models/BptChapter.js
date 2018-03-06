var mongoose = require('mongoose');

var BptChapterSchema = new mongoose.Schema({
  _id: { type: Number, min: 1 },
  posit: { type: Number, min: 1 },
  name: { type: String, required: true, maxlength: 100 },
  font: { type: String, required: true, maxlength: 20 },
  content: { type: String },
  content_font: { type: String, required: true, maxlength: 20 }
});

module.exports = mongoose.model('BptChapter', BptChapterSchema, 'bpt_chapter');