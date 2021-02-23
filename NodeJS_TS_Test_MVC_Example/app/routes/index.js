const {Router}    = require('express')
const env     = require('../../env.json')
const version     = require('../../package.json').version
const controller  = require('../controllers/index')
const app         = Router()

/* get home url */
app.get('/',controller.index)

module.exports = app