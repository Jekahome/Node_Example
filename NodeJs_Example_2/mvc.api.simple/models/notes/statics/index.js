const crypto      = require('crypto');
const mongoose    = require('mongoose');
const {ObjectId}  = mongoose.Types;

//var ObjectId = require('mongodb').ObjectId;


/**
 * Returns array documents of Users matching criteria.
 *
 * Example:
 *
 *      Schema.static({
 *        deleted: function (cb) {
 *          this.items({
 *            criteria: { removed: false },
 *            sort: { name: 'desc' }
 *            limit: 20,
 *            select: 'name email phone'
 *          }, cb)
 *        }
 *      })
 *
 * @param {Object} options
 * @param {Function} callback
 * @return void
 */
exports.findBy = function (options, callback) {
    var criteria = options.criteria || {};
    var sort = options.sort || { createdAt: -1 };
    var limit = options.limit === 0 ? 0 : (options.limit || 16);
    var page = options.page || 0;
    //var populate = options.populate || [];
    var select = options.select || '';

    this.find(criteria)
        .select(options.select)
        //.populate(options.populate)
        .sort(sort)
        .limit(limit)
        .skip(limit * page)
        .exec(callback)
};

/**
 * Returns document of User matching criteria.
 *
 * Example:
 *
 *      Schema.static({
 *        deleted: function (cb) {
 *          this.findOneBy({
 *            criteria: { removed: false, email: 'user@domain.mail' },
 *            populate: [{
 *              path: 'account', select: 'name', match: { removed: false }
 *            }]
 *          }, cb)
 *        }
 *      })
 *
 * @param {Object} options
 * @param {Function} callback
 * @return void
 */
exports.findOneBy = function (options, callback) {
    try{
        var criteria = options.criteria || {};
        var populate = options.populate || [];
        var select = options.select || '';

        this.findOne(criteria)
            .select(select)
            .populate(populate)
            .exec(callback)
    }catch(e){
        console.log('!findOneBy error!',e)
    }

};


/**
 * Update note
 *
 * @param {String} id
 * @param {Object} fields
 * @param {Function} callback
 * @return void
 */
exports.updateOne = function (id, fields, callback) {
    if (! fields.title || fields.title === 0)
        callback({ message: 'Fill out title field' });
    else if (! fields.body || fields.body=== 0)
        callback({ message: 'Fill out body field' });
    else {

        try{
            this.findOneBy({
                criteria: { _id:ObjectId(id)},
                select: '_id title body'
            }, function(err, doc) {

                if (err){
                    callback(err);
                }
                else if (! doc)
                    callback({ message: 'Invalid or otherwise expired token' });
                else {
                   // console.log('method Notes->getId',doc.getId());
                    doc.title = fields.title;
                    doc.body = fields.body;
                    doc.save(callback);
                }
            })
        }catch(e){
            console.log('!updateOne!',e);
        }
    }
};


/**
 * Create note
 * @param {Object} fields
 * @param {Function} callback
 */
exports.createOne = function (fields,callback) {

    if (! fields.title || fields.title === 0)
        callback({ message: 'Fill out title field' });
    else if (! fields.body || fields.body=== 0)
        callback({ message: 'Fill out body field' });
    else{

        try{

            new this({
                _id: new mongoose.Types.ObjectId(),
                title:fields.title,
                body:fields.body
            }).save(callback);

        }catch(e){
            console.log('!createOne!',e);
        }

    }
};


/**
 * Delete note
 * @param {String} id
 * @param {Function} callback
 */
exports.deleteOne = function (id,callback) {
    if (! id || id === 0)
        callback({ message: 'Fill out id field' });
    else{

        try{

            this.findOneBy({
                criteria: { _id:ObjectId(id)},
                select: '_id title body'
            }, function(err, doc) {

                if (err){
                    callback(err);
                }
                else if (! doc)
                    callback({ message: 'Invalid or otherwise expired token' });
                else {
                    // console.log('method Notes->getId',doc.getId());

                    doc.remove(callback);
                }
            });

        }catch (e){
            callback({ message: e});
        }
    }
};