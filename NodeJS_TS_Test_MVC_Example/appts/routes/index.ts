import * as express from "express";
import * as controller from "../controllers/index";

export const register = ( app: express.Application ) => {

    /* get home url */
    app.get("/", controller.index);

};
