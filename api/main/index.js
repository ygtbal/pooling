const express = require('express');
const app = express();
const path = require('path');
const basename = path.basename(__filename);

// NOTE: Özel erişim kontrolü
app.use((req, res, next) => {
  // NOTE: Subdomain engelle
  if (req.hostname.split('.').length !== 2 && req.hostname !== 'localhost' ) {
    return res.json({
      type: false,
      data: 'Erişiminiz engellendi.',
    });
  }
  return next();
});

app.get('/', (req, res) => {
  return res.json({
    type: true,
    data: true,
  });
});

require('fs')
    .readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js'
      );
    }).forEach((file) => {
      app.use(`/${file.split('.')[0]}`, require(__dirname + path.sep + file));
    });

module.exports = app;
