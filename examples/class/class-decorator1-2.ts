module class_dec1_2 {
  type PropertyFuncType4 = { (a: number): number };


  const func1: PropertyFuncType4 = function (a: number): number {
    console.log("  Method calling : ", a);
    return 10;
  };

  let func2: TypedPropertyDescriptor<PropertyFuncType4>;
  func2 = {enumerable: true};
  func2.value = func1;

  function Method2(): MethodDecorator {
    return <PropertyFuncType4, >(target: Object, propertyKey: string | symbol, propertyDescriptor: TypedPropertyDescriptor<PropertyFuncType4>) => {
      propertyDescriptor.value = func1;
    };
  }


  type ParamType<T> = T;

  type OperatorFunction2<T, S> = (obs: ParamType<T>) => ParamType<S>;

  type OperatorFunction3 = <T, S>(obs: ParamType<T>) => ParamType<S>;

  const ofunc2 : OperatorFunction2<number, string> = (a:number) => 'string ret';
  const ofunc3 : OperatorFunction3 = <Number,String>(a:Number) => 'string ret';
}