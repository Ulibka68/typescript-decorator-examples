function logProperty(target: any, key: string) {

  // property value
  let _val = target[key];

  // property getter
  function getter() {
    console.log(`   Getter LOG: ${key} => ${_val}`);
    return _val;
  };

  // property setter
  function setter(newVal: any) {
    console.log(`   Setter log: ${key} => ${newVal}`);
    _val = newVal;
  };

  // Delete property.
  if (delete target[key]) {

    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
}


// фабричный декоратор
function logProperty2(NameLog: string): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    // property value
    let _val = (target as any) [propertyKey.toString()];

    // property getter
    function getter() {
      console.log(`   Getter LOG ${NameLog}:  ${propertyKey.toString()} => ${_val}`);
      return _val;
    };

    // property setter
    function setter(newVal: any) {
      console.log(`   Setter log ${NameLog}: ${propertyKey.toString()} => ${newVal}`);
      _val = newVal;
    };

    // Delete property.
    if (delete (target as any)[propertyKey]) {

      // Create new property with getter and setter
      Object.defineProperty(target, propertyKey.toString(), {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }

  };

}


class Person {
  @logProperty
  public name: string;

  @logProperty2('A22LOG')
  public surname: string;

  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }
}

console.log('var p = new Person("remo", "Jansen")');
var p = new Person("remo", "Jansen");
console.log('p.name = "Remo2";');
p.name = "Remo2";
console.log('var n = p.name;');
var n = p.name;
console.log('surname=');
p.surname = 'Вася';