exports.fromTreeObjectsArrayToNodesLinks = fromTreeObjectsArrayToNodesLinks;

// GROUP_COUNTER is used to create unique group ids
var GROUP_COUNTER = 0;

function fromTreeObjectsArrayToNodesLinks(nodes) {
	var result = [];
	nodes.forEach(function (node) {
		populateArray(result, node);
	});
	GROUP_COUNTER = 0; // groups in the result array are garanteed to be unique
	return result;
}

function populateArray (arr, node) {
	iterate(arr, node);
}

function getNodeType(node) {
    return node.type;
}

function isType(node, type) {
    return getNodeType(node) === type;
}

function combine(a, min) {
    function fn(n, src, got, all) {
        if (n === 0) {
            if (got.length > 0 && got.length <= min) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    for (var i = min; i < a.length; i++) {
        fn(i, a, [], all);
    }
    if (a.length <= min) {
        all.push(a);
    }
    return all;
}

function buildUniqueId(parentId, idx) {
    return parentId + '-g' + idx;
}

function addData(arr, d) {
    if (d.from && d.to && !find(arr, function(n) {
        return n.from === d.from && n.to === d.to;
    })) {
        arr.push(d);
    } else if (d.id && !find(arr, function(n) {
        return n.id === d.id;
    })) {
        arr.push(d);
    }
}

function jsonClone (obj) {
	return JSON.parse(JSON.stringify(obj));
}

function find (arr, cb) {
	var idx = 0;
	arr.some(function () {
		return cb.apply(this, arguments) || !++idx;
	});
	if (idx < arr.length) {
		return idx;
	}
}

function findBy (arr, field, value) {
	return find(arr, function (o) {
		return o[field] === value;
	});
}
/*
every node in hierachy tree must have a type (node, unrecongnized, group, set)
 */
function iterate(result, obj, parent, idx, fromElement) {
    var dObj, temp, actualParent;
    if (obj.requirements) { // element (node, unregonized, group, set) object
        // this object can be a node, group or set
        // if it's a node then we use its attrs.id for id
        // if it's a group then we use its _id for id
        // if it's a set then we do not add it to a dataset but we use its requiremnts.elements to build from/to
        dObj = obj.attributes;
        switch (obj.type) {
            case 'node':
                dObj.type = 'node';
                addData(result, dObj);
                break;
            case 'unrecognized':
                dObj.type = 'node';
                dObj.id = dObj.name;
                addData(result, dObj);
                break;
            case 'group':
                dObj.type = 'group';
                dObj.id = GROUP_COUNTER++;
                addData(result, dObj);

                if (isType(obj.requirements.elements[0], 'sets')) {
                    temp = jsonClone(obj);
                    temp.requirements.elements = obj.requirements.elements[0].requirements.elements;
                    obj = temp;
                }

                break;
            case 'set':
                break;
            default:
                throw new Error('Unknown element type');
        }
        iterate(result, obj.requirements, dObj, 0, true);
        return dObj.id;
    } else if (Array.isArray(obj.elements) && obj.elements.length) { // requirement object
        //this object will not have an identification, need to make a fuction that will build a uniq id
        dObj = {
            type: 'group'
        };
        // every non-link object in the result array must have an id
        dObj.id = buildUniqueId(parent.id, idx);
        dObj.name = obj.name;
        if (!fromElement) {
            addData(result, dObj);
        }

        // if formELement is true then we iterated from the element, not from the requirement object. We use parent element as a parent, not a direct parent - requirements object (object that actualy holds nodes)
        // if fromElement is false then we iterated not from an element, but from a requirements object and therefore need it to be a parent of its nodes
        if (fromElement) {
            actualParent = parent;
        } else {
            actualParent = findBy(result, 'id', dObj.id);
        }
        if (obj.type === 'exactly') {
            // if actualParent is a group we need to specify
            // aggregateBy and exactly fields of the parent
            // these fields are used two build a proper sequence layout
            if (actualParent.type === 'group') {
                actualParent.aggregateBy = obj.aggregateBy;
                actualParent.exactly = parseInt(obj.select, 10);
            }
            if (parseInt(obj.select, 10) < obj.elements.length) {
                //if # of object we can select is less than total number of elements
                //then we get "or" relations
                var ids = [];
                /*
                we accomplish two things here:
                first, we keep iterating through the hierarchy chain and keep feeling result array
                second, we collect ids of all the direct children so that we can use them
                (we either can use them as it is or group them (that happens when we have something like select 2 els out of 3 els) )
                 */
                obj.elements.forEach(function(el, idx) {
                    ids.push(iterate(result, el, (fromElement) ? parent : dObj, idx));
                });
                /*
                we need to get combinations to know if we need grouping of children
                 */
                var combinations = combine(ids, obj.select);

                combinations.forEach(function(combination, idx) {
                    // if one combination has one element that means all combinations will have one element, and vice versa
                    if (combination.length > 1) {
                        //if combinations have more than one element than we need to create an extra group
                        var combGroupid = buildUniqueId((fromElement) ? parent.id : dObj.id, 'd' + idx);
                        // add group data element to the result array
                        addData(result, {
                            id: combGroupid,
                            type: 'group'
                        });
                        // add link data element from the current dObj to the inserted group
                        addData(result, {
                            from: dObj.id,
                            to: combGroupid,
                            reltype: 'or'
                        });
                        // add link data elements from the inserted group to the child elements
                        // we already inserted children data elements
                        combination.forEach(function(elId) {
                            addData(result, {
                                from: combGroupid,
                                to: elId,
                                reltype: 'and'
                            });
                        });
                    } else {
                        addData(result, {
                            from: (fromElement) ? parent.id : dObj.id,
                            to: combination[0],
                            reltype: 'or'
                        });
                    }
                });
            } else {
                // here we itirate through all the elements of the requirements object
                // and add them to the result array. Notice that we also call iterate on all the children
                obj.elements.forEach(function(el, idx) {
                    addData(result, {
                        from: (fromElement) ? parent.id : dObj.id,
                        to: iterate(result, el, (fromElement) ? parent : dObj, idx),
                        reltype: 'and'
                    });
                });
            }
        } else {
            // here we create from/to object that all have 'and' rels
            actualParent.atLeast = parseInt(obj.select, 10);
            actualParent.aggregateBy = obj.aggregateBy;

            obj.elements.forEach(function(el, idx) {
                addData(result, {
                    from: (fromElement) ? parent.id : dObj.id,
                    to: iterate(result, el, (fromElement) ? parent : dObj, idx),
                    reltype: 'and'
                });
            });
        }
        return dObj.id;
    }
}