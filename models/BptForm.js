var mongoose = require('mongoose');

var BptFormSchema = new mongoose.Schema({
  _id: { type: Number, min: 1 },
  parent_id: { type: Number, min: 1 },
  name: { type: String, required: true, maxlength: 50 },
  lang: { type: String, required: true, maxlength: 10 },
  posit: { type: Number, min: 1 }
});

module.exports = mongoose.model('BptForm', BptFormSchema, 'bpt_form');