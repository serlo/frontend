export function checkSerloIdHref(input: string) {
  return input.startsWith('/') && input.slice(1).match(/^\d+$/)
}
