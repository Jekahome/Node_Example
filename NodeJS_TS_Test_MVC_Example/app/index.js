const express     = require('express');
const bodyParser  = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
//const cors = require('cors');



const routIndex   = require('./routes/index')
const routTopic   = require('./routes/topic')
const routTranslate   = require('./routes/translate')
const routChatBots  = require('./routes/chat-bots')
//const routUser  = require('./routes/user')

// define base uri with api version protocol defined in package.json
const env         = require('../env.json')


// define app
let app           = express()
app.use('/js', express.static(path.join(__dirname + '/../node_modules/bootstrap/dist/js'))); // redirect bootstrap JS
app.use('/js', express.static(path.join(__dirname + '/../node_modules/bootstrap/js/dist')));
app.use('/js', express.static(path.join(__dirname + '/../node_modules/jquery/dist'))); // redirect JS jQuery
app.use('/css', express.static(path.join(__dirname + '/../node_modules/bootstrap/dist/css'))); // redirect CSS bootstrap
app.use('/img', express.static(path.join(__dirname + '/../img')));
//app.use(cors());
//app.options('*', cors());

// remove x-powered-by header variable
//app.disable('x-powered-by')
// ? app.disable('etag');

// parse application/json
//app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// set 3000 port as default if it not specified in env
app.set('port', env.port || 3000)

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir:path.join(__dirname, 'views/partials/'),
    helpers: {
        partial_grammar: function (name) {
            return 'grammar/'+name;
        },
        help_math_ceil:function(sentence,translate){
            return Math.ceil(sentence.length/translate.length)
        },
        helper_nav :function(key){

            switch (key) {
                case 'home_link':
                    return env.hosts.app+':' + app.get('port');
                    break;
                case 'name_product':
                    return env.product
                    break;
                case 'topics_link':
                    return env.hosts.app+':' + app.get('port')+'/topic';
                default:
                    return  '#';
            }

        }
    }
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))



/*
var hbs = exphbs.create();
async function g(name){
   return await hbs.getPartials().then(function (partials) {
        console.log('name=',partials );
        return  "1"//partials[name]
    });
}*/
// register api routes
app.use('/' , routIndex)
app.use('/' + 'topic', routTopic)
app.use('/' + 'translate', routTranslate)
app.use('/' + 'chat-bots', routChatBots)
//app.use('/' + '/user', routUser)

app.use((request, response, next) => {
    //console.log('middleware ',request.headers)
    next()
})

// перехват ошибки 404 и перейти к обработчику
app.use(function(err,request, response, next) {
    err.status(404);
    next(err)
})

// error handlers

// Обработчик ошибок должен быть последней функцией, добавленной с помощью app.use
// обработчик ошибок разработки
// will print stacktrace
if (env.environment === 'development') {
    app.use(function(err, request, response, next) {
        response.status(err.status || 500);
        response.json({
            message: err.message,
            error: err
        })
    })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, request, response, next) {
    response.status(err.status || 500);
    response.json({
        message: err.message,
        error: {}
    })
})

// start our rest api server
let server = app.listen(app.get('port'), function() {
    console.log(env.hosts.app+':' + server.address().port)
    console.log(env.hosts.app+':'+ server.address().port + '/topic')
})

// prevent too long threshold
server.timeout = 2048
