import nodemailer from "nodemailer";

// @ts-ignore
function mail(credentials){
    //Email
    let mailTransport = nodemailer.createTransport({
        service: "gmail",
        secureConnection: true, // используйте SSL
        port: 465,
        auth: {
            user: credentials.gmail.user,
            pass: credentials.gmail.password,
        }
    });

    var from = "\"Meadowlark Travel\" <info@meadowlarktravel.com>";
    var errorRecipient = "youremail@gmail.com";

    return {
        send: function(to: string, subj: string, body: string){
            mailTransport.sendMail({
                from: from,
                to: to,
                subject: subj,
                html: body,
                generateTextFromHtml: true
            }, function(err: object){
                if(err) console.error(" Невозможно отправить письмо: " + err);
            });
        },
        emailError: function(message: string, filename: string, exception: string){
            // Отправка на свою почту
            var body = "<h1>Meadowlark Travel Site Error</h1>" +
                "message:<br><pre>" + message + "</pre><br>";
            if(exception) body += "exception:<br><pre>" +
                exception + "</pre><br>";
            if(filename) body += "filename:<br><pre>" +
                filename + "</pre><br>";

            mailTransport.sendMail({
                from: from,
                to: errorRecipient,
                subject: "Ошибка сайта Meadowlark Travel",
                html: body,
                generateTextFromHtml: true
            }, function(err: object){
                if(err) console.error(" Невозможно отправить письмо: ");
            });
        },
    };
}

export {mail};

/*
   //Email
   let mailTransport = nodemailer.createTransport({
       service: "gmail",
       secureConnection: true, // используйте SSL
       port: 465,
       auth: {
           user: credentials.gmail.user,
           pass: credentials.gmail.password,
       }
   });
   // отправка письма
   mailTransport.sendMail({
       from: "\"Meadowlark Travel\" <info@meadowlarktravel.com>",
       to: "rodrigo@gmail.com",
       subject: "Ваш тур Meadowlark Travel",
       text: "Спасибо за заказ поездки в Meadowlark Travel. " +
           "Мы ждем Вас с нетерпением!",
   }, function(err){
       if(err) {
           console.error( "Невозможно отправить письмо: " + error );
       }else{
           console.error( "Письмо отправлено: " );
       }
   });

   // или отправка html форматом с рендером handlebars
   const person = {
       name:"Petryk",
       number:"4545",
       email:"mail@gmail.com"
   };
   res.render("email/example", { layout: null, person: person },
       function(err,html){
           if( err ) console.log("ошибка в шаблоне письма");
           mailTransport.sendMail({
               from: "\"Meadowlark Travel\": info@meadowlarktravel.com",
               to: person.email,
               subject: "Спасибо за заказ поездки в Meadowlark",
               html: html,
               generateTextFromHtml: true
           }, function(err){
               if(err) console.error("Не могу отправить подтверждение: " + err.stack);
           });
       }
   );
*/