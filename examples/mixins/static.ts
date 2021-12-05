// Чтобы пример работал declaration в tsconfig должно быть равно false
/*
Static Property Mixins #17829
More of a gotcha than a constraint. The class expression pattern creates singletons, so they can’t be mapped at the type system to support different variable types.

You can work around this by using functions to return your classes which differ based on a generic:
*/

function base<T>() {
  class Base1 {
    static prop: T;
  }
  return Base1;
}

function derived<T>() {
  class Derived extends base<T>() {
    static anotherProp: T;
  }
  return Derived;
}

class Spec extends derived<string>() {}

Spec.prop='aa'; // string
Spec.anotherProp='bb'; // string

console.log(Spec.prop)