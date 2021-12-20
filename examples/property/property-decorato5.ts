// определяемся в prototype в static
namespace propertya2233212 {

  class ReflectTest {
    static defineMetadata(
      metadataKey: string,
      metadataValue: any,
      target: any,
      propertyKey: string
    ): void {
      let _a, _b, _c;
      let _d, _e;
      (_a = target.ReflectMetadata) !== null && _a !== void 0 ? _a : (target.ReflectMetadata = {});
      (_b = (_d = target.ReflectMetadata)[metadataKey]) !== null && _b !== void 0 ? _b : (_d[metadataKey] = {});
      (_c = (_e = target.ReflectMetadata[metadataKey])[propertyKey]) !== null && _c !== void 0 ? _c : (_e[propertyKey] = null);
      target.ReflectMetadata[metadataKey][propertyKey] = metadataValue;
    }
  }


  class Person {
    public typeClass = 'person class';

    static initClass(metaVal: any) {
      this.prototype.metaData(metaVal);
      // Person.prototype.metaData(metaVal);
    }

    metaData(metaVal: any) {
      ReflectTest.defineMetadata("typeMetadataKey", metaVal, this, "key");
    }
  }

  class A extends Person {
  }

  A.initClass('A');

  class B extends Person {
  }

  B.initClass('B');

  const a=new A();
  const b=new B();
  console.log((a as any).ReflectMetadata);
  console.log((b as any).ReflectMetadata);
}