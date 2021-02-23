import * as express from "express";
import * as controller from "../controllers/topic";

export const register = ( app: express.Application ) => {
    app.route("/topic")
        .get(controller.list);
    app.route("/topic/:topicId")
        .get(controller.topic);
};
