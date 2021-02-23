const {Router}    = require('express')
const app         = Router()

app.get('/', function(request, response, next) {
    return response.render('chat-bots', {})
})

module.exports = app