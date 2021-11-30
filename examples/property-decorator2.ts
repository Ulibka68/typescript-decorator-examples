// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;

function Min(limit: number) {
  return function (target: Object, propertyKey: string) {
    let value: string = '----';

    const getter = function () {
      console.log('getter');
      return value;
    };


    const setter = function (newVal: string) {
      console.log('setter ', limit);
      if (newVal.length < limit) {
        console.log(`Your ${propertyKey} should be bigger than ${limit} - ${newVal}`);
        if (!('errors' in target)) {
          Object.defineProperty(target, 'errors', {
            value: [`Your ${propertyKey} should be bigger than ${limit} - ${newVal}`],
            writable: true
          });
        } else (target as any).errors.push( `Your ${propertyKey} should be bigger than ${limit} - ${newVal}`);
      } else {
        value = newVal;
      }
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter
    });
  };
}

class User {
  username: string;
  @Min(8)
  password1: string;

  @Min(4)
  password2: string = '123';

  constructor(username: string, password: string) {
    this.username = username;
    Reflect.deleteProperty(this, 'password');
    this.password1 = password;
  }
}


let danyUser2 = new User("dany2", "pass12345");
danyUser2.password1 = 'a';
console.log("//danyUser2.username, danyUser2.password//");
console.log(danyUser2.username, danyUser2.password1);

// @ts-ignore
console.log("danyUser2.errors ", danyUser2.errors);


console.log('');
console.log('***************\n');
//**************


let danyUser = new User("dany", "pass");
console.log("//danyUser2.username, danyUser2.password//");
console.log(danyUser.username, danyUser.password1);

// @ts-ignore
console.log("danyUser.errors ", danyUser.errors);
// @ts-ignore
console.log("User.prototype.errors ", User.prototype.errors);
