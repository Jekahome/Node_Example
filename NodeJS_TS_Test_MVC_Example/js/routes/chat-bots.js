"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = (app) => {
    app.get("/chat-bots", (request, response, next) => {
        return response.render("chat-bots", {});
    });
};
