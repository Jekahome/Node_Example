const {Router}    = require('express')
const env               = require('../../env.json')
const product     = env.product
const api_key_translate = env.api_key_translate
const { spawn } = require('child_process');
const app         = Router()

app.post('/', function(request, response, next) {
    var command = spawn(__dirname + '/../../translate.sh', [ api_key_translate,request.body.text,request.body.tolang || '' ]);
    command.stdout.on('data', (data) => {

        response.status(200).json({ text: `${data}` })
    });
    // response.status(200).json({ text: request.body.text })
})

module.exports = app