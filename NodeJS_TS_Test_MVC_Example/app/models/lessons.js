
let sqlite3  = require('sqlite3').verbose()
const env    = require('../../env.json')
let db       = new sqlite3.Database(env.sqlite)
let Topic    = require('../models/topic')


class Lessons{
    constructor(){
        this.topics =  new Array();
    }

    async load(){
        return new Promise(function (resolve, reject) {
            db.all("SELECT id,topic,translate FROM topics", [], function (err, row) {
                if (err) reject(err);
                else resolve(row);
            });
        }).then(
            result =>{
                return new Promise(function (resolve, reject) {
                    let topics = [];
                    for(let row of result) {
                        let topic = new Topic();
                        topics.push(topic.loadWithTopic(row.id, row.topic, row.translate));
                    }
                    Promise.all(topics).then(
                        result => { resolve(result) },
                        error => {  reject(error) }
                    );
                })

            },
            error =>{
                console.log( "ERROR MESSAGES" + error);
            })
            .then(
                 function(topics){
                    for(let topic of topics) {
                      this.topics.push(topic);
                    }
                    return  this.topics;
                }.bind(this),
                function(error){
                     console.log( "ERROR MESSAGES 2" + error);
                })
    }
}


module.exports = Lessons;
