export function replaceWithJSX(
  input: (string | JSX.Element)[],
  regex: RegExp,
  fn: (str: string, i: number) => JSX.Element
) {
  return input.flatMap((str) => {
    if (typeof str == 'string') {
      const result = str.split(regex) as (string | JSX.Element)[]
      for (let i = 1; i < result.length; i += 2) {
        result[i] = fn(result[i] as string, i)
      }
      return result
    } else {
      return [str]
    }
  })
}
