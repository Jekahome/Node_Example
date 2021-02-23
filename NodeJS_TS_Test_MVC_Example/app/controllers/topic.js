let  Topic      = require('../models/topic')
let  Lessons = require('../models/lessons')

exports.list = function (request, response, next) {
    /*let lessons = new Lessons();
    lessons.load().then(function(result){
       return response.render('lessons', {
            lessons: result
        })
    });*/

    let lessons = new Lessons();
    lessons.load().then(function(result){
        return response.render('lessons', {
            lessons: result
        })
    });

    // response.send("Hello");
};

exports.topic = function (request, response, next) {
    let topic = new Topic();
    topic.load(request.params.topicId).then(function(result){
        return response.render('topic', {
            topic: result
        })
    });
};
/*
module.exports = {
    // A func that takes in two parameters `req` and `res` [request, response]
    getIndexPage: (req, res) => {
        res.send("Hey");
    }
}*/