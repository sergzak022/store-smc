var ClassNode = require("./lib/models/Node");
var bb = require('bluebird');

exports.update = function(json_arr) {
	ClassNode.update(json_arr);
};

exports.deepFind = function(ids_arr, depth) {
	return ClassNode.deepFindByUserIds(ids_arr, depth);
};

exports.deepFindOne = function(id, depth) {
	return ClassNode.deepFindByUserIds([id], depth);
};