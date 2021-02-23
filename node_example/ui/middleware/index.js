import {weather,credentials} from "./_mod.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import domainServer from "domain";
import cluster from "cluster";
import {api as routesApi} from "~ui/routes/mod-export.js";
import csurf from "csurf";
import config from "~config";
import {userHundler}   from "~use_cases/mod-export.js";
import {User as UserView} from "~ui/models/user.js";

const init = function(app) {


    // POST parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // Cookie
    app.use(cookieParser(credentials.cookieSecret));

    // Session
    app.use(expressSession({
        resave: false,
        saveUninitialized: false,
        secret: credentials.cookieSecret,
    }));

    // В этом месте так как CSRF в API не нужна
    // register api routes
    app.use("/api/" + config.api.version, routesApi);

    // CSRF
    app.use(csurf());
    app.use(function(req, res, next){
        res.locals._csrfToken = req.csrfToken();
        next();
    });

    // TODO
    // Social ID: `req.session.passport.user`
    // Auth social
    app.use(function (req, res, next) {
        if(req.session.passport){
            if(req.session.passport.user!=="undefined"){
                (async () => {
                 const user = await userHundler.getUserSocial(req.session.passport.user)
                     .catch(err=>{
                         req.session.flash = {
                             type: "danger",
                             intro: "Ошибка базы данных!",
                             message: "Произошла ошибка базы данных.Пожалуйста, попробуйте позднее",
                         };
                 });
                    const id = new UserView(user).id;
                    res.cookie('userCookieId',  id, { signed: true });
                    req.session.userCookieId = id;
                    req.session.authorized = true;
                    res.locals.authorized = true;
                    next();
                })();
            }else{
                next();
            }
        }else{
            req.session.authorized = false;
            res.locals.authorized = false;
            next();
        }

    });

    // Auth
    app.use(function (req, res, next) {
        if(!req.session.authorized){
            let userCookieId = req.signedCookies.userCookieId;
            if(userCookieId!=='undefined' && userCookieId){
                // загрузить в сессию пользователя по id из cookie
                (async () => {
                  const user =  await userHundler.getUserCookieUser(userCookieId)
                      .catch(err=>{
                          req.session.flash = {
                              type: "danger",
                              intro: "Ошибка базы данных!",
                              message: "Произошла ошибка базы данных.Пожалуйста, попробуйте позднее",
                          };
                  });
                    if(user!=='undefined' && user){
                        req.session.userCookieId = new UserView(user).id;
                        req.session.authorized = true;
                        res.locals.authorized = true;
                    }
                    next();
                })();
            }else{
                next();
            }
        }else{
            next();
        }
    });

    // для экстренных сообщений пользователю
    app.use(function (req, res, next) {
        res.locals.flash = req.session.flash;
        delete req.session.flash;
        next();
    });

    // testing in browser
    app.use(function (req, res, next) {
        // передать в view переменную showTests
        res.locals.showTests = app.get("env") !== "production" && req.query.test === "1";
        next();
    });
    // widget
    app.use(function (req, res, next) {
        if (!res.locals.partials) res.locals.partials = {};
        res.locals.partials.weatherContext = weather.getWeatherData();
        next();
    });

    // show worker
    app.use(function (req, res, next) {
        if (cluster.isWorker)
            console.log("Исполнитель %d получил запрос", cluster.worker.id);
        else if (cluster.isMaster) {
            console.log("Скрипт запушен как Master");
        }
        next();
    });
    // domain перехват необработанных исключений
    app.use(function (req, res, next) {
        // создаем домен для этого запроса
        let domain = domainServer.create();
        // обрабатываем ошибки на этом домене
        domain.on("error", function (err) {
            console.error("ПЕРЕХВАЧЕНА ОШИБКА ДОМЕНА\n", err.stack);
            try {
                // Отказобезопасный останов через 5 секунд
                setTimeout(function () {
                    console.error(" Отказобезопасный останов.");
                    process.exit(1);
                }, 5000);
                // Отключение от кластера
                let worker = cluster.worker;
                if (worker) worker.disconnect();
                // Прекращение принятия новых запросов
                server.close();
                try {
                    // Попытка использовать маршрутизацию ошибок Express
                    next(err);
                } catch (err) {
                    // Если не сработала маршрутизация ошибок Express,
                    // пробуем выдать текстовый ответ Node
                    console.error("Сбой механизма обработки ошибок Express .\n", err.stack);
                    res.statusCode = 500;
                    res.setHeader("content-type", "text/plain");
                    res.end("Ошибка сервера.");
                }
            } catch (err) {
                console.error("Не могу отправить ответ 500.\n", err.stack);
            }
        });
        // Добавляем объекты запроса и ответа в домен
        domain.add(req);
        domain.add(res);
        // Выполняем оставшуюся часть цепочки запроса в домене
        domain.run(next);
    });

};

export default {init};