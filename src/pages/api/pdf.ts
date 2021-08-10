import chromium from 'chrome-aws-lambda'
import { NextApiRequest, NextApiResponse } from 'next'
import absoluteUrl from 'next-absolute-url'

// this runs on chrome-aws-lambda and does not work on normal machines
// run `yarn add -D puppeteer` to test locally,
// but since it uses a lot of space make sure to remove it before merging

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

export default async function createPdf(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { origin } = absoluteUrl(req)
  const id = parseInt(req.query.id?.toString())
  if (!checkId()) return

  const noSolutions = req.query.noSolutions !== undefined
  const urlString = `${origin}/${id}`
  const locale = urlString.startsWith('https://de.') ? 'de-DE' : 'en-GB'
  const date = new Date().toLocaleDateString(locale)
  const isLocalhost = origin === 'http://localhost:3000'

  try {
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
    await page.goto(
      urlString + '#print--preview' + (noSolutions ? '-no-solutions' : ''),
      isLocalhost
        ? { waitUntil: 'networkidle2' }
        : {
            waitUntil: 'networkidle0',
          }
    )
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
                            <span>${date}</span>
                            <span><span class="pageNumber"></span>/<span class="totalPages"></span></span>
                        </div>`,
    })
    await browser.close()
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Length', pdf.length)

    // 1 day maxage, take your time revalidating (1h), if there's an error 1 week old is also okay
    res.setHeader(
      'Cache-Control',
      'maxage=86400, stale-while-revalidate=3600, stale-if-error=604800'
    )
    res.status(200).send(pdf)
  } catch (error: unknown) {
    res.status(500).send({
      status: 'Failed',
      error,
    })
  }

  function checkId() {
    if (!Number.isInteger(id)) {
      res.status(500).send({
        status: 'Failed',
        error: 'invalid input',
      })
      return false
    }
    return true
  }
}
