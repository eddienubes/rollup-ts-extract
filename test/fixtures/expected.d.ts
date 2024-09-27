import { StatusCodes } from 'http-status-codes';
import path from 'node:path';

declare const testFunction: () => string;

var name = "biba";
var json = {
	name: name
};

declare class SomeClass {
    statusCode: StatusCodes;
    name: string;
    someVar: string;
    pathVar: typeof path.join;
}
declare const instance: SomeClass;

export { SomeClass, json as bibajson, instance, testFunction };
