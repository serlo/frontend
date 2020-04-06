import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const bodyStyles = {
  margin: 0,
  fontFamily: 'Karmilla, sans-serif',
  letterSpacing: '-0.007em'
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="de">
        <Head />
        <body style={bodyStyles}>
          <Main />
          <NextScript />
          {/* <script
            async
            src="https://cse.google.com/cse.js?cx=016022363195733463411:78jhtkzhbhc"
          ></script> */}

          {/* current serlo search */}
          <script
            async
            src="https://cse.google.com/cse.js?cx=017461339636837994840:ifahsiurxu4"
          ></script>
        </body>
      </Html>
    )
  }
}
