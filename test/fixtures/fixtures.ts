const decorator: ParameterDecorator = (target: any) => {};
const decoratorFactory = () => {
  return (target: any) => {};
};
const methodDecorator: MethodDecorator = (target: any) => {};

export const testValue = 'test';

export const testFunction = () => {
  return testValue;
};

@decoratorFactory()
export class TestClass {
  constructor(
    @decorator
    private value: string
  ) {}

  @methodDecorator
  getValue() {
    return this.value;
  }
}
