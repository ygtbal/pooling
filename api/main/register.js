const express = require('express');
const app = express();
const subModels = require('../../sub_models/index');
const mongoose = require('mongoose');
const config = require('../../bin/config');


// Yeni bir business kaydetmek için kullanılır. Yani sub domain oluşturmak için kullanılır.
app.post('/', async (req, res) => {
  app.get('db').model('business').create(
    {
      prefix: req.body.name,
    }, (err) => {
      if (err) {
        return res.json({
          type: false,
          message: err.toString(),
        });
      }
      mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/poolapp_${req.body.name}`).then((connection) => {
         const dbResult = subModels(connection);
         dbResult.model('users').create({name: req.body.name}, (err, data) => {
            if (err) {
              return res.json({
                type: false,
                message: err.toString(),
              });
            }
            return res.json({
              type: true,
              message: 'Şirket oluşturulmuştur',
            });
         })
      });
    }
  );
});

module.exports = app;