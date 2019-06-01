
interface Ok<A> {
  ok: true;
  result: A
}

interface Err<A> {
  ok: false;
  result: A;
}

export type Result<A, B> 
  = Ok<A>
  | Err<B>
  