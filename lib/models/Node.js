var smc_connection = require('../mongoose-connection');
var NodeSchema = require('../schemas/Node');
var Unrecognized = require('./Unrecognized');
var bb = require('bluebird');
var async = require('async');

/*module.exports = smc_connection.model('Node', NodeSchema);
return;*/

/*
takes an array of elements and performs an update: 
- It restructures every datum so all the attributes of the node 
are moved into attribute filed and requirements are moved
into requirements field. 
- ids of elements array of requirements field 
are replaced with mongodb ObjectIds so we can use population feature.
- if class node doesn't exist it just gets inserted.
*/
module.exports.update = updateNodes;

//returns a shallow copy of element/s. Takes an array of user ids (attributes.id)
module.exports.findByUserIds = findNodesByUserIds;

//returns a deep copy of element/s
//module.exports.deepFind = deepFindNodes;

//returns a deep copy of element/s. Takes an array of user ids (attributes.id)
module.exports.deepFindByUserIds = deepFindNodesByUserIds;

module.exports.removeByUserIds = removeNodesByUserIds; // not implemented yet

module.exports.removeAll = removeAllNodes;

var ClassNode = smc_connection.model('Node', NodeSchema);

function updateNodes(nodes) {
    if (!Array.isArray(nodes)) {
        console.warn('Passed parameter must be of the Array type. Nothing updated.');
        return;
    }

    nodes = JSON.parse(JSON.stringify(nodes));

    var n,
        new_node,
        newNodes = [],
        res = {
            unmodified: { // elements before their requirements object is modified
                inserted: [], // newly inserted into the database nodes
                updated: [] // nodes that got updated
            },
            modified: { // elements after their requirements object is modified
                inserted: [],
                updated: []
            },
            unrecognized: { // nodes that appeared as requirements, but that do not exist in our database (meaning we know nothing about them)
                inserted: []
            },
            requirementsChanged: [] // here we store ids of elements requirements of which were changed with the new database update
        };

    var idToTypeMap = {};

    function update(idx) {
        if (idx < 0) {
            return;
        }
        n = nodes[idx];
        // first we update attributes field and insert
        // new nodes (with attributes and requirements fields) if needed
        return ClassNode.findOne({
            'attributes.id': n.id
        }).then(function(db_node) {
            if (db_node) { // update
                db_node.set('attributes', extractAttributes(n)); // we only update attributes of the existing node

                idToTypeMap[db_node._id] = 'updated'; // we'll use it to update modified field of the res
                res.unmodified.updated.push(db_node.toObject());

                return db_node.save().then(function() { //this will persist new attributes
                    return --idx;
                });
            } else { // insert
                newNodes.push(n.id); // we'll use this to avoid requiremnts object check. Newly inserted nodes shouldn't be checked for that.

                new_node = new ClassNode();
                new_node.set('attributes', extractAttributes(n));
                new_node.set('requirements', n.requirements); // elements arrays for requirements object will contain ids of required classes as strings

                return new_node.save().then(function(db_node) {
                    // have to update idToTypeMap here because db_node is garanteed to have an _id attriubte
                    idToTypeMap[db_node._id] = 'inserted'; // we'll use it to update modified field of the res
                    res.unmodified.inserted.push(db_node.toObject());
                    return --idx;
                });
            }
        }).then(update); // update next
    }
    /*
    this function will replace all the id string in elements arrays of requirements objects with ObjectIds that will let us to do mongoose populations
     */
    function replaceIdsWithObjectIds(idx) {
        if (idx < 0) {
            return;
        }
        n = nodes[idx];
        // first we update attributes field and insert
        // new nodes (with attributes and requirements fields) if needed
        return ClassNode.findOne({
            'attributes.id': n.id
        }).then(function(db_node) {
            if (db_node) {
                return bb.try(function() {
                    return replaceIds(db_node, n.requirements);
                });
            } else {
                return null;
            }
        }).then(function(modif_node) {
            if (modif_node) {

                res.modified[idToTypeMap[modif_node._id]].push(modif_node.toObject());

                return modif_node.save().then(function() {
                    return --idx;
                });
            } else {
                console.log("Can't find " + n.attriubtes.id);
                return --idx;
            }
        }).then(replaceIdsWithObjectIds); // update next	
    }

    function isObject(obj) {
        return obj && obj.constructor === Object;
    }

    /*
    here we check if new requirements object has ids of nodes that the old one doesn't have
    if old_req.elements is empty we return false because
     */
    /* function unmachedIds(old_req, new_req) {
        var hasUnmatch = false;
        old_req.elements.forEach(function(el, idx) {
            if (hasUnmatch) {

            } else if (isObject(new_req.elements[idx]) && isObject(el)) {
                hasUnmatch = unmachedIds(el, new_req.elements[idx]);
            } else if (new_req.elements[idx] !== el) {

            }
        });
    }*/

    /*
    replaces all ids of the elements arrays in requirements object with ObjectIds
    if node argument is not a newly inserted into the database node then
    the old requirements object will be replaced with the new one
     */
    function replaceIds(node, req) {
        if (!req || !req.elements.length) {
            return node;
        }
        return (function iterate(req) {
                return bb.each(req.elements, function(el, idx) {
                    if (Array.isArray(el.elements)) {
                        return iterate(el);
                    } else {
                        return ClassNode.findOne({
                            'attributes.id': el
                        }).then(function(db_node) {
                            if (db_node) {
                                req.elements[idx] = db_node._id;
                            } else { // create an unrecognized requirement
                                return Unrecognized.create({
                                    attributes: {
                                        name: el
                                    },
                                    requirements: getDefaultRequirements()
                                }).then(function(db_unrec_node) {
                                    res.unrecognized.inserted.push(db_unrec_node.toObject());
                                    req.elements[idx] = db_unrec_node._id;
                                });
                            }
                        });
                    }
                });
            })(req)
            /*.then(function() {
            var id = node.get('attribute').id;
            if (newNodes.indexOf(id) < 0 && unmatchedIds(node.get('requirements'), req)) {
                res.requirementsChanged.push(id);
            }

        })*/
            .then(function() {
                node.set('requirements', req);
                return node;
            });
    }


    return bb.try(function() {
        return nodes.length - 1; // this will pass the index of the last element to the recursive update function
    }).then(update).then(function() {
        return nodes.length - 1;
    }).then(replaceIdsWithObjectIds).then(function() {
        cleanUpRes(res);
        return res;
    });
}

function cleanUpRes(res) {
    res.unmodified.inserted.forEach(function(doc) {
        delete doc._id;
    });
    res.unmodified.updated.forEach(function(doc) {
        delete doc._id;
    });
    res.modified.inserted.forEach(function(doc) {
        delete doc._id;
    });
    res.modified.updated.forEach(function(doc) {
        delete doc._id;
    });
    res.unrecognized.inserted.forEach(function(doc) {
        delete doc._id;
    });
}

function extractAttributes(node) {
    return {
        id: node.id,
        name: node.name,
        units: node.units,
        prerequisite: node.prerequisite,
        prerequisite_fixed: node.prerequisite_fixed,
        transfer: node.transfer
    };
}

function findNodesByUserIds(userIds) {
    return bb.map(userIds, function(id) {
        return findOneMultiSource({
            "attributes.id": id
        }, 'attributes');
    });
}

function deepFindNodesByUserIds(userIds) {
    var id;

    function iterate(req) {
        return bb.each(req.elements, function(el, idx) {
            if (Array.isArray(el.elements) && el.elements.length) {
                return iterate(el);
            } else {
                id = el;
                return findOneMultiSource({
                    _id: id
                }).then(function(db_node) {
                    if (db_node) {
                        req.elements[idx] = db_node.toObject();
                    }
                });
            }
        });
    }

    return bb.map(userIds, function(id) {
        return findOneMultiSource({
            "attributes.id": id
        });
    }).map(function(node) {
        var obj = node.toObject();
        return iterate(obj.requirements).then(function() {
            return obj;
        });
    });
}

function removeNodesByUserIds() {

}

function removeAllNodes() {
    return ClassNode.remove({}).exec();
}

function findOneMultiSource(query, fields) {
    var model;

    var modelNames = Object.keys(ClassNode.db.models);

    function findOne() {
        return ClassNode.db.models[modelNames.pop()].findOne(query, fields).then(function(node) {
            if (!node) {
                return bb.try(findOne);
            } else {
                return node;
            }
        });
    }

    return bb.try(findOne);
}

function getDefaultRequirements() {
    return {
        type: 'exactly',
        aggregateBy: null,
        select: 0,
        elements: []
    };
}