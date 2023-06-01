// use this tagged template literal to enable formatting outside of className
// works in vs code with this config:
/*

"tailwindCSS.experimental.classRegex": ["tw`([^`]*)"]

*/

export function tw(strings: TemplateStringsArray): string {
  return strings.join('')
}
