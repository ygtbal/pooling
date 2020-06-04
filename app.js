// express bir framework tür. kütüphane değildir. Node.js içerisinde web uygulamalarının daha kolay ve hızlı bir şekilde geliştirilmesini sağlar.
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const process = require('process');
const config = require('./bin/config');

// index sayfasına connection bilgisini yollayacağız ve connection.model metodu kullanılarak modeller yaratılcak.
const privateModels = require('./main_models/index');

// const api sub ve main route lar için index.js leri api'ın index.js sinde toparlamışdık şimdi onu app.js üzerinden çalıştıracağız.
const api = require('./api/index');

// Mongoose, Object Data Modeling olarak geçer. Mongoose sayesinde bir schema oluşturulur. 
//Bu aslında bir recordun nasıl bir yapıda olacağını tanımlar. Mongoose ile connection kurulduğu anda bu schema MongoDB üzerinde ki bir modal olur.
// Bu schema ile veriler ve tipleri belirtilebilir unique alanlar yazılabilir.
const mongoose = require('mongoose');

// Body-Parser Modülü gönderilen post datasını obje olarak yakalamamızı sağlayan bir modüldür.
const bodyParser = require('body-parser');


// Main Collection ların bulunduğu veri tabanı bağlantısını mongoose ile birlikte yapacağız.
mongoose.createConnection(
  `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
  {useNewUrlParser: true},
).then((connection) => {
  console.log('new connection');
  app.set('db', privateModels(connection));
  app.set('db_admin', connection.db.admin()); // buradan içeride var olan db listesi gözükecek.
}).catch((err) => {
  process.exit(22);
});

// JSON veri tipinde gelecek olan dataların kullanılabilmesi için bu tanımlamanın yapılması gerekir.
app.use(bodyParser.json());

// encode edilmiş url'ler üzerinde body-parser ı kullanmak için extended özelliği verilmelidir.
app.use(bodyParser.urlencoded({extended: true}));

// Yanlış gelen bağlantıları önler
app.use((err, req, res, next) => {
  if (err) {
    // app.get('log').error({
    //   message: err.toString(),
    //   service: 'root',
    // });
    return res.status(400).json({
      type: false,
      data: err.toString(),
    });
  }
  next();
});

// NOTE: Cors Problemleri bu kod bloğuyla çözülebilir.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/', api);
server.listen(config.server.port, config.server.ip);


// package.json da bulunan nodemon yapılan değikliklerin anında canloya geçmesini sağlar package.json içerisinde ki script kısmında görebilirsiniz.


