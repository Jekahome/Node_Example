"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lessons_1 = require("../models/lessons");
const topic_1 = require("../models/topic");
function list(request, response, next) {
    const lessons = new lessons_1.Lessons();
    lessons.load().then((result) => {
        return response.render("lessons", {
            lessons: result
        });
    });
}
exports.list = list;
function topic(request, response, next) {
    const Topic = new topic_1.Topic();
    Topic.load(request.params.topicId).then((result) => {
        return response.render("topic", {
            topic: result
        });
    });
}
exports.topic = topic;
