var mongoose = require('mongoose');

var BptKeywordSchema = new mongoose.Schema({
  _id: { type: Number, min: 1 },
  parent_id: { type: Number, min: 1 },
  name: { type: String, required: true, maxlength: 50 },
  font: { type: String, required: true, maxlength: 20 },
  posit: { type: Number, min: 1 }
});

module.exports = mongoose.model('BptKeyword', BptKeywordSchema, 'bpt_keyword');