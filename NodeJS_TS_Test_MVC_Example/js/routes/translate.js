"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const apiKeyTranslate = process.env.API_KEY_TRANSLATE;
exports.register = (app) => {
    app.post("/translate", (request, response, next) => {
        const command = child_process_1.spawn(__dirname + "/../../translate.sh", [apiKeyTranslate, request.body.text, request.body.tolang || ""]);
        command.stdout.on("data", (data) => {
            response.status(200).json({ text: `${data}` });
        });
    });
};
