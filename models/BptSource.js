var mongoose = require('mongoose');

var BptSourceSchema = new mongoose.Schema({
  _id: { type: Number, min: 1 },
  name: { type: String, required: true, maxlength: 30 },
  lang: { type: String, required: true, maxlength: 10 },
  posit: { type: Number, min: 1 }
});

module.exports = mongoose.model('BptSource', BptSourceSchema, 'bpt_source');