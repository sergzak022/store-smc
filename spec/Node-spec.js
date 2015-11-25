var ClassNode = require("../lib/models/Node");
var Unrecognized = require("../lib/models/Unrecognized");
var input_output = require("./Node-input-output");

var fs = require('fs');
var path = require('path');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 20; //set it to 20 min to ease debuggin

function writeToDump(res) {
    fs.writeFile(path.join(__dirname, 'dump.txt'), JSON.stringify(res), function(err) {
        if (err) {
            console.log('didnt write to dump: ', err);
        } else {
            console.log('wrote to dump');
        }
    });
}

function fixRes(res) {
    return JSON.parse(JSON.stringify(res));
}


describe('Node', function() {
    it('should update db', function(done) {
        ClassNode.update(input_output.input_0).then(function(res) {
            res = fixRes(res);

            expect(res.unmodified).toEqual(input_output.output_0.unmodified);
            expect(res.unrecognized).toEqual(input_output.output_0.unrecognized);

            ClassNode.removeAll().then(function() {
                Unrecognized.remove({}).then(function() {
                    done();
                });
            });

        });
    });

    it('should update db', function(done) {
        ClassNode.update(input_output.input_1).then(function(res) {
            res = fixRes(res);

            expect(res.unmodified).toEqual(input_output.output_1.unmodified);
            expect(res.unrecognized).toEqual(input_output.output_1.unrecognized);

            ClassNode.removeAll().then(function() {
                Unrecognized.remove({}).then(function() {
                    done();
                });
            });

        });
    });

    it('should find updated elements', function(done) {
        ClassNode.update(input_output.input_0).then(function(res) {
            ClassNode.findByUserIds(['CS 83R', 'CS 60', 'CS 15', 'CS 52'])
                .then(function(els) {
                    els.forEach(function(el, idx, els) {
                        els[idx] = el.toObject();
                    });

                    els.reverse();

                    res.modified.inserted.forEach(function(el, idx) {
                        expect(els[idx].attributes).toEqual(el.attributes);
                    });

                    ClassNode.removeAll().then(function() {
                        Unrecognized.remove({}).then(function() {
                            done();
                        });
                    });
                });
        });
    });

    it('should find updated elements', function(done) {
        ClassNode.update(input_output.input_0).then(function(res) {
            ClassNode.deepFindByUserIds(['CS 83R'])
                .then(function(objs) {

                    var obj = objs[0];

                    res.unmodified.inserted.reverse();

                    var root = res.unmodified.inserted[0];
                    var elements = res.unmodified.inserted.slice(1);

                    expect(root.attributes).toEqual(obj.attributes);

                    expect(obj.requirements.elements[0].attributes).toEqual(elements[0].attributes);

                    expect(obj.requirements.elements[1].elements[0].attributes).toEqual(elements[1].attributes);
                    expect(obj.requirements.elements[1].elements[1].attributes).toEqual(elements[2].attributes);

                    ClassNode.removeAll().then(function() {
                        Unrecognized.remove({}).then(function() {
                            done();
                        });
                    });
                });
        });
    });

it('should find updated elements', function(done) {
        ClassNode.update(input_output.input_1).then(function(res) {
            ClassNode.deepFindByUserIds(['MCRBIO 1'])
                .then(function(objs) {

                    expect(objs[0]).toEqual(input_output.mcrbio_1_deep);

                    ClassNode.removeAll().then(function() {
                        Unrecognized.remove({}).then(function() {
                            done();
                        });
                    });
                });
        });
    });

});