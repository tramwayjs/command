const assert = require('assert');
const utils = require('tramway-core-testsuite');
const lib = require('../index.js');
var describeCoreClass = utils.describeCoreClass;
var describeFunction = utils.describeFunction;

describe("Simple acceptance tests to ensure library returns what's promised.", function(){
    describe("Should return a proper 'Command' class", describeCoreClass(
        lib.Command, 
        "Command", 
        [],
        ["action"],
        function(testClass, testInstance, classFunctions, instanceFunctions) {
            describe("The 'action' function should have the same signature", describeFunction(
                testInstance["action"], 
                ["args", "options"]
            ));
        }
    ));
    describe("Should return an object for commands.", function(){
        it("Should return an object for commands.", function(){
            assert.strictEqual(typeof lib.commands, "object");
        });

        it("There should be the same commands as in the previous version", function(){
            assert.deepEqual(Object.keys(lib.commands), ["CommandResolver"]);
        });

        describe("Should return a proper 'CommandResolver' class", describeCoreClass(
            lib.commands.CommandResolver, 
            "CommandResolver", 
            [],
            ['run', 'getOptions'],
            function(testClass, testInstance, classFunctions, instanceFunctions) {
                describe("The 'run' function should have the same signature", describeFunction(
                    testInstance["run"], 
                    []
                ));
                describe("The 'getOptions' function should have the same signature", describeFunction(
                    testInstance["getOptions"], 
                    ["args"]
                ));
            }     
        ));
    });
});