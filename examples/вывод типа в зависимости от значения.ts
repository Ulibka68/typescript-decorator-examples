// от Mike
// @dreamingdev

type A = {tag: "a"};
type B = {tag: "b"};

type Choice<K extends boolean, L, R> = K extends true ? L : R

const check = <K extends boolean>(key: K): Choice<K, A, B> => {
  return {} as any // implementation
}

const a = check(true); // a будет типа A
const b = check(false);