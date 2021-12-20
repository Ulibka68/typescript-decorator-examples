function Func1(name) {
  this.name = name;
  console.log('new.target ', new.target);

  this.method1 = function () {
  };

}

Func1.prototype.id = 1;

console.log('Func1.prototype', Func1.prototype);

const a1 = new Func1('a');
console.log('a1.constructor === Func1 ', a1.constructor === Func1);
console.log('a1.constructor ', a1.constructor );
console.log('a1.prototype ', a1.prototype);
console.log('a1.__proto__ ', a1.__proto__ === Func1.prototype);

const a2 = new Func1('b');
a2.id = 8;
console.log('a2 ', a2);
console.log('a1 ', a1);
console.log('a1.id, a2.id ', a1.id, a2.id);
