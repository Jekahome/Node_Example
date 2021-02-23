import {spawn} from "child_process";
import * as express from "express";

const apiKeyTranslate = process.env.API_KEY_TRANSLATE;
export const register = ( app: express.Application ) => {
    app.post("/translate", (request, response, next) => {
        const command = spawn(__dirname + "/../../translate.sh",
            [ apiKeyTranslate, request.body.text, request.body.tolang || "" ]);
        command.stdout.on("data", (data) => {
            response.status(200).json({ text: `${data}` });
        });
    });
};
