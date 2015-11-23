var mongoose = require('mongoose');
var plugins = require('../util/mongoose-plugins');

module.exports = new mongoose.Schema({
    attributes: {
        name: {
            type: String,
            unique: true
        }
    },
    requirements: {
        type: {
            type: String,
            enum: ['exactly', 'atLeast'],
            default: 'exactly'
        },
        aggregateBy: String,
        select: {
            type: Number,
            min: 0
        },
        elements: Array
    }
});

// make all the fields of attributes object required
module.exports.plugin(plugins.setRequiredObjectFields, {
    name: 'attributes'
});

// make almost all the fields of requirements object required
module.exports.plugin(plugins.setRequiredObjectFields, {
    name: 'requirements',
    exclude: ['aggregateBy']
});