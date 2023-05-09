import '@/assets-webkit/fonts/default.css'
import '@/assets-webkit/styles/serlo-tailwind.css'

export const metadata = {
  title: '(tools) serlo.org example content',
}

const bodyStyles = {
  fontFamily: 'Karmilla, sans-serif',
  backgroundColor: '#fff',
}

// eslint-disable-next-line import/no-default-export
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="print:serlo-print-style bg-brand-100">
      {/* background on html for overscroll area */}
      <head>
        <meta name="robots" content="noindex" />
      </head>
      <body style={bodyStyles}>{children}</body>
    </html>
  )
}
