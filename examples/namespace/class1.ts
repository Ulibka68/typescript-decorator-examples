class C25689asd {
  x = 1;
}

namespace C25689asd {
  export let y: string = 'Вася';

  interface D2 {
    d2: number;
  }
}

namespace C25689asd {
  export interface D {
    df: number;
    ck: string;
  }
}

let z = C25689asd.y;
let z2 : C25689asd.D = {df:1,ck:'as'}