'use strict';

const testValue = 'test';
const testFunction = () => {
    return testValue;
};

var name = "biba";
var json = {
	name: name
};

exports.bibajson = json;
exports.testFunction = testFunction;
