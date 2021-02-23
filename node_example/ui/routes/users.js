import {Router} from "express";
import {controllers} from "~ui/routes/_mod.js";

const app         = Router();

app.route("/").get(controllers.user.list);



app.get("/account", function(req, res) {
    // после авторизации появится req.session.passport.user из passport.deserializeUser()
    if(!req.user)
        return res.redirect(303, "/unauthorized");

    res.render("users/account", { layout: "bulma", user: req.user });
});

/*



// update user profile
app.route("/profile")
    .put(controller.updateProfile)

// update user password
app.route("/security")
    .put(controller.changePassword)

// resend user email verification token to user.email
app.route("/confirm/resend")
    .get(controller.resendConfirmationEmail)

// validate user token from `email verification` action
app.route("/confirm/:token")
    .get(controller.confirmEmailToken)

// send to user email verification token from `reset password` action
app.route("/reset")
    .post(controller.resetPassword)

// validate user token `reset password` action and update password
app.route("/reset/:token")
    .post(controller.confirmResetToken)
*/

export default app;