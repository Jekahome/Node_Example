"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sqlite3_1 = __importDefault(require("sqlite3"));
dotenv_1.default.config();
const db = new sqlite3_1.default.Database(process.env.DB);
const sentenceData_1 = require("./data/sentenceData");
const topicData_1 = require("./data/topicData");
class Topic {
    get topic() {
        return this._topic;
    }
    set topic(topic) {
        this._topic = topic;
    }
    get sentences() {
        return this._sentences;
    }
    async load(topicId) {
        const params = { $id: topicId };
        return new Promise((resolve, reject) => {
            db.prepare("SELECT id,topic_id,sentence,translate  FROM sentences where topic_id=$id", params, (err) => {
                if (err != null) {
                    reject(err);
                }
            }).all((err, rows) => {
                if (err != null) {
                    reject(err);
                }
                const sentences = [];
                for (const row of rows) {
                    const sentence = new sentenceData_1.SentenceData(row.id, row.sentence, row.translate);
                    sentences.push(sentence);
                }
                Promise.all(sentences).then((result) => {
                    resolve(result);
                }, (error) => {
                    reject(error);
                });
            });
        }).then(function (sentences) {
            const This = this;
            return new Promise((resolve, reject) => {
                db.get("SELECT  id,topic,translate  FROM topics where id=$id limit 1", params, (err, row) => {
                    if (err != null) {
                        reject(err);
                    }
                    else {
                        const topic = new topicData_1.TopicData(row.id, row.topic, row.translate);
                        This.topic = topic;
                        This.setSentences(sentences);
                        resolve(This);
                    }
                });
            });
        }.bind(this), (error) => {
            console.log("Error Model topic initial", error);
        });
    }
    async loadWithTopic(topicId, topic, translate) {
        const params = { $id: topicId };
        const paramsBox = { topicId, topic, translate };
        const This = this;
        return new Promise((resolve, reject) => {
            db.prepare("SELECT id,topic_id,sentence,translate  FROM sentences where topic_id=$id", params, (err) => {
                if (err != null) {
                    reject(err);
                }
            }).all((err, rows) => {
                if (err != null) {
                    reject(err);
                }
                const sentences = [];
                for (const row of rows) {
                    const sentence = new sentenceData_1.SentenceData(row.id, row.sentence, row.translate);
                    sentences.push(sentence);
                }
                Promise.all(sentences).then((result) => {
                    resolve(result);
                }, (error) => {
                    reject(error);
                });
            });
        }).then(function (sentences) {
            const _ = this;
            const topicData = new topicData_1.TopicData(paramsBox.topicId, paramsBox.topic, paramsBox.translate);
            This.topic = topicData;
            This.setSentences(sentences);
            return This;
        }.bind(paramsBox, This), (error) => {
            console.log("Error Model topic initial", error);
        });
    }
    random(topicsNotRandom) {
        const topicsIndexRandom = [];
        const outputRandom = [];
        const lengthNotRandom = topicsNotRandom.length;
        while (topicsIndexRandom.length < lengthNotRandom) {
            const indexNotRandom = Math.round(Math.random() * lengthNotRandom);
            if (topicsIndexRandom.indexOf(indexNotRandom) === -1) {
                topicsIndexRandom.push(indexNotRandom);
            }
        }
        for (const item of topicsIndexRandom) {
            outputRandom.push(topicsNotRandom[item]);
        }
        return outputRandom;
    }
    setSentences(sentences) {
        this._sentences = sentences;
    }
}
exports.Topic = Topic;
