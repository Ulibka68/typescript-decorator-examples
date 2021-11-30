import "reflect-metadata";

// Parameter decorator
// target the prototype of the class for an instance member.
// propertyKey The name of the member.
//  parameterIndex The ordinal index of the parameter in the function’s parameter list.
function notNull(target: any, propertyKey: string, parameterIndex: number) {
  console.log("param decorator notNull function invoked ");
  console.log(target);
  console.log(propertyKey);
  console.log(parameterIndex);
  Validator.registerNotNull(target, propertyKey, parameterIndex);
  console.log("param decorator notNull function END ");
}

const PARAMETER_metadataKey = 'reflect-params';


  // Params:
  //   metadataKey – A key used to store and retrieve metadata.
  //   metadataValue – A value that contains attached metadata.
  //   target – The target object on which to define metadata.
  //   propertyKey – The property key for the target.
 // Reflect.defineMetadata("custom:annotation", options, target, key);


function notNull2(name: string): ParameterDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {

    console.log("======= VER2 function invoked ");
    console.log('target ',target);
    console.log("propertyKey ", propertyKey);
    console.log("parameterIndex ",parameterIndex);
    console.log('name ',name);

    // Update the parameter name metadata
    Reflect.defineMetadata(
      PARAMETER_metadataKey,
      name,
      target,
      'reflect-prop-'+parameterIndex,
    );
    console.log("======= VER2  END ");
  };
}

// Parameter decorator
// target the prototype of the class for an instance member.
// propertyKey The name of the member.
//  parameterIndex The ordinal index of the parameter in the function’s parameter list.
/*function decparate2(target: any, propertyKey: string, parameterIndex: number) {
  console.log("param decorator notNull function invoked ");
  Validator.registerNotNull(target, propertyKey, parameterIndex);
}*/

function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log("method decorator validate function invoked ");
  let originalMethod = descriptor.value;
  //wrapping the original method
  descriptor.value = function (...args: any[]) {//wrapper function
    if (!Validator.performValidation(target, propertyKey, args)) {
      console.log("validation failed, method call aborted: " + propertyKey);
      return;
    }
    let result = originalMethod.apply(this, args);
    return result;
  };
}

class Validator {
  private static notNullValidatorMap: Map<any, Map<string, number[]>> = new Map();

  //todo add more validator maps
  static registerNotNull(target: any, methodName: string, paramIndex: number): void {
    let paramMap: Map<string, number[]> = Validator.notNullValidatorMap.get(target) as Map<string, number[]>;
    if (!paramMap) {
      paramMap = new Map();
      this.notNullValidatorMap.set(target, paramMap);
    }
    let paramIndexes: number[] = paramMap.get(methodName) as number[];
    if (!paramIndexes) {
      paramIndexes = [];
      paramMap.set(methodName, paramIndexes);
    }
    paramIndexes.push(paramIndex);
  }

  static performValidation(target: any, methodName: string, paramValues: any[]): boolean {
    let notNullMethodMap: Map<string, number[]> = this.notNullValidatorMap.get(target) as Map<string, number[]>;
    if (!notNullMethodMap) {
      return true;
    }
    let paramIndexes: number[] = notNullMethodMap.get(methodName) as number[];
    if (!paramIndexes) {
      return true;
    }
    let hasErrors: boolean = false;
    for (const [index, paramValue] of paramValues.entries()) {
      if (paramIndexes.indexOf(index) != -1) {
        if (!paramValue) {
          console.error("method param at index " + index + " cannot be null");
          hasErrors = true;
        }
      }
    }
    return !hasErrors;
  }
}

class Task {

  constructor(@notNull2('aaa') a: number) {  }

  // @validate
  run(@notNull name: string): void {
    console.log("running task, name: " + name);
  }
}

console.log("-- creating instance --");
let task: Task = new Task(2);


// console.log("-- calling Task#run(null) --");
// task.run(null);

console.log("----------------");
console.log("-- calling Task#run('test') --");
task.run("test");

console.log('task');
console.log(task);
console.log('Reflect.getOwnMetadata');
console.log(Reflect.getOwnMetadata(PARAMETER_metadataKey, task));
console.log(Reflect.getOwnMetadata(PARAMETER_metadataKey, Task));