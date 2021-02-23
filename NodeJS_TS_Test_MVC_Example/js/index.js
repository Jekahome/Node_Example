"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const path_1 = __importDefault(require("path"));
const routChatBots = __importStar(require("./routes/chat-bots"));
const routIndex = __importStar(require("./routes/index"));
const routTopic = __importStar(require("./routes/topic"));
const routTranslate = __importStar(require("./routes/translate"));
dotenv_1.default.config();
const app = express_1.default();
app.use("/js", express_1.default.static(path_1.default.join(__dirname + "/../node_modules/bootstrap/dist/js")));
app.use("/js", express_1.default.static(path_1.default.join(__dirname + "/../node_modules/bootstrap/js/dist")));
app.use("/js", express_1.default.static(path_1.default.join(__dirname + "/../node_modules/jquery/dist")));
app.use("/css", express_1.default.static(path_1.default.join(__dirname + "/../node_modules/bootstrap/dist/css")));
app.use("/img", express_1.default.static(path_1.default.join(__dirname + "/../img")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3002);
app.engine(".hbs", express_handlebars_1.default({
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
                    return "#";
            }
        }
    },
    layoutsDir: path_1.default.join(__dirname, "/../public/views/layouts"),
    partialsDir: path_1.default.join(__dirname, "/../public/views/partials/"),
}));
app.set("view engine", ".hbs");
app.set("views", path_1.default.join(__dirname, "/../public/views"));
routIndex.register(app);
routTopic.register(app);
routTranslate.register(app);
routChatBots.register(app);
app.use((request, response, next) => {
    next();
});
app.use((err, request, response, next) => {
    err.status = 404;
    next(err);
});
if (process.env.ENVIRONMENT === "development") {
    app.use((err, request, response, next) => {
        response.status(err.status || 500);
        response.json({
            error: err,
            message: err.message
        });
    });
}
app.use((err, request, response, next) => {
    response.status(err.status || 500);
    response.json({
        error: {},
        message: err.message
    });
});
const server = app.listen(app.get("port"), () => {
    console.log(`${process.env.HOSTS_APP} : ${app.get("port")}`);
    console.log(`${process.env.HOSTS_APP} : ${app.get("port")}/topic`);
});
server.timeout = 2048;
