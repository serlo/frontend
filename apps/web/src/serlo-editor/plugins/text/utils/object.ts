export const isEmptyObject = (value: unknown) => {
  return (
    value &&
    Object.keys(value).length === 0 &&
    Object.getPrototypeOf(value) === Object.prototype
  )
}
