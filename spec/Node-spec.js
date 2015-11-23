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

function fixRes (res) {
    return JSON.parse(JSON.stringify(res));
}


describe('Node', function() {
    it('should update db', function(done) {
        ClassNode.update(input_output.input_0).then(function(res) {
            res = fixRes(res);

            expect(res.unmodified).toEqual(input_output.output_0.unmodified);
            expect(res.unrecognized).toEqual(input_output.output_0.unrecognized);

            ClassNode.removeAll().then(function () {
                Unrecognized.remove({}).then(function () {
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

            ClassNode.removeAll().then(function () {
                Unrecognized.remove({}).then(function () {
                    done();
                });
            });

        });
    });
});