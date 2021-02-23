
// const sqlite3  = require("sqlite3").verbose();
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
dotenv.config();
const db       = new sqlite3.Database(process.env.DB);

import {Topic} from "./topic";

export class Lessons {
        public get topics(): Topic[] {
            return this._topics;
        }
        private readonly _topics: Topic[];
        constructor() {
            this._topics = [];
        }

        public async load() {
            return new Promise((resolve, reject) => {
                db.all("SELECT id,topic,translate FROM topics", [], (err, row) => {
                    if (err) { reject(err); } else { resolve(row); }
                });
            }).then(
                (result) => {
                    return new Promise( (resolve, reject) => {
                        const topics: Array<Promise<void>> = [];
                        const results = result[Symbol.iterator]();
                        for (const row of results) {
                            const topic = new Topic();
                            topics.push(topic.loadWithTopic(row.id, row.topic, row.translate));
                        }
                        Promise.all(topics).then(
                            (resultTopics) => { resolve(resultTopics); },
                            (error) => {  reject(error); }
                        );
                    });

                },
                (error) => {
                    console.log( "ERROR MESSAGES" + error);
                })
                .then(
                    function(topics) {
                        for (const topic of topics) {
                            this.addTopic(topic);
                        }
                        return  this.topics;
                    }.bind(this),
                    (error) => {
                        console.log( "ERROR MESSAGES 2" + error);
                    });
        }
        private addTopic(topic: Topic) {
            this._topics.push(topic);
        }
    }
