import 'reflect-metadata';
import {log} from "../colorConsole";

const instancesMap: Map<Object, Object> = new Map<Object, Object>();

function getInstance<T>(tType: new () => T): T {
  let metadata = Reflect.getMetadata('metadataKey', tType) as Metadata;
  if (metadata.singleton) {
    if (!instancesMap.has(tType)) {
      instancesMap.set(tType, new tType());
    }
    return instancesMap.get(tType) as T;
  } else {
    return new tType() as T;
  }
}

interface Metadata {
  singleton?: boolean;
}


// declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
function CustomBehavior(metadata: Metadata): ClassDecorator {
  return function (ctor: Function) {
    Reflect.defineMetadata('metadataKey', metadata, ctor);
  };
}

@CustomBehavior({
  singleton: true
})
class TestServiceDeco {
  public n: number;

  constructor() {
    this.n = 10;
    console.log('TestServiceDeco ctor');
  }

  sumItem(a: number, b: number) {
    return a + b;
  }
}

const a = getInstance(TestServiceDeco);
a.n = 33;

const b = getInstance(TestServiceDeco);
console.log(b.n); // ожидается 33 тк singleton