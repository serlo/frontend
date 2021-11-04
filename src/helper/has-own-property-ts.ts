// helper for typescript, see https://fettblog.eu/typescript-hasownproperty/
export function hasOwnPropertyTs<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return {}.hasOwnProperty.call(obj, prop)
}
