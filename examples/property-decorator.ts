import "reflect-metadata";

const formatMetadataKey = Symbol("format");


/*
function metadata(metadataKey: any, metadataValue: any) : {
  (target: Function): void;
  (target: Object, propertyKey: string | symbol): void;
}
*/

// function func1(a:number) :{(target: Function): void;(target: Object): void;} {

// <html>TS2322: Type '(target: Function) =&gt; void' is not assignable to type
// '{ (target: Function): void; (target: Object): void; }'.<br/>
// Types of parameters 'target' and 'target' are incompatible.<br/>
// The 'Object' type is assignable to very few other types.
// Did you mean to use the 'any' type instead?<br/>
// Type 'Object' is missing the following properties from type 'Function': apply, call, bind, prototype, and 5 more.

//   function a1 (target: Function):void{
//     console.log('fff');}
//
// function a2 (target: Object):void{
//     console.log('fff1');
// }
//
//   return {a1,a2}
//
// }

/*
Декоратор свойств объявляется непосредственно перед объявлением свойства.
Декоратор свойств нельзя использовать в файле объявления или в любом другом окружающем контексте (например, в классе объявления).

Выражение для декоратора свойств будет вызываться как функция во время выполнения со следующими двумя аргументами:

1.  Либо функция-конструктор класса для статического члена, либо прототип класса для члена экземпляра.
2.  Имя свойства.

  ПРИМЕЧАНИЕ. Дескриптор свойства не предоставляется в качестве аргумента для декоратора свойств из-за того, как декораторы свойств инициализируются в TypeScript. Это связано с тем, что в настоящее время нет механизма для описания свойства экземпляра при определении членов прототипа, а также нет способа наблюдать или изменять инициализатор для свойства. Возвращаемое значение также игнорируется. Таким образом, декоратор свойств может использоваться только для наблюдения за тем, что свойство с определенным именем было объявлено для класса.

  */

// The @format("Hello, %s") decorator here is a decorator factory. When @format("Hello, %s") is called, it adds a metadata entry for the property using the Reflect.metadata function from the reflect-metadata library. When getFormat is called, it reads the metadata value for the format.
function format(formatString: string) {

  // Returns:
  //   A decorator function.
  //   If metadataKey is already defined for the target and target key, the metadataValue for that key will be overwritten.
  console.log('format init call',formatString);
  return Reflect.metadata(formatMetadataKey, formatString);
}


class Greeter {
  @format(`Hello, %s`)
  greeting: string;

  @format("Title : %s")
  title: string='title';

  formatTxt:string;

  constructor(message: string, formatTxt:string) {
    this.greeting = message;
    this.formatTxt=formatTxt;
  }


  getFormat(propertyKey: string): string {
    return Reflect.getMetadata(formatMetadataKey, this, propertyKey);
  }

  greet() {
    let formatString = this.getFormat("greeting");
    return formatString.replace("%s", this.greeting);
  }
}

const a = new Greeter('gret1','ff');
console.log(a.greet());
const a1 = new Greeter('gret2','aa');
console.log(a1.greet());
