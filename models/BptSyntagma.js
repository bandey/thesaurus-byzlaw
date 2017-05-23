var mongoose = require('mongoose');

var BptSyntagmaSchema = new mongoose.Schema({
  _id: { type: Number, min: 1 },
  parent_id: { type: Number, min: 1 },
  name: { type: String, required: true, maxlength: 150 },
  lang: { type: String, required: true, maxlength: 10 },
  posit: { type: Number, min: 1 }
});

module.exports = mongoose.model('BptSyntagma', BptSyntagmaSchema, 'bpt_syntagma');