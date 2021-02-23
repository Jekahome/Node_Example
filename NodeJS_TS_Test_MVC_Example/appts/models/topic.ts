
// const sqlite3 = require("sqlite3").verbose();
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
dotenv.config();
const db = new sqlite3.Database(process.env.DB);

import {SentenceData} from "./data/sentenceData";
import {TopicData} from "./data/topicData";

export class Topic {

        public get topic() {
            return this._topic;
        }
        public set topic(topic: TopicData) {
            this._topic = topic;
        }
        public get sentences() {
            return this._sentences;
        }
        private _topic: TopicData;
        private _sentences: SentenceData[];

        public async load(topicId): Promise<void> {
            const params = {$id: topicId};

            return new Promise((resolve, reject) => {
                db.prepare("SELECT id,topic_id,sentence,translate  FROM sentences where topic_id=$id", params,
                (err) => {
                    if (err != null) { reject(err); }
                }).all((err, rows) => {
                    if (err != null) { reject(err); }
                    const sentences = [];
                    for (const row of rows) {
                        const sentence = new SentenceData(row.id, row.sentence, row.translate);
                        sentences.push(sentence);
                    }
                    Promise.all(sentences).then(
                        (result) => {
                            resolve(result);
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                });
            }).then(
                function(sentences) {
                    const This = this;
                    return new Promise((resolve, reject) => {
                        db.get("SELECT  id,topic,translate  FROM topics where id=$id limit 1", params,
                        (err, row) => {
                            if (err != null) {
                                reject(err);
                            } else {
                                const topic = new TopicData(row.id, row.topic, row.translate);
                                This.topic = topic;
                                This.setSentences(sentences);
                                resolve(This);
                            }
                        });
                    });
                }.bind(this),
                (error) => {
                    console.log("Error Model topic initial", error);
                },
            );
        }

        public async loadWithTopic(topicId, topic, translate): Promise<void> {
            const params = {$id: topicId};
            const paramsBox = {topicId, topic, translate};
            const This = this;
            return new Promise((resolve, reject) => {
                db.prepare("SELECT id,topic_id,sentence,translate  FROM sentences where topic_id=$id", params,
                 (err) => {
                    if (err != null) { reject(err); }
                }).all((err, rows) => {
                    if (err != null) { reject(err); }
                    const sentences = [];
                    for (const row of rows) {
                        const sentence = new SentenceData(row.id, row.sentence, row.translate);
                        sentences.push(sentence);
                    }
                    Promise.all(sentences).then(
                        (result) => {
                            resolve(result);
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                });
            }).then(
                function(sentences) {
                    const _ = this;
                    const topicData = new TopicData(paramsBox.topicId, paramsBox.topic, paramsBox.translate);
                    This.topic = topicData;
                    This.setSentences(sentences);
                    return This;

                }.bind(paramsBox, This),
                (error) => {
                    console.log("Error Model topic initial", error);
                },
            );
        }

        public random(topicsNotRandom) {
            const topicsIndexRandom = [];
            const outputRandom = [];
            const lengthNotRandom = topicsNotRandom.length;

            while (topicsIndexRandom.length < lengthNotRandom) {
                const indexNotRandom = Math.round(Math.random() * lengthNotRandom );
                if (topicsIndexRandom.indexOf(indexNotRandom) === -1) {
                    topicsIndexRandom.push(indexNotRandom);
                }
            }
            for (const item of topicsIndexRandom) {
                outputRandom.push(topicsNotRandom[item]);
            }
            return outputRandom;
        }
        private setSentences(sentences: SentenceData[]) {
            this._sentences = sentences;
        }
    }
