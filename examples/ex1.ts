type Payload = number
type ClassConstructor<T> = new(...args: any[]) => T

function serializable<T extends ClassConstructor<{ getValue(): Payload }>>
(Constructor: T) {
  return class extends Constructor {
    serialize() {
      return `"${this.getValue().toString()} num"`;
    }
  };
}

@serializable
class APIPayload {
  getValue(): Payload {
    return 1;
  }
}

const a = new APIPayload();
/* @ts-ignore */
console.log(a.serialize());