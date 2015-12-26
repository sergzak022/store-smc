var ClassNode = require("../lib/models/Node");

ClassNode.getNodesLinksData(['CS 83R']).then(function (res) {
	console.log(res);
});