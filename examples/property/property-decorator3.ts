namespace propertya22332 {

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

    public surname: string;

    constructor(surname: string) {
      this.surname = surname;
    }

    metaData() {
      ReflectTest.defineMetadata("typeMetadataKey", 1, this, "key");
    }

    static initClass() {
      Person.prototype.metaData();
    }
  }

  /*
  const aaa = {};
  ReflectTest.defineMetadata("typeMetadataKey", 1, aaa, "key");
  console.log(aaa);
  */
  Person.initClass();

  console.log('var p = new Person("remo")');
  var p = new Person("remo");
  console.log(p);
  console.log((p as any).ReflectMetadata);
}