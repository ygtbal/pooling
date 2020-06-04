
// Oluşturulan schema lardan mongoose ile yeni modalları tek bir fonksiyon ile yapabilme adına yazılmıştır.
const path = require('path');
const basename = path.basename(__filename);

module.exports = (db) => {
  require('fs')
      .readdirSync(__dirname)
      .filter((file) => {
        return (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js');
      }).forEach((file) => {
        filename = file.split('.')[0];
        key = filename.split('_').map(
            (name) => filename.split('_')[0] !== name ?
          name.charAt(0).toUpperCase() + name.slice(1) :
          name,
        );
        db.model(key, require(__dirname + path.sep + file));
      });
  return db;
};
