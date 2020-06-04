// index js connection kurulduğunda tüm schemalar la birlikte model leri yaratmak amacıyla kullanılmıştır.

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
        key = filename;
        // .split('_').map(
        //     (name) => name
        //     filename.split('_')[0] !== name ?
        //     name.charAt(0).toUpperCase() + name.slice(1) :
        //     name
        // );
        db.model(key, require(__dirname + path.sep + file));
      });
  return db;
};
