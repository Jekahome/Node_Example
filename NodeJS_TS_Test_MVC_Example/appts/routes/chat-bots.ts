import * as express from "express";

export const register = ( app: express.Application ) => {

    app.get("/chat-bots", (request, response, next) => {
        return response.render("chat-bots", {});
    });

};
