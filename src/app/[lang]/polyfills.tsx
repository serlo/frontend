// polyfills to make future available now
if (!Object.hasOwn) {
  Object.defineProperty(Object, 'hasOwn', {
    value: function (object: object, property: PropertyKey) {
      if (object === null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      return Object.prototype.hasOwnProperty.call(Object(object), property)
    },
    configurable: true,
    enumerable: false,
    writable: true,
  })
}

function at(
  this: {
    value: (n: number) => any
    writable: true
    enumerable: false
    configurable: true
    length: number
  },
  n: number
) {
  n = Math.trunc(n) || 0
  if (n < 0) n += this.length
  if (n < 0 || n >= this.length) return undefined
  // @ts-expect-error for polyfill
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return this[n]
}

const TypedArray = Reflect.getPrototypeOf(Int8Array)
for (const C of [Array, String, TypedArray]) {
  // @ts-expect-error polyfill voodoo
  Object.defineProperty(C?.prototype, 'at', {
    value: at,
    writable: true,
    enumerable: false,
    configurable: true,
  })
}

export function Polyfills() {
  // empty component, but polyfills should be registered
  return null
}
