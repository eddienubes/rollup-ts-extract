'use strict';

var httpStatusCodes = require('http-status-codes');
var path = require('node:path');

const testValue = 'test';
const testFunction = () => {
    return testValue;
};

var name = "biba";
var json = {
	name: name
};

class SomeClass {
    statusCode = httpStatusCodes.StatusCodes.OK;
    name;
    someVar = path.join('a', 'b');
    pathVar;
}
const instance = new SomeClass();

exports.SomeClass = SomeClass;
exports.bibajson = json;
exports.instance = instance;
exports.testFunction = testFunction;
