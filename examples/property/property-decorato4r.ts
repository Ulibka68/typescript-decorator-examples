namespace propertya22332 {

  class ReflectTest {
    static defineMetadata(
      metadataKey: string,
      metadataValue: any,
      target: any,
      propertyKey: string
    ): void {
      target.ReflectMetadata ??= {};
      target.ReflectMetadata[metadataKey] ??= {};
      target.ReflectMetadata[metadataKey][propertyKey] ??= null;
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