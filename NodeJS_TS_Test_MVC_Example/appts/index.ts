
import dotenv from "dotenv";
import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import * as routChatBots from "./routes/chat-bots";
import * as routIndex from "./routes/index";
import * as routTopic from "./routes/topic";
import * as routTranslate from "./routes/translate";

// initialize configuration
dotenv.config();

// Create a new express application instance
const app: express.Application = express();

// define base uri with api version protocol defined in package.json

// define app
app.use("/js", express.static(path.join(__dirname + "/../node_modules/bootstrap/dist/js"))); // redirect bootstrap JS
app.use("/js", express.static(path.join(__dirname + "/../node_modules/bootstrap/js/dist")));
app.use("/js", express.static(path.join(__dirname + "/../node_modules/jquery/dist"))); // redirect JS jQuery
app.use("/css", express.static(path.join(__dirname + "/../node_modules/bootstrap/dist/css"))); // redirect CSS bootstrap
app.use("/img", express.static(path.join(__dirname + "/../img")));
// app.use(cors());
// app.options('*', cors());

// remove x-powered-by header variable
// app.disable('x-powered-by')
// ? app.disable('etag');

// parse application/json
// app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// set 3000 port as default if it not specified in env
app.set("port", process.env.PORT || 3002);

app.engine(".hbs", exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
        partial_grammar(name) {
            return "grammar/" + name;
        },
        help_math_ceil(sentence, translate) {
            return Math.ceil(sentence.length / translate.length);
        },
        helper_nav(key) {

            switch (key) {
                case "home_link":
                    return process.env.HOSTS_APP + ":" + app.get("port");
                    break;
                case "name_product":
                    return process.env.PRODUCT;
                    break;
                case "topics_link":
                    return process.env.HOSTS_APP + ":" + app.get("port") + "/topic";
                default:
                    return  "#";
            }

        }
    },
    layoutsDir: path.join(__dirname, "/../public/views/layouts"),
    partialsDir: path.join(__dirname, "/../public/views/partials/"),

}));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/../public/views"));

// register api routes
routIndex.register( app );
routTopic.register( app );
routTranslate.register( app );
routChatBots.register( app );

app.use((request, response, next) => {
    // console.log('middleware ',request.headers)
    next();
});

// перехват ошибки 404 и перейти к обработчику
app.use((err, request, response, next) => {
    err.status = 404;
    next(err);
});

// error handlers

// Обработчик ошибок должен быть последней функцией, добавленной с помощью app.use
// обработчик ошибок разработки
// will print stacktrace
if (process.env.ENVIRONMENT === "development") {
    app.use((err, request, response, next) => {
        response.status(err.status || 500);
        response.json({
            error: err,
            message: err.message
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, request, response, next) => {
    response.status(err.status || 500);
    response.json({
        error: {},
        message: err.message
    });
});

// start our rest api server

const server = app.listen(app.get("port"), () => {
    console.log(`${process.env.HOSTS_APP} : ${app.get("port")}`);
    console.log(`${process.env.HOSTS_APP} : ${app.get("port")}/topic`);
});

// prevent too long threshold
server.timeout = 2048;
