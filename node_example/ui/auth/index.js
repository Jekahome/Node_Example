import passport from "passport";
import {Strategy as FacebookStrategy} from "passport-facebook";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import {userHundler,EmailExists}   from "~use_cases/mod-export.js";
import {User as UserView} from "~ui/models/user.js";

// настройка ------------------------------------------------------------------------------
// для установки соответствия запросов аутентификации пользователя
passport.serializeUser(function(user, done){
    // сохранить в сессии id
    const id = user.getAuthId();
    if(id!=="undefined" && id){
        done(null, id);// User domain
    }else{
        done("Error message", null);
    }

});
passport.deserializeUser(function(id, done){
    //console.log("6) deserializeUser id=",id);
    userHundler.getUserSocial(id).then(user =>{

        if(!user) return done("Error message", null);
        const user_view = new UserView(user);// Модель которая будет храниться в сессии

        done(null, user_view);
    }) .catch(err=>{
        req.session.flash = {
            type: "danger",
            intro: "Ошибка базы данных!",
            message: "Произошла ошибка базы данных.Пожалуйста, попробуйте позднее",
        };
    });
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
            const appIdFacebook = options.providers.facebook.development.appId;
            const appSecretFacebook = options.providers.facebook.development.appSecret;
            const callbackURLfacebook = options.baseUrl+"/auth/facebook/callback";

            passport.use(
                new FacebookStrategy(
                    {
                        clientID: appIdFacebook,
                        clientSecret: appSecretFacebook,
                        callbackURL: callbackURLfacebook,
                        profileFields: ["id", "displayName", "photos", "email"]
                    },
                    function(accessToken, refreshToken, profile, done){
                        //console.log("Пользователь прошел аутентификацию на фейсбук!");
                        //console.info("profile=",profile);
                        // profile.id
                        // profile.displayName
                        // profile.emails[0].value
                        /*
                        profile= {
                              id: '743824916551***',
                              username: undefined,
                              displayName: 'Раз Два',
                              name: {
                                familyName: undefined,
                                givenName: undefined,
                                middleName: undefined
                              },
                              gender: undefined,
                              profileUrl: undefined,
                              emails: [ { value: 'your_mail@gmail.com' } ],
                              photos: [
                                {
                                  value: 'https://scontent-prg1-...312_n.jpg'
                                }
                              ],
                              provider: 'facebook',
                              _raw: '{"id":"743824916551499",
                                      "name":"\\u0420\\u0430\\u0437 \\u0414\\u0432\\u0430",
                                      "picture":{"data":{"height":50,"is_silhouette":true,"url":"https:\\/\\/sco...2829312_n.jpg?","width":50}},
                                      "email":"your_mail\\u0040gmail.com"}',
                              _json: {
                                id: '743824951***',
                                name: 'Раз Два',
                                picture: { data: [Object] },
                                email: 'your_mail@gmail.com'
                              }
                            }
                         */

                        // Вернуть пользователя или создать и вернуть
                        let authId = "facebook:" + profile.id;
                        userHundler.getUserSocial(authId).then(user=>{
                            //console.log("3) user:",user);
                            if(user){
                                return done(null, user);// Отправить на сериализацию и после на десериализацию
                            }else{
                                let email = profile.emails[0].value;
                                userHundler.createUserSocial(authId,email,profile.displayName,"customer").then(user=>{
                                    return done(null, user);
                                }) .catch(err=>{
                                    if(err instanceof EmailExists){
                                        req.session.flash = {
                                            type: "danger",
                                            intro: "Email занят!",
                                            message: "Введенный email уже зарегистрирован!",
                                        };
                                    }else{
                                        req.session.flash = {
                                            type: "danger",
                                            intro: "Ошибка базы данных!",
                                            message: "Произошла ошибка базы данных.Пожалуйста, попробуйте позднее",
                                        };
                                    }
                                });
                            }
                        }) .catch(err=>{
                            req.session.flash = {
                                type: "danger",
                                intro: "Ошибка базы данных!",
                                message: "Произошла ошибка базы данных.Пожалуйста, попробуйте позднее",
                            };
                        });

                        // Иначе  создать пользователя и вернуть
                    }
                )
            );

            const appIdGoogle = options.providers.google.development.appId;
            const appSecretGoogle = options.providers.google.development.appSecret;
            const callbackURLGoogle = options.baseUrl+"/auth/google/callback";

            passport.use(new GoogleStrategy({
                clientID: appIdGoogle,
                clientSecret: appSecretGoogle,
                callbackURL: callbackURLGoogle,
                profileFields: ["id", "displayName", "photos", "email"]
            }, function(token, tokenSecret, profile, done){
                //console.log("GOOGLE ",profile);
                /*
                 {
                      id: '113028773143490****',
                      displayName: 'Je ka',
                      name: { familyName: 'ka', givenName: 'Je' },
                      emails: [ { value: 'your_mail@gmail.com', verified: true } ],
                      photos: [
                        {
                          value: 'https://lh3.googleusercont***'
                        }
                      ],
                      provider: 'google',
                      _raw: '{\n' +
                        '  "sub": "11302877314349083***",\n' +
                        '  "name": "Je ka",\n' +
                        '  "given_name": "Je",\n' +
                        '  "family_name": "ka",\n' +
                        '  "picture": "https://lh3.google...",\n' +
                        '  "email": "your_mail@gmail.com",\n' +
                        '  "email_verified": true,\n' +
                        '  "locale": "ru"\n' +
                        '}',
                      _json: {
                        sub: '113028773143490838285',
                        name: 'Je ka',
                        given_name: 'Je',
                        family_name: 'ka',
                        picture: 'https://lh3.googleuserco....',
                        email: 'your_mail@gmail.com',
                        email_verified: true,
                        locale: 'ru'
                      }
                    }
                 */

                var authId = "google:" + profile.id;
                userHundler.getUserSocial(authId).then(user=>{
                    //console.log("3) user:",user);
                    if(user){
                        return done(null, user);// Отправить на сериализацию и после на десериализацию
                    }else{
                        let email = profile.emails[0].value;
                        userHundler.createUserSocial(authId,email,profile.displayName,"customer").then(user=>{
                            return done(null, user);
                        }) .catch(err=>{

                            if(err instanceof EmailExists){
                                req.session.flash = {
                                    type: "danger",
                                    intro: "Email занят!",
                                    message: "Введенный email уже зарегистрирован!",
                                };
                            }else{
                                req.session.flash = {
                                    type: "danger",
                                    intro: "Ошибка базы данных!",
                                    message: "Произошла ошибка базы данных.Пожалуйста, попробуйте позднее",
                                };
                            }

                        });
                    }
                }) .catch(err=>{
                    req.session.flash = {
                        type: "danger",
                        intro: "Ошибка базы данных!",
                        message: "Произошла ошибка базы данных.Пожалуйста, попробуйте позднее",
                    };
                });
            }));

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
                    // после passport.serializeUser
                    var redirect = req.session.authRedirect;
                    if(redirect) delete req.session.authRedirect;
                    res.redirect(303, redirect || options.successRedirect);
                }
                // Как только аутентификация пользователя пройдет успешно, будет установлен req.session.passport.user ,
                // и таким образом будущие запросы будут знать, что этот пользователь прошел аутентификацию.
            );

            // регистрируем маршруты Google
            app.get("/auth/google", function(req, res, next){
                if(req.query.redirect) req.session.authRedirect = req.query.redirect;
                passport.authenticate("google", { scope: ["profile","email","openid"] })(req, res, next);
            });

            app.get("/auth/google/callback", passport.authenticate("google",
                { failureRedirect: options.failureRedirect }),
            function(req, res){
                // мы сюда попадаем только при успешной аутентификации
                var redirect = req.session.authRedirect;
                if(redirect) delete req.session.authRedirect;
                res.redirect(303, req.query.redirect || options.successRedirect);
            }
            );
        },
    };
}




