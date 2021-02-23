"use strict";

var ObjectId = require('mongodb').ObjectId;

//маршрут CREATE
module.exports = function( app,db,callback) {

    // cлушаем http://localhost:8000/:id GET вернуть
    app.get('/notes/:id', (req, res) => {
        // POST:id
        const details = { '_id': new ObjectId(req.params.id)  };
        const collection =  db.collection('notes');
        collection.findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
            callback();
        });
    });


    // cлушаем http://localhost:8000/notes POST создать
     app.post('/notes', (req, res) => {
         // POST:body,title
          const note = { text: req.body.body, title: req.body.title };
          const collection =  db.collection('notes');

        collection.insert(note, (err, result) => {

                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    res.send(result.ops[0]);
                }
                callback();
           });

        });


    // cлушаем http://localhost:8000/:id  DELETE удаление
    app.delete('/notes/:id', (req, res) => {
        // DELETE:id
        const details = { '_id': new ObjectID(req.params.id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('Note ' + req.params.id + ' deleted!');
            }
        });
    });


    // cлушаем http://localhost:8000/:id  PUT обновление
    app.put ('/notes/:id', (req, res) => {
        // PUT:body,title

        const details = { '_id': new ObjectID(req.params.id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });
};