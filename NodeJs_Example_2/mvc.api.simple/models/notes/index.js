const mongoose    = require('mongoose');
const timestamps  = require('mongoose-timestamp');
const bcrypt      = require('bcrypt');
var Schema = mongoose.Schema;

// Notes  schema
var NotesSchema  = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, 'title is required'],
        validate: {
            validator: function(value) {
                return /[\w ]{5,}/.test(value)
            },
            message: '{VALUE} is not a valid !'
        },
        minlength: [5, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).']
    },
    body: {
        type: String,
        required: [true, 'body is required'],
        minlength: [5, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).']
    }
});

NotesSchema.plugin(timestamps);
NotesSchema.statics = require('./statics');
NotesSchema.methods = require('./methods');

module.exports = mongoose.model('Notes', NotesSchema);
