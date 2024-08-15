import { StatusCodes } from 'http-status-codes';
import path from 'node:path';

export class SomeClass {
  statusCode = StatusCodes.OK;
  name: string;

  someVar = path.join('a', 'b');
  pathVar: typeof path.join;
}

export const instance = new SomeClass();