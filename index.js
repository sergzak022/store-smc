var ClassNode = require("./lib/models/Node");
var bb = require('bluebird');

/*ClassNode.create({
    attributes: {
        "id": "AHIS 1",
        "name": "Western Art History I",
        "units": 3,
        "transfer": [
            "UC",
            "CSU"
        ],
        "prerequisite": "None.",
        "prerequisite_fixed": "",
        "description": "A survey of the chronological development of Western art from the Stone Age to the Gothic Period with emphasis on the cultural, political, and social factors that influenced this evolution. This includes: Near-Eastern, Egyptian, Greek, Roman, Byzantine, Romanesque and Gothic art and architecture."
    },
    requirements: {
        "type": "exactly",
        "aggregateBy": null,
        "select": 0,
        "elements": []
    }
}, function ( err, instance ) {
	if ( err ) {
		console.log( err );
		return;
	}

	console.log(instance);
});*/



ClassNode.findOne({'attributes.id' : "AHIS 1"}/*, function (err, user) {
	console.log(user);
}*/).then(
	function (user) {
		console.log(user);
	},
	function (err) {
		console.log(err);
	}
);


/*
 what functionality i'll need from the Node Model?
-----------------------------API----------------------------------
// takes an array of elements and performs an update: 
- It restructures every datum so all the attributes of the node 
are moved into attribute filed and requirements are moved
into requirements field. 
- ids of elements array of requirements field 
are replaced with mongodb ObjectIds so we can use population feature.
- if class node doesn't exist it just gets inserted.
Node.update([]);

//returns a shallow copy of the element/s
Node.find([]);

//returns a deep copy of the element/s
Node.deepFind([]);
	
 */