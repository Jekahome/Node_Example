
let sqlite3 = require('sqlite3').verbose()
const env         = require('../../env.json')
let db = new sqlite3.Database(env.sqlite)

let SentenceData       = require('./data/sentenceData')
let TopicData      = require('./data/topicData')

class Topic{
    constructor(){
        this.topic = {};
        this.sentences = new Array();
    }

    async load(topic_id){
        let params = {$id:topic_id};
        return new Promise(function (resolve, reject) {
            db.prepare("SELECT id,topic_id,sentence,translate  FROM sentences where topic_id=$id", params, function (err) {
                if (err != null) reject(err);
            }).all(function (err,rows) {
                    if (err != null) reject(err);
                    let sentences = [];
                    for(let row of rows) {
                        let sentence = SentenceData.new(row.id, row.sentence, row.translate);
                        sentences.push(sentence);
                    }
                    Promise.all(sentences).then(
                        result => {  resolve(result) },
                        error => {  reject(error) }
                    );
            }.bind(this));
        }.bind(this)).then(
            function(sentences){
               return new Promise(function (resolve, reject) {
                    db.get("SELECT  id,topic,translate  FROM topics where id=$id limit 1", params, function (err, row) {
                        if (err != null) {
                            reject(err);
                        } else {
                            let topic = TopicData.new(row.id, row.topic, row.translate);
                            resolve({topic:topic,sentences:sentences})
                        }
                    });
                })
            },
            function(error){  console.log("Error Model topic initial",error); },
        )
    }

    async loadWithTopic(topic_id,topic,translate){
        let params = {$id:topic_id};
        let params_box = {topic_id:topic_id,topic:topic,translate:translate};
        return new Promise(function (resolve, reject) {
            db.prepare("SELECT id,topic_id,sentence,translate  FROM sentences where topic_id=$id", params, function (err) {
                if (err != null) reject(err);
            }).all(function (err,rows) {
                if (err != null) reject(err);
                let sentences = [];
                for(let row of rows) {
                    let sentence = SentenceData.new(row.id, row.sentence, row.translate);
                    sentences.push(sentence);
                }
                Promise.all(sentences).then(
                    result => { resolve(result) },
                    error => {  reject(error) }
                );
            });
        }).then(
            function(sentences){
                let topic = TopicData.new(params_box.topic_id,params_box.topic,params_box.translate);
                return {topic:topic,sentences:sentences}
            }.bind(params_box),
            function(error){  console.log("Error Model topic initial",error); },
        )
    }

    random(topicsNotRandom){
        let topicsIndexRandom = [];
        let outputRandom = [];
        let lengthNotRandom = topicsNotRandom.length;

        while(topicsIndexRandom.length < lengthNotRandom){
            let indexNotRandom = Math.random()*lengthNotRandom ^ 0;
            if(topicsIndexRandom.indexOf(indexNotRandom) == -1){
                topicsIndexRandom.push(indexNotRandom);
            }
        }
        for(var i=0; i<topicsIndexRandom.length; i++){
            outputRandom.push(topicsNotRandom[topicsIndexRandom[i]]);
        }
        return outputRandom;
    }
}


module.exports = Topic;