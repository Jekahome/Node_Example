"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller = __importStar(require("../controllers/topic"));
exports.register = (app) => {
    app.route("/topic")
        .get(controller.list);
    app.route("/topic/:topicId")
        .get(controller.topic);
};
