/*jshint esversion: 6 */
const mongoose = require('mongoose');

const {schema: ProductSchema} = require('./products');

const orderSchema = mongoose.Schema({
  products: {
    type: [ProductSchema],
    requred: true
  },
  description: String
});

module.exports = mongoose.model('Order', orderSchema);
