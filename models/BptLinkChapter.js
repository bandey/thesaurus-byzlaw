var mongoose = require('mongoose');

var BptLinkChapterSchema = new mongoose.Schema({
  _id: { type: Number, min: 1 },
  link_name: { type: String, required: true, maxlength: 30 },
  link_id: { type: Number, min: 1 },
  chapters: [ { type: Number, min: 1, ref: 'BptChapter' } ]
});

module.exports = mongoose.model('BptLinkChapter', BptLinkChapterSchema, 'bpt_link_chapter');