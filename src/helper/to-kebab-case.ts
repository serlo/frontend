// This utility is based on https://gist.github.com/thevangelist/8ff91bac947018c9f3bfaad6487fa149#gistcomment-2837584

export function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])([A-Z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}
