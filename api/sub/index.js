const express = require('express');
const app = express();
const path = require('path');
const basename = path.basename(__filename);
const subModels = require('../../sub_models/index');
const config = require('../../bin/config');
const mongoose = require('mongoose');

// Sub db ye erişim kontrolü için yazılır.
app.use((req, res, next) => {
  if (req.hostname.split('.').length !== 3 && req.hostname.split('.')[1] !== 'localhost') {
    return res.json({
      type: true,
      message: 'Erişiminiz engellendi',
    });
  }
  if (req.originalUrl === '/xd') {
    return next();
  }
  req.data = {
    prefix: req.hostname.split('.')[0],
    db: null,
  },
    // var olan db listesinde gelinen hesabın olup olmadığını kontrol eder.
    app.get('db_admin').listDatabases((err, dbsResult) => {
      if (err) {
        return res.json({
          type: false,
          message: err.toString()
        });
      }
      if (!dbsResult.databases.some((e) => e.name === `${config.db.prefix}_${req.data.prefix}`)) {
        return res.json({
          type: false,
          data: 'Hesap Bulunamadı',
        });
      }
      // yeni bir db ile gelindiği zaman cloudModel üzerinde ki modallara ulaşmak için yazılmıştır
      // ancak, connect var olmayan bir collection u oluşturabilir, bu yüzden daha önce collection ın var olup olmadığı kontrol edilmişir.
      mongoose.connect(
        `mongodb://${config.db.host}:${config.db.port}/${config.db.prefix}_${req.data.prefix}`,
        { useNewUrlParser: true },
      ).then((connection) => {
        req.data.db = subModels(connection);
        return next();
      }).catch((err) => {
        return res.json({
          type: false,
          message: err.toString(),
        });
      });
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