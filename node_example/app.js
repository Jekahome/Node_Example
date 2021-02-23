import https from "https";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import esMain from 'es-main';
import fs from "fs";
import middleware from "~ui/middleware/index.js";
import {index as routesIndex,
    api as routesApi,
    users as routesUser,
    posts,
    example as routesExample} from "~ui/routes/mod-export.js";
import config from "~config";
import {funcAuth} from "~ui/auth/index.js";
import {credentials} from "~ui/routes/_mod.js";
import passport from "passport";



// Prepare environment =================================================================================================
// Переменная handlebars._sections для передачи html,js из внутренних шаблонов в layout
// Переменная res.locals.flash для вывода flash сообщений пользователю
// Переменная res.locals.showTests для вывода результата теста в режиме development
// Переменная res.locals.pageTestScript загрузка js кода с тестом на страницу
// Переменная res.locals.partials.weatherContext

let app = express();
const __dirname = path.resolve();
const optionsHttps = {
    key: fs.readFileSync(__dirname + "/ssl/2885853_127.0.0.13000.key"),
    cert: fs.readFileSync(__dirname + "/ssl/2885853_127.0.0.13000.cert"),
};


// По умолчанию Express ищет представления в подкаталоге views , а макеты — в подкаталоге layouts
// настройка для рендера шаблона при Ajax запросах Json форматом
app.set('views', config.dir.views);// относительный путь!
app.set("view engine", "handlebars");
exphbs.create({defaultLayout:"main"});// views/layouts/main.handlebars
app.engine("handlebars", exphbs({
    helpers: {
        inc: function (value, option) {
            return parseInt(value) + 1;
        },
        section:function(name,options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}));

app.disable("x-powered-by");
app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "127.0.0.1");
app.use(express.static(__dirname + config.dir.public));// папка для static раздачи

if(process.env.NODE_ENV == "development"){
    app.use(express.static(__dirname + config.dir.public_test));
}
// File upload dir
// make sure data directory exists
if(!fs.existsSync(__dirname + config.dir.public)) fs.mkdirSync(__dirname + config.dir.public);
if(!fs.existsSync(__dirname + config.dir.images)) fs.mkdirSync(__dirname + config.dir.images);

// middleware ==========================================================================================================


middleware.init(app);


// АВТОРИЗАЦИЯ ====================================================

app.use(passport.initialize());
app.use(passport.session());

// Для авторизации /auth/facebook

// authentication
var auth = funcAuth(app, {
    baseUrl: process.env.BASE_URL,
    providers: credentials.authProviders,
    successRedirect: '/user/account',
    failureRedirect: '/unauthorized',
});
// auth.init() links in Passport middleware:
auth.init();

// now we can specify our auth routes:
auth.registerRoutes();


// ====================================================

// routing =============================================================================================================
// req обьект класса http.IncomingMessage расширяет класс stream.Readable
// res ​обьект класса http.ServerResponse расширяет класс stream.Writable

function authorize(req, res, next){
    if(req.session.authorized) return next();
    return res.redirect(303, "/signin");
}

// register index routes
app.use("/",routesIndex);

// TODO
// register API routes in middleware

// register user routes
app.use("/user/", authorize, routesUser);

// register example routes
routesExample.init(app);

// Error hundler =======================================================================================================

// пользовательская страница 404
app.use(function(req, res){
    res.type("text/html");
    res.status(404).render("404");
});

// пользовательская страница 500 (последняя в роутах)
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type("text/html");
    res.status(500).render("500");
});

// Start server ========================================================================================================
// Prepare cluster
function startServer() {
    // https
   /* https.createServer(optionsHttps, app)
        .listen(app.get("port"), function(){
        console.log("Express started in " + app.get("env") +" mode on port " + app.get("port") + " using HTTPS.");
            if(process.env.NODE_ENV == "development"){
                console.info("\x1b[33m%s\x1b[0m","Environment development");
            }
    });
    */

    // http
    app.listen(app.get("port"),app.get("host"), function(){
        console.log("Express запущен на http://%s:%d.",app.get("host"),app.get("port"));
        if(process.env.NODE_ENV == "development"){// или app.get('env') == "development"
            console.info("\x1b[33m%s\x1b[0m","Environment development");
        }
    });
}

// непосредственный запуск сервера (для этого файла)
if (esMain(import.meta)) {
    console.log("Module run directly.");
    startServer();
}
// для запуска сервера из другого источника
// помечаем функцию запуска как экспорт
export {startServer};

