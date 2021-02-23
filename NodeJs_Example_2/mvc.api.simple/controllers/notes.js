const Notes      = require('../models/notes');

// Контроллер (связь с моделью)


exports.getone = function (req, res, next) {
  //  console.log( 'controller notes getone!');
    Notes.findOneBy({
        criteria: { _id:req.params.id},
        select: "_id title body",//вывести такие поля
        limit: 32
    }, function(err, doc=null) {
        if (err)
            res.status(500).json(err);
        else if (! doc)
            res.status(500).json({ message: 'Cannot get note' });
        else
            res.status(200).json(doc);
    })
};



exports.putone = function (req, res, next) {
   // res.send( 'controller notes  putone!'); // putone
    console.log('controller notes  putone!',req.body);
    Notes.updateOne(
       req.params.id
    ,{
        title:req.body.title,
        body:req.body.body
    },function(err,doc){
        if (err)
            res.status(500).json(err);
        else if (! doc)
            res.status(500).json({ message: 'Cannot put note id:'+req.params.id });
        else
            res.status(200).json(doc);
    })
};



exports.deleteone = function (req, res, next) {
    console.log( 'controller notes  deleteone!');// deleteone

    Notes.deleteOne(req.params.id,function (err, doc) {
        if (err)
            res.status(500).json(err);
        else if (! doc)
            res.status(500).json({ message: 'Cannot get notes list' });
        else
            res.status(200).json(doc);
    })

};



exports.getall =  (req, res, next) => {
     console.log( 'controller notes  getall!'); // getall

    Notes.findBy({
        criteria: {},
        select: "_id title body",//вывести такие поля
        limit: 32,
        page:0
    }, function(err, doc=null) {
        if (err)
            res.status(500).json(err);
        else if (! doc)
            res.status(500).json({ message: 'Cannot get notes list' });
        else
            res.status(200).json(doc);
    })

}



exports.postone = function (req, res, next) {
    console.log( 'controller notes  postone!');// postone

    Notes.createOne({
        body: req.body.body,
        title: req.body.title
    },function(err, doc){
        if (err)
            res.status(500).json(err);
        else if (! doc)
            res.status(500).json({ message: 'Cannot get notes list' });
        else
            res.status(200).json(doc);
    });

};

