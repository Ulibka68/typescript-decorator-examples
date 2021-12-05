// Udemy Node
import {log, bgColor, fgColor} from "../colorConsole";

function Component(id: number) {
  console.log("init component");
  return (target: Function) => {
    console.log("run component");
    console.log('target.prototype :', target.prototype, " target : ", target);
    target.prototype.id = id;
  };
}

function Logger() {
  console.log("init logger");
  return (target: Function) => {
    console.log("run logger");
  };
}


// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

function Method() {
  return (target: Object, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor) => {
    log(fgColor.red, bgColor.white_default, propertyKey);
    const oldValue = propertyDescriptor.value;

    propertyDescriptor.value = function (...args: any[]) {
      const result = oldValue.apply(this, args);
      console.log('  Method calling : ', result);
      return result * 10;
    };

  };

}

type PropertyFuncType = { (a: number): number };

const func1 : PropertyFuncType = function (a: number): number {
  console.log("  Method calling : ", a);
  return 10;
};

// type PropertyFuncType =  Function;

function Method2(): MethodDecorator {
  return <PropertyFuncType, >(target: Object, propertyKey: string | symbol, propertyDescriptor: TypedPropertyDescriptor<PropertyFuncType>) => {
    log(fgColor.red, bgColor.white_default, propertyKey);
    const oldValue: PropertyFuncType = propertyDescriptor.value!;

  /*  propertyDescriptor.value = function (a: number) {
      // const result = oldValue.apply(this, args);
      console.log('  Method calling : ');
      return a * 10;
    };*/

    propertyDescriptor = {
      enumerable: true,
      value:func1,
    };

  };

}


// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
function Prop(msg: string): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    log(fgColor.green, bgColor.white_default, `  Prop caling :  ${msg}`);
    let value = 0;

    const getter = () => {
      log(fgColor.red, bgColor.white_default, `  Getter ${propertyKey as string} : ${value}`);
      return value;
    };
    const setter = (newVal: number) => {
      log(fgColor.red, bgColor.white_default, `  setter :  ${newVal}`);
      value = newVal + 100;
    };
    Reflect.defineProperty(target, propertyKey, {
      enumerable: true,
      get: getter,
      set: setter
    });
  };

}

// declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
function Param(): ParameterDecorator {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    console.log(`  ParameterDecorator : ${propertyKey as string}, ${parameterIndex}`);
  };

}

@Logger()
@Component(100)
class User {
  // убери галочку с strictPropertyInitialization в tsconfig
  @Prop('prop text')
  id: number;

  @Method()
  updateId(@Param() newId: number) {
    this.id = newId;
    return this.id;
  }
}

const u1 = new User();
const u2 = new User();

console.log(u1.updateId(2));
console.log(u2.updateId(8));

console.log('u1.id : ', u1.id, 'u2.id : ', u2.id);