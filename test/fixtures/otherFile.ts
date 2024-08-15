import { StatusCodes } from 'http-status-codes';

export class SomeClass {
  statusCode = StatusCodes.OK;
  name: string;
}

const instance = new SomeClass();