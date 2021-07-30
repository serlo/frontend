import chromium from 'chrome-aws-lambda'
import { NextApiRequest, NextApiResponse } from 'next'

// puppeteer as dev dependency is used locally
// on vercel it's not present and puppeter-core and chrome-aws-lambda is used instead

const styles = `
    width: 100%;
    position:relative;
    top: -10px;
    font-size: 9px;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: space-between;
    padding-right:40px;
    padding-left:40px;
    color: #666;
    `

// TODO: Check if we need this instead of the default date format
//const today = new Date().toLocaleDateString("de-DE");
//const updated = `Stand: ${today}`;

export default async function createPdf(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const urlString = decodeURIComponent(req.url?.split('?url=')[1] ?? '')

  try {
    if (urlString && isValidUrl(urlString)) {
      const browser = await chromium.puppeteer.launch({
        args: [
          ...chromium.args,
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--headless',
          '--disable-gpu',
          '--disable-dev-shm-usage',
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      })
      const page = await browser.newPage()
      await page.goto(urlString + '#print--preview', {
        waitUntil: 'networkidle0',
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const pdf = await page.pdf({
        format: 'a4',
        margin: {
          top: '40px',
          bottom: '80px',
          left: '40px',
          right: '40px',
        },
        displayHeaderFooter: true,
        headerTemplate: '<span> </span>',
        footerTemplate: `<div style="${styles}">
                            <span>Online: ${urlString}</span>
                            <span class="date"></span>
                            <span><span class="pageNumber"></span>/<span class="totalPages"></span></span>
                        </div>`,
      })
      await browser.close()
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Length', pdf.length)
      res.setHeader(
        'Cache-Control',
        'maxage=86400, stale-while-revalidate=3600, stale-if-error=604800'
      )
      res.status(200).send(pdf)
    } else throw 'Invalid URL!'
  } catch (error: unknown) {
    res.status(500).send({
      status: 'Failed',
      error,
    })
  }
}

function isValidUrl(string: string) {
  try {
    const url = new URL(string)
    if (url.hostname === 'serlo.org') return true
  } catch (_) {
    return false
  }
  return false
}
