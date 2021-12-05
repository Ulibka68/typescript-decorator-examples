module example2_8asd5 {
  class Sprite {
    name = "";
    x = 0;
    y = 0;

    constructor(name: string) {
      this.name = name;
    }
  }


  type GConstructor<T = {}> = new (...args: any[]) => T;

// This allows for creating classes which only work with constrained base classes:

  type Positionable = GConstructor<{ setPos: (x: number, y: number) => void }>;
  type Spritable = GConstructor<Sprite>;
  type Loggable = GConstructor<{ print: () => void }>;


//Then you can create mixins which only work when you have a particular base to build on:

  function Jumpable<TBase extends Positionable>(Base: TBase) {
    return class Jumpable extends Base {
      jump() {
        // This mixin will only work if it is passed a base
        // class which has setPos defined because of the
        // Positionable constraint.
        this.setPos(0, 20);
      }
    };
  }

}