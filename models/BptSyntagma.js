var mongoose = require('mongoose');

var BptSyntagmaSchema = new mongoose.Schema({
  _id: { type: Number, min: 1 },
  parent_id: { type: Number, min: 1 },
  name: { type: String, required: true, maxlength: 150 },
  font: { type: String, required: true, maxlength: 20 },
  posit: { type: Number, min: 1 }
});

module.exports = mongoose.model('BptSyntagma', BptSyntagmaSchema, 'bpt_syntagma');