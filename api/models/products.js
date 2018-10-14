/*jshint esversion: 6 */
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});

module.exports = {
  model: mongoose.model('Product', productSchema),
  schema: productSchema
};
