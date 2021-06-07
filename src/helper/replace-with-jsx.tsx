export function replaceWithJSX(
  input: any[],
  regex: RegExp,
  fn: (str: string, i: number) => any
) {
  return input.flatMap((str) => {
    if (typeof str == 'string') {
      const result = str.split(regex)
      for (let i = 1; i < result.length; i += 2) {
        result[i] = fn(result[i], i)
      }
      return result
    } else {
      return [str]
    }
  })
}
