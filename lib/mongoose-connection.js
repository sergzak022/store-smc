var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var dburl = 'mongodb://localhost/SMC';

var smc_connection = mongoose.createConnection(dburl);

smc_connection.on('connected', function () {
	console.log('Mongoose connected to ' + dburl);
});

smc_connection.on('error',function (err) {
	console.log('Mongoose connection error: ' + err);
});

smc_connection.on('disconnected', function () {
	console.log('Mongoose disconnected from ' + dburl);
});



module.exports = smc_connection;