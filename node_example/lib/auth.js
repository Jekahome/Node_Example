import passport from "passport";
import {Strategy as FacebookStrategy} from "passport-facebook";
import {userHundler}   from "~use_cases/mod-export.js";


// настройка ------------------------------------------------------------------------------
let User = {
    id: 1234,
    authId: "facebook:123",
    name: "jela",
    email: "email@email.com",
    created:Date.now(),
    role: "customer",
};
function getUser(authId){
    console.log("SEARCH USER_ID:%s",authId);
    return User;
}
function createUser(authId,name,email){

}
// для установки соответствия запросов аутентификации пользователя
passport.serializeUser(function(user, done){
    // сохранить в сессии id
    done(null, User.id);
});
passport.deserializeUser(function(id, done){
    done(null, getUser(id));
});
// Пока сессия активна и пользователь успешно прошел аутентификацию,
// req.session.passport.user будет соответствовать экземпляру модели User

//----------------------------------------------------------------------------------------

// Для включения функциональности Passport нужно сделать два отдельных мероприятия:
// - инициализировать Passport;
// - зарегистрировать маршруты, которые будут обрабатывать аутентификацию и перенаправленные обратные вызовы
//      от наших сервисов сторонней аутентификации;


export function funcAuth (app, options){
// если перенаправления для успеха и неуспеха не определены,
// установите разумные значения по умолчанию
    if(!options.successRedirect) options.successRedirect = "/account";
    if(!options.failureRedirect) options.failureRedirect = "/unauthorized";
    return {
        init: function() {
            // конфигурирование стратегии Facebook
            const appId = options.providers.facebook.development.appId;
            const appSecret = options.providers.facebook.development.appSecret;
            const callbackURL = options.baseUrl+"/auth/facebook/callback";

            passport.use(
                new FacebookStrategy(
                    {
                        clientID: appId,
                        clientSecret: appSecret,
                        callbackURL: callbackURL,
                        profileFields: ["id", "displayName", "photos", "email"]
                    },
                    function(accessToken, refreshToken, profile, done){
                        console.log("Пользователь прошел аутентификацию на фейсбук!");
                        //console.info("profile=",profile);
                        // profile.id
                        // profile.displayName
                        // profile.emails[0].value
                        /*
                        profile= {
                              id: '743824916551499',
                              username: undefined,
                              displayName: 'Раз Два',
                              name: {
                                familyName: undefined,
                                givenName: undefined,
                                middleName: undefined
                              },
                              gender: undefined,
                              profileUrl: undefined,
                              emails: [ { value: 'yaroshjeka@gmail.com' } ],
                              photos: [
                                {
                                  value: 'https://scontent-prg1-1.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=3&_nc_sid=12b3be&_nc_ohc=TK-2Pfx722IAX_z04-E&_nc_ht=scontent-prg1-1.xx&tp=27&oh=b9ac1a250fdd765830231acc2e9ff734&oe=6056CB38'
                                }
                              ],
                              provider: 'facebook',
                              _raw: '{"id":"743824916551499",
                                      "name":"\\u0420\\u0430\\u0437 \\u0414\\u0432\\u0430",
                                      "picture":{"data":{"height":50,"is_silhouette":true,"url":"https:\\/\\/scontent-prg1-1.xx.fbcdn.net\\/v\\/t1.30497-1\\/cp0\\/c15.0.50.50a\\/p50x50\\/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=3&_nc_sid=12b3be&_nc_ohc=TK-2Pfx722IAX_z04-E&_nc_ht=scontent-prg1-1.xx&tp=27&oh=b9ac1a250fdd765830231acc2e9ff734&oe=6056CB38","width":50}},
                                      "email":"yaroshjeka\\u0040gmail.com"}',
                              _json: {
                                id: '743824916551499',
                                name: 'Раз Два',
                                picture: { data: [Object] },
                                email: 'yaroshjeka@gmail.com'
                              }
                            }
                         */

                        // Вернуть пользователя или создать и вернуть
                        let authId = "facebook:" + profile.id;
                        userHundler.getUserSocial(authId)
                        let user = getUser(authId);
                        return done(null, user);
                        // let user =  createUser(authId,profile.displayName,profile.emails[0].value);
                        // Иначе  создать пользователя и вернуть
                    }
                )
            );
            app.use(passport.initialize());
            app.use(passport.session());
        },

        registerRoutes: function() {
            // регистрируем маршруты Facebook
            app.get("/auth/facebook", function(req, res, next){
                // посещение этого пути автоматически
                // перенаправит посетителя на страницу аутентификации Facebook
                // req.query.redirect - Так мы можем автоматически перенаправлять
                //   пользователя к месту назначения после завершения аутентификации.
                if(req.query.redirect) req.session.authRedirect = req.query.redirect;
                passport.authenticate("facebook")(req, res, next);
            });

            // После того как пользователь авторизован посредством facebook, браузер будет перенаправлен
            // обратно на ваш сайт
            // В строке запроса также есть токены аутентификации, которые проверяются Passport.
            // Если проверка прошла неуспешно, Passport перенаправил браузер на options.failureRedirect .
            // Если проверка прошла успешно, Passport вызовет next() , то есть то место, куда
            // ваше приложение возвращается.
            app.get("/auth/facebook/callback",
                // `/auth/facebook/callback:passport.authenticate()`  вызывается первым.
                // Если он вызывает next() , управление переходит к вашей функции, что
                // затем перенаправляет либо в исходное место, либо на options.successRedirect , если
                // параметр перенаправления строки запроса не был указан
                passport.authenticate("facebook",{ failureRedirect: options.failureRedirect }),

                function(req, res){
                // мы сюда попадаем только при успешной аутентификации
                    var redirect = req.session.authRedirect;
                    if(redirect) delete req.session.authRedirect;
                    res.redirect(303, redirect || options.successRedirect);
                }
                // Как только аутентификация пользователя пройдет успешно, будет установлен req.session.passport.user ,
                // и таким образом будущие запросы будут знать, что этот пользователь прошел аутентификацию.
            );
        },
    };
};




