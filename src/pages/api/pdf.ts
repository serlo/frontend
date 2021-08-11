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

    // https://github.com/puppeteer/puppeteer/issues/4410
    await page.setRequestInterception(true)
    page.on('request', (request) => {
      const headers = Object.assign({}, request.headers(), {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      })
      void request.continue({ headers })
    })

    const url =
      urlString + '#print--preview' + (noSolutions ? '-no-solutions' : '')

    try {
      await page.goto(url, {
        timeout: 30000,
        waitUntil: ['load', 'domcontentloaded', 'networkidle2'],
      })
    } catch (error) {
      res.status(500).send({
        status: 'Failed',
        error: 'navigation timeout',
      })
      return false
    }
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
    if (!pdf) {
      res.status(500).send({
        status: 'Failed',
        error: 'pdf creation failed',
      })
      return false
    }
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
      error: 'pdf creation failed',
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
