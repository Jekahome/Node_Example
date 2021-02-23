import {Router} from "express";
const app         = Router();
import {controllers} from "~ui/routes/_mod.js";

// get home url
app.get("/", function(req, res) {
    res.render("home",{ layout: "bulma"});
});

// нам также нужна страница "Не авторизирован"
app.get("/unauthorized", function(req, res) {
    res.status(403).render("401",{layout: "bulma"});
});


// signup new user
app.route("/signup").post(controllers.user.signup).get(controllers.user.get_signup);

// signin user
app.route("/signin").post(controllers.user.signin).get(controllers.user.get_signin);

// logout user
app.route("/logout").get(controllers.user.logout);



export default app;