// use this tagged template literal to enable formatting outside of className
// auto-complete works in vs code with this config:
/*

"tailwindCSS.experimental.classRegex": ["tw`([^`]*)"]

*/

export function tw(template: TemplateStringsArray, ...templateElements: any[]) {
  return template
    .reduce((sum, n, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const templateElement = templateElements[index]
      if (typeof templateElement === 'string') {
        return `${sum}${n}${templateElement}`
      }
      return `${sum}${n}`
    }, '')
    .trim()
    .replace(/\s{2,}/g, ' ')
}

// source: https://github.com/michal-wrzosek/cntl/blob/master/src/cntl.ts
