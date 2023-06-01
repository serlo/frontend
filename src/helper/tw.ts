// use this tagged template literal to enable formatting outside of className
// auto-complete works in vs code with this config:
/*

"tailwindCSS.experimental.classRegex": ["tw`([^`]*)"]

*/

export function tw(template: TemplateStringsArray) {
  return template
    .join(' ')
    .trim()
    .replace(/\s{2,}/g, ' ')
}

// source: https://github.com/michal-wrzosek/cntl/blob/master/src/cntl.ts
