const {Router}    = require('express')
const controller  = require('../controllers/topic')
const app         = Router()


app.route('/')
    .get(controller.list)
app.route('/:topicId')
    .get(controller.topic)

module.exports = app