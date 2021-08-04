export function isDefined<A>(x: A | undefined | null | false): x is A {
  return x != null && x !== false
}
