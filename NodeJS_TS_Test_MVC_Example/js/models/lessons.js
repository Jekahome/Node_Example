"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sqlite3_1 = __importDefault(require("sqlite3"));
dotenv_1.default.config();
const db = new sqlite3_1.default.Database(process.env.DB);
const topic_1 = require("./topic");
class Lessons {
    constructor() {
        this._topics = [];
    }
    get topics() {
        return this._topics;
    }
    async load() {
        return new Promise((resolve, reject) => {
            db.all("SELECT id,topic,translate FROM topics", [], (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        }).then((result) => {
            return new Promise((resolve, reject) => {
                const topics = [];
                const results = result[Symbol.iterator]();
                for (const row of results) {
                    const topic = new topic_1.Topic();
                    topics.push(topic.loadWithTopic(row.id, row.topic, row.translate));
                }
                Promise.all(topics).then((resultTopics) => { resolve(resultTopics); }, (error) => { reject(error); });
            });
        }, (error) => {
            console.log("ERROR MESSAGES" + error);
        })
            .then(function (topics) {
            for (const topic of topics) {
                this.addTopic(topic);
            }
            return this.topics;
        }.bind(this), (error) => {
            console.log("ERROR MESSAGES 2" + error);
        });
    }
    addTopic(topic) {
        this._topics.push(topic);
    }
}
exports.Lessons = Lessons;
