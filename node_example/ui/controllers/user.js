import {userHundler,EmailExists}   from "~use_cases/mod-export.js";
import {User as UserView} from "~ui/models/user.js";

const userController = {
    // eslint-disable-next-line no-unused-vars
    list: function (req, res) {
        userHundler.getUsers().then(users =>{
            let buff = [];
            users.map(user =>{
                buff.push(new UserView(user));
            });
            res.render("users/list", {
                layout: "bulma",
                users: buff
            });
        });
    },
    // eslint-disable-next-line no-unused-vars
    signup: function (req, res) {

        userHundler.createUser(
            req.body.email,
            req.body.name,
            // eslint-disable-next-line no-unused-vars
            req.body.password).then((user) =>{

            req.session.flash = {
                type: "success",
                intro: "Спасибо!",
                message: "Регистрация завершена.",
            };

            res.redirect(303, "/signin");

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

            res.redirect(303, "/signup");
        });

    },
    get_signup: function (req, res) {
        req.session.flash = {
            type: "danger",
            intro: "Спасибо!",
            message: "Вы были подписаны на информационный бюллетень.",
        };

        res.render("users/signup", {
            layout: "bulma"
        });
    },
    get_signin: function (req, res) {
        res.render("users/signin", {
            layout: "bulma"
        });
    },
    signin: function (req, res) {
        (async () => {
           const id = await userHundler.getUserID(req.body.email,req.body.password)
               .catch(err=>{
               req.session.flash = {
                   type: "danger",
                   intro: "Ошибка базы данных!",
                   message: "Произошла ошибка базы данных.Пожалуйста, попробуйте позднее",
               };
           });
            if(id !==null ){
                req.session.authorized = true;
                res.locals.authorized = true;
                req.session.userCookieId = id;
                res.cookie("userCookieId",  id, { signed: true });

                res.redirect(303, "/user/account");
            }else{
                res.redirect(303, "/signup");
            }
        })();
    },
    logout: function (req, res) {
        console.log("LOGOUT");
        req.session.authorized = false;
        if(req.session.password && req.session.passport.user){
            delete req.session.passport;
        }
        res.locals.authorized = false;
        delete req.session.userCookieId;
        res.clearCookie("userCookieId");

        req.logout();
        res.redirect(303, "/");
    }

};

export {userController};
