var assert = require('assert');
var fs = require('fs');
var path = require('path');


function runTests() {


    describe('Test if the file index.html exists', function () {

        it('"index.html" should exists', function (done) {
            var ok = fs.statSync(path.resolve(__dirname+"/../src/", "index.html")).isFile();
            assert(ok, true);
            done();
        });

        it('Stylesheet should exists and be compiled to css', function (done) {
            var ok = fs.statSync(path.resolve(__dirname+"/../src/css/", "main.css")).isFile();
            assert(ok, true);
            done();
        });
    });

}

runTests();
