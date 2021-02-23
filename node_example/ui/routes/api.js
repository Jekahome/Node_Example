import {Router} from "express";
const app         = Router();
import {config} from "~ui/routes/_mod.js";
import cors from "cors";

app.use("/api", cors());

// http://127.0.0.1:3000/api/v1.0/user/4
app.get("/user/:id", function(req, res, next) {
    res.status(200).json({ message: process.env.PRODUCT + " " + config.api.version });
    // Send URL list
});
app.post("/user", function(req, res, next) {
    res.status(200).json({ message: process.env.PRODUCT + " " + config.api.version });
    // Send URL list
});
app.put("/user/:id", function(req, res, next) {
    res.status(200).json({ message: process.env.PRODUCT + " " + config.api.version });
    // Send URL list
});
app.delete("/user/:id", function(req, res, next) {
    res.status(200).json({ message: process.env.PRODUCT + " " + config.api.version });
    res.status(500).json({ message: process.env.PRODUCT + " " + config.api.version ,error:"Server error"});
    res.status(404).json({ message: process.env.PRODUCT + " " + config.api.version ,error:"Not found"});
    res.status(400).json({ message: process.env.PRODUCT + " " + config.api.version ,error:"Bad request"});
    res.status(401).json({ message: process.env.PRODUCT + " " + config.api.version ,error:"Unauthorized"});
    // Send URL list
});
export default app;