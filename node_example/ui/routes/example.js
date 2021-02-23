
import {mail,fortune,config,credentials} from "~ui/routes/_mod.js";
import formidable from "formidable";
import mv from "mv";
let emailService = mail(credentials);


const init = function(app) {

    app.get("/", function(req, res){
        //res.type("text/html");
        //res.send("Meadowlark Travel");

        //res.cookie("monster", "nom nom");
        //var monster = req.cookies.monster;
        //res.clearCookie("monster");


        //delete req.session.flash;

        res.render("home");
    });


    app.get("/about", function(req, res){
        res.render("about", {
            fortune: fortune.getFortune(),
            pageTestScript: "/qa/tests-about.js"
        });
    });

    app.get("/contact", function(req, res){

        res.render("contact", {
            fortune: fortune.getFortune()
        });
    });

    app.get("/nursery-rhyme", function(req, res){
        res.render("nursery-rhyme");
    });
    app.get("/data/nursery-rhyme", function(req, res){
        res.json({
            animal: "бельчонок",
            bodyPart: "хвост",
            adjective: "пушистый",
            noun: "черт",
        });
    });

    // POST request FORM --------------------------------------------
    app.get("/newsletter", function(req, res){
        res.render("newsletter", { csrf: "CSRF token goes here" });
    });
    app.post("/process" , function(req, res){
        console.log("Form (from querystring): " + req.query. form);
        console.log("CSRF token (from hidden form field): " + req.body._csrf);
        console.log("Name (from visible form field): " + req.body.name);
        console.log("Email (from visible form field): " + req.body.email);

        let err = false;// валидация

        if(err){
            if(req.xhr){
                return res.json({ error: "Ошибка базы данных." });
            }else{
                req.session.flash = {
                    type: "danger",
                    intro: "Ошибка базы данных!",
                    message: "Произошла ошибка базы данных.Пожалуйста, попробуйте позднее",
                };
                return res.redirect(303, "/newsletter");
            }
        }else{
            if(req.xhr) return res.json({ success: true });
            req.session.flash = {
                type: "success",
                intro: "Спасибо!",
                message: "Вы были подписаны на информационный бюллетень.",
            };
            return res.redirect(303, "/thank-you");
        }

        /*if(req.xhr || req.accepts("json,html" )==="json" ){
            // если здесь есть ошибка, то мы должны отправить { error: "описание ошибки" }
           
            res.send({ success: true });
        } else {
           // если бы была ошибка, нам нужно было бы перенаправлять на страницу ошибки
            res.redirect(303, "/thank-you" );
        }*/
    });

    // File upload
    app.get("/contest/vacation-photo", function(req, res){
        let now = new Date();
        res.render("contest/vacation-photo",{
            year: now.getFullYear(),month: now.getMonth()
        });
    });
    app.post("/contest/vacation-photo/:year/:month" , function(req, res){
        let form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            if(err) {
                req.session.flash = {
                    type: "danger",
                    intro: "Oops!",
                    message: "There was an error processing your submission. " +
                        "Pelase try again.",
                };
                return res.redirect(303, "/contest/vacation-photo");
            }

            let photo = files.photo;
            let dir = config.dir.images + "/" + Date.now();
            let path = dir + "/" + photo.name;
            fs.mkdirSync(dir);

            mv(photo.path, path, {mkdirp: true}, function(err) {
                if(err)console.error("File not upload %s",err);
            });

            //saveContestEntry("vacation-photo", fields.email, req.params.year, req.params.month, path);

            req.session.flash = {
                type: "success",
                intro: "Good luck!",
                message: "You have been entered into the contest.",
            };
            return res.redirect(303, "/contest/vacation-photo/entries");
        });
    });
    app.get("/contest/vacation-photo/entries", function(req, res){
        res.render("contest/vacation-photo/entries");
    });

    app.post("/info", function(req, res){
        req.accepts(["text/plain","application/json"]);
        //curl -d "{"hello":"world"}" -H "Content-Type: application/json" -X POST 127.0.0.1:3000/info?name=fa
        res.send([
            req.ip, // "127.0.0.1"
            req.query["name"],// "fa"
            req.route,// {"path":"/info","stack":[{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}}
            req.hostname, // "127.0.0.1"
            req.protocol,// "http"
            req.body //   null через middleware
        ]);
        // res.render("home", { layout: null });// визуализация без макета
        // res.render("home", { layout: "custom" });// другой макет
        // res.json({ error: "Ошибка базы данных." });
    });


    app.get("/bulma/:page",(req,res)=>{
        res.render("contact",{ layout: "bulma"});
        // res.render(`a-frame/item-${req.params.page}`,{ layout: "a-frame"});
    });

};

export default {init};