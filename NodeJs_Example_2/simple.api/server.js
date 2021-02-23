//https://habr.com/company/ruvds/blog/321104/

//npm install node
//npm install express --save
//npm install --save mongodb body-parser


//body-parser - обрабатывает  формы в URL-кодировке


//nodemon при изменении файлов, автоматически перезапускает сервер
//установим как зависимость разработки но не использования
//npm install --save-dev nodemon
/*
// package.json
  "scripts": {
    "dev": "nodemon server.js"
  },
 */

//Запуск сервера
//выполнить команду npm run dev (или – node server.js, если вы не устанавливали Nodemon)

//https://www.getpostman.com/apps

//Mongo
//mLab https://mlab.com
//jekshmek yaroshjeka@gmail.com 56069364A
// db:db_lessons_node username:user_jeka password:user_jeka
//mongodb://<dbuser>:<dbpassword>@ds040309.mlab.com:40309/db_lessons_node
//MONGODB VERSION	3.4.14  //CLOUD PROVIDER	Microsoft Azure //PLAN TYPE	Sandbox


const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const routes         = require('./server/routes');

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));//обрабатывает  формы в URL-кодировке


MongoClient.connect(db.url, (err, client ) => {

    var db = client.db('db_lessons_node');

    if (err) {return console.log(err);}


     routes(app,db,function() {
         client.close();
     } );

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });

});






