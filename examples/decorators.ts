import {User} from "./User";
import {log} from "./colorConsole"

function classDecorator(...args: any): ClassDecorator {
  return function <TFunction extends Function>(
    target: TFunction
  ): TFunction | void {
    // do something
  };
}

function propertyDecorator(...args: any): PropertyDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol
  ): void {
    // do something
  };
}

function methodDecorator(...args: any): MethodDecorator {
  return function <T>(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ): TypedPropertyDescriptor<T> | void {
    // do something
  };
}

function parameterDecorator(...args: any): ParameterDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ): void {
    // do something
  };
}

export function logData(message: string): ClassDecorator {
  console.log(`[Class 🟢] Message is: ${message}`);
  return function (target: any): void {
    console.log('[Class 🟢] constructor');
  };
}

export function addProperty<T>(name: string, value: T): ClassDecorator {
  console.log(`[Class 🟩] Add property`);
  return function (target: any): void {
    target.prototype[name] = value;
    const instance = new target() as User;
    instance.firstName = "Will";
    instance.lastName = "Smith";
    console.log('New user', instance);
  };
}

// declare type MethodDecorator = <T>(
//      target: Object, propertyKey: string | symbol,
//      descriptor: TypedPropertyDescriptor<T>)
//  => TypedPropertyDescriptor<T> | void;


// <html>TS2322: Type '&lt;T&gt;(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor&lt;number&gt;) =&gt; void'
// is not assignable to type
// 'MethodDecorator'.<br/>
// Types of parameters 'descriptor' and 'descriptor' are incompatible.<br/>
// Type 'TypedPropertyDescriptor&lt;T&gt;' is not assignable to type 'TypedPropertyDescriptor&lt;number&gt;'.<br/>Types of property 'value' are incompatible.<br/>Type 'T | undefined' is not assignable to type 'number | undefined'.<br/>Type 'T' is not assignable to type 'number | undefined'.<br/>Type 'T' is not assignable to type 'number'.

export function logMethod(message: string): MethodDecorator {
  console.log(`[Method 🟠] Message is: ${message}`)
  return function (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
    log.yellow('LOG METHOD')
    console.log(`->->- logMethod ${String(propertyKey)}`);
    const ret: TypedPropertyDescriptor<number> = {
      enumerable: true,
      configurable: true,
      writable: true
    };
    return ret;
  };
}

export function logParameter(message: string): ParameterDecorator {
  console.log(`[Parameter 🔵] Message is: ${message}`);
  return function (): void {
    console.log('[Parameter 🔵] constructor');
  };
}

export function logProperty(message: string): PropertyDecorator {
  console.log(`[Property 🟡] Message is: ${message}`);
  return function (): void {
    console.log('[Property 🟡] constructor');
  };
}
