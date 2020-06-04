// Her bir sub account business collection'ı içinde tutulur.

const {Schema} = require('mongoose');

module.exports = new Schema({
  prefix: {type: String, trim: true, required: true},
}, {collection: 'business'});