// add font-faces to global css
import '@/assets-webkit/fonts/default.css'
import '@/assets-webkit/fonts/katex/katex.css'
import '@/assets-webkit/styles/serlo-tailwind.css'

// polyfill to make future available now
if (!Object.hasOwn) {
  Object.defineProperty(Object, 'hasOwn', {
    value: function (object: object, property: PropertyKey) {
      if (object == null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      return Object.prototype.hasOwnProperty.call(Object(object), property)
    },
    configurable: true,
    enumerable: false,
    writable: true,
  })
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body style={bodyStyles}>{children}</body>
    </html>
  )
}

const bodyStyles = {
  fontFamily: 'Karmilla, sans-serif',
}
