//https://mlab.com/databases/db_lessons_node/collections/notes?q=&s=&f=&pageSize=10&pageNum=0
//http://localhost:8000/0.0.1/notes/
//const express    = require('express');
//const bodyParser = require('body-parser');
//const mongoose   = require('./middleware/mongoose');
//const index      = require('./routes/index');
//const notes       = require('./routes/notes');
//const env         = require('./env.json');

import express from "express";

import bodyParser from "body-parser";
// подключение в mongo через прослойку mongoose
import mongoose from "./middleware/mongoose" ;

// import our api routes
import index    from "./routes/index";
//const user       = require('./routes/user');
import notes    from "./routes/notes";


import env      from "./env.json";

// *****************************************
// Request -> Router -> Controller -> Model
// *****************************************
//****

// define app
var app         = express();

// remove x-powered-by header variable
app.disable("x-powered-by");
// ? app.disable('etag');

app.use(mongoose.checkState);

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// set 3000 port as default if it not specified in env
app.set("port", env.port || 3000);



// register api routes
app.use("/" + env.api.version, index);
//app.use('/' + env.api.version + '/user', user)
app.use("/" + env.api.version + "/notes", notes);


// перехват ошибки 404 и перейти к обработчику
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});


// обработчик ошибок при разработки
// will print stacktrace
if (env.environment === "development") {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: {}
	});
});


// старт сервера
var server = app.listen(app.get("port"), function() {
	console.log(">>>>>>>>> API server listening on port " + server.address().port +" <<<<<<");
	console.log("Listen http://localhost:8000/0.0.1/notes/");
});

// prevent too long threshold
server.timeout = 2048;

//Запуск сервера
//выполнить команду
// или npm run dev  если есть в package.json script dev {nodemon index.js}
// (или – node server.js, если вы не устанавливали Nodemon)

