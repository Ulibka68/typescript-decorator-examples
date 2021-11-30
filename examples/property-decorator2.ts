// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;

function Min(limit: number) {
  return function (target: Object, propertyKey: string) {
    let value: string = '----';

    const getter = function () {
      console.log('getter');
      return value;
    };


    const setter = function (newVal: string) {
      if (newVal.length < limit) {
        console.log('длина пароля <', limit);
        Object.defineProperty(target, 'errors', {
          value: `Your password should be bigger than ${limit}`
        });
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
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    Reflect.deleteProperty(this, 'password');
    this.password = password;
  }
}


let danyUser2 = new User("dany2", "pass12345");
danyUser2.password = 'a';
console.log("//danyUser2.username, danyUser2.password//");
console.log(danyUser2.username, danyUser2.password);

// @ts-ignore
console.log("danyUser2.errors ", danyUser2.errors);


console.log('');
console.log('***************\n');
//**************

let danyUser = new User("dany", "pass");
console.log("//danyUser2.username, danyUser2.password//");
console.log(danyUser.username, danyUser.password);

// @ts-ignore
console.log("danyUser.errors ", danyUser.errors);
// @ts-ignore
console.log("User.prototype.errors ", User.prototype.errors);