const assert = require('assert');
const utils = require('tramway-core-testsuite');
const lib = require('../dist/index.js');
var describeCoreClass = utils.describeCoreClass;
var describeFunction = utils.describeFunction;

describe("Simple acceptance tests to ensure library returns what's promised.", function(){
    describe("Should return a proper 'Command' class", describeCoreClass(
        lib.Command, 
        "Command", 
        [],
        ["action", 'configure', 'get', 'update', 'getArgument', 'getOption'],
        function(testClass, testInstance, classFunctions, instanceFunctions) {
            describe("The 'action' function should have the same signature", describeFunction(
                testInstance["action"], 
                []
            ));
            describe("The 'configure' function should have the same signature", describeFunction(
                testInstance["configure"], 
                []
            ));
            describe("The 'get' function should have the same signature", describeFunction(
                testInstance["get"], 
                []
            ));
            describe("The 'update' function should have the same signature", describeFunction(
                testInstance["update"], 
                ["args", "options"]
            ));
            describe("The 'getOption' function should have the same signature", describeFunction(
                testInstance["getArgument"], 
                ["key"]
            ));
            describe("The 'getOption' function should have the same signature", describeFunction(
                testInstance["getArgument"], 
                ["key"]
            ));
        }
    ));
    describe("Should return an object for commands.", function(){
        it("Should return an object for commands.", function(){
            assert.strictEqual(typeof lib.commands, "object");
        });

        it("There should be the same commands as in the previous version", function(){
            assert.deepEqual(Object.keys(lib.commands), ["CommandResolver", "InputOption", "InputOptions", "InputResolver"]);
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

        // describe("Should return a proper 'InputOption' class", describeCoreClass(
        //     lib.commands.InputOption, 
        //     "InputOption", 
        //     [],
        //     ['setValue', 'getValue', 'getName', 'getType', 'getRequired', 'isRequired'],
        //     function(testClass, testInstance, classFunctions, instanceFunctions) {
        //         describe("The 'setValue' function should have the same signature", describeFunction(
        //             testInstance["setValue"], 
        //             ["value"]
        //         ));
        //         describe("The 'getValue' function should have the same signature", describeFunction(
        //             testInstance["getValue"], 
        //             []
        //         ));
        //         describe("The 'getName' function should have the same signature", describeFunction(
        //             testInstance["getName"], 
        //             []
        //         ));
        //         describe("The 'getType' function should have the same signature", describeFunction(
        //             testInstance["getType"], 
        //             []
        //         ));
        //         describe("The 'getRequired' function should have the same signature", describeFunction(
        //             testInstance["getRequired"], 
        //             []
        //         ));
        //         describe("The 'isRequired' function should have the same signature", describeFunction(
        //             testInstance["isRequired"], 
        //             []
        //         ));
        //     }     
        // ));

        describe("Should return a proper 'InputOptions' class", describeCoreClass(
            lib.commands.InputOptions, 
            "InputOptions", 
            [],
            ['add', 'getOptions', 'getOption', 'update'],
            function(testClass, testInstance, classFunctions, instanceFunctions) {
                describe("The 'add' function should have the same signature", describeFunction(
                    testInstance["add"], 
                    ["option"]
                ));
                describe("The 'getOptions' function should have the same signature", describeFunction(
                    testInstance["getOptions"], 
                    []
                ));
                describe("The 'getOption' function should have the same signature", describeFunction(
                    testInstance["getOption"], 
                    ["option"]
                ));
                describe("The 'update' function should have the same signature", describeFunction(
                    testInstance["update"], 
                    ["key", "value"]
                ));
            }     
        ));

        describe("Should return a proper 'InputResolver' class", describeCoreClass(
            lib.commands.InputResolver, 
            "InputResolver", 
            ['updateCommand'],
            [],
            function(testClass, testInstance, classFunctions, instanceFunctions) {
                describe("The 'updateCommand' function should have the same signature", describeFunction(
                    testClass.updateCommand, 
                    ["command", "inputArgs", "inputOptions"]
                ));
            }     
        ));
    });
});