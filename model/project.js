'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = Schema({
    id: String,
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

projectSchema.methods.toJSON = function() {
    var obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;

    return obj;
}

module.exports = mongoose.model('Project', projectSchema);