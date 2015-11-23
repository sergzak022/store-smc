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

//returns a shallow copy of element/s
module.exports.find = findNodes;

//returns a deep copy of element/s
module.exports.deepFind = deepFindNodes;

module.exports.remove = removeNodes;

module.exports.removeAll = removeAllNodes;

var ClassNode = smc_connection.model('Node', NodeSchema);

function updateNodes(nodes) {
    if (!Array.isArray(nodes)) {
        console.warn('Passed parameter must be of the Array type. Nothing updated.');
        return;
    }

    var n,
        new_node,
        res = {
            unmodified: {
                inserted: [],
                updated: []
            },
            modified: {
                inserted: [],
                updated: []
            },
            unrecognized: {
                inserted: []
            }
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
                db_node.set('attributes', extractAttributes(n));

                idToTypeMap[db_node._id] = 'updated'; // we'll use it to update modified field of the res
                res.unmodified.updated.push(db_node.toObject());

                return db_node.save().then(function() {
                    return --idx;
                });
            } else { // insert
                new_node = new ClassNode();
                new_node.set('attributes', extractAttributes(n));
                new_node.set('requirements', n.requirements);

                return new_node.save().then(function(db_node) {
                    // have to update idToTypeMap here because db_node is garanteed to have an _id attriubte
                    idToTypeMap[db_node._id] = 'inserted'; // we'll use it to update modified field of the res
                    res.unmodified.inserted.push(db_node.toObject());
                    return --idx;
                });
            }
        }).then(update); // update next
    }

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
                    return (replaceIds(db_node, n.requirements));
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


    function replaceIds(node, req) {
        //var req = node.get('requirements');
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
        })(req).then(function() {
            node.set('requirements', req);
            return node;
        });
    }


    return bb.try(function() {
        return nodes.length - 1;
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

function findNodes() {

}

function deepFindNodes() {

}

function removeNodes() {

}

function removeAllNodes() {
    return ClassNode.remove({}).exec();
}

function findOneMultiSource(query, fields) {
    var model;

    var modelNames = Object.keys(ClassNode.db.models);

    function findOne() {
        if (modelName) {
            return ClassNode.db.models[modelNames.pop()].findOne(query, fields).then(function(user) {
                if (!user) {
                    return bb.try(findOne);
                } else {
                    return user;
                }
            });
        }
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