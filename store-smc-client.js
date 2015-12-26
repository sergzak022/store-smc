var store = require('./index');

store.deepFindOne('CS 83R').then(function (res) {
	console.log(res);
});
