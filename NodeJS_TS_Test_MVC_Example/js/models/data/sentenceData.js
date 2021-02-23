"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SentenceData {
    constructor(id, sentence, translate) {
        this._id = id;
        this._sentence = sentence;
        this._translate = translate;
    }
    get id() {
        return this._id;
    }
    get sentence() {
        return this._sentence;
    }
    get translate() {
        return this._translate;
    }
}
exports.SentenceData = SentenceData;
