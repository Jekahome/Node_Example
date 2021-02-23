const {Router}    = require('express');
const app         = Router();
const controller  = require('../controllers/notes');


// Регистрация роутеров

app.route('/:id')
    .get(controller.getone)/* cлушаем http://localhost:8000/notes/:id GET вернуть */
    .put(controller.putone) /* cлушаем http://localhost:8000/notes/:id  PUT обновление title,body */
    .delete(controller.deleteone);/* cлушаем http://localhost:8000/notes/:id  DELETE удаление */

app.route('/')
    .get(controller.getall)/* cлушаем http://localhost:8000/notes/ GET вернуть */
    .post(controller.postone)/* cлушаем http://localhost:8000/notes POST создать title,body */

module.exports = app;

//--------------------------------------------------------

/*
// cлушаем http://localhost:8000/notes/ GET вернуть
app.get('/', function(req, res, next) {
    res.status(200).json({ message:  'notes list'  })
});


// cлушаем http://localhost:8000/notes/:id GET вернуть
app.get('/:id', (req, res, next) => {
    // POST:id
    const details = { '_id': new ObjectId(req.params.id)  };
    const collection =  db.collection('notes');
    collection.findOne(details, (err, item) => {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(item);
        }
        next();
    });
});


// cлушаем http://localhost:8000/notes POST создать
app.post('/', (req, res, next) => {
    // POST:body,title
    const note = { text: req.body.body, title: req.body.title };
    const collection =  db.collection('notes');

    collection.insert(note, (err, result) => {

        if (err) {
            res.send({ 'error': 'An error has occurred' });
        } else {
            res.send(result.ops[0]);
        }
        next();
    });

});


// cлушаем http://localhost:8000/notes/:id  DELETE удаление
app.delete('/:id', (req, res, next) => {
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


// cлушаем http://localhost:8000/notes/:id  PUT обновление
app.put ('/:id', (req, res, next) => {
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
*/

