"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TopicData {
    constructor(id, topic, translate) {
        this._id = id;
        this._topic = topic;
        this._translate = translate;
    }
    get id() {
        return this._id;
    }
    get topic() {
        return this._topic;
    }
    get translate() {
        return this._translate;
    }
}
exports.TopicData = TopicData;
