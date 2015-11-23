var smc_connection = require('../mongoose-connection');
var UnrecognizedSchema = require('../schemas/Unrecognized');

module.exports = smc_connection.model('Unrecognized', UnrecognizedSchema);