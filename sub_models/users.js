const {Schema} = require('mongoose');

module.exports = new Schema({
  name: {type: String, trim: true, required: true}
}, {collection: 'users'});