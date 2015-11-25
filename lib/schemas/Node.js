var mongoose = require('mongoose');
var plugins = require('../util/mongoose-plugins');

module.exports = new mongoose.Schema({
    attributes: {
        id: {
            type: String,
            unique: true
        },
        name: {
            type: String,
            unique: true
        },
        units: {
            type: Number,
            min: 0
        },
        transfer: [String],
        prerequisite: String,
        prerequisite_fixed: String,
        description: String
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

// set index for attributes.id for fast retrieval
module.exports.path('attributes.id').index(true);

// make all the fields of attributes object required
module.exports.plugin(plugins.setRequiredObjectFields, {
    name: 'attributes'
});

// make almost all the fields of requirements object required
module.exports.plugin(plugins.setRequiredObjectFields, {
    name: 'requirements',
    exclude: ['aggregateBy']
});