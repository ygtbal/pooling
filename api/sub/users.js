const express = require('express');
const app = express();
const path = require('path');
const basename = path.basename(__filename);

app.get('/', (req, res) => {
  req.data.db.model('users').find({}, (err, data) => {
    return res.json({
      type: true,
      data,
    });
  })
});

module.exports = app;