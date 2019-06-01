
class Composer<A, B> {
  fn: (data: A) => B;

  constructor(fn: (a: A) => B) {
    this.fn = fn;
  }

  apply(data: A): B {
    return this.fn(data);
  }

  compose<C>(otherFn: (fnResult: B) => C): Composer<A, C> {
    return new Composer((data: A) => {
      return otherFn(this.fn(data));
    });
  }
}