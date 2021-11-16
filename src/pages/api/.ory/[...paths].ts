import { config } from '@ory/integrations/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { Buffer } from 'buffer'
import { IncomingHttpHeaders } from 'http'
import parse from 'set-cookie-parser'
import { CookieSerializeOptions, serialize } from 'cookie'
import { CreateApiHandlerOptions } from '@ory/integrations/src/nextjs'
import request from 'request'
import { isText } from 'istextorbinary'

export { config }

// TODO: this should probably be handled in CF Worker instead since it changes independent of Frontend.
// TODO: is it okay to use that for open source version? Could also just fork it
export default createApiHandler({
  // TODO: read from env
  apiBaseUrlOverride: 'https://kratos.serlo-staging.dev',
  // TODO: read from env
  forceCookieSecure: false,
  forceCookieDomain: 'serlo-staging.dev',
})

const encode = (v: string) => v

export function createApiHandler(options: CreateApiHandlerOptions) {
  let baseUrl = options.fallbackToPlayground
    ? 'https://playground.projects.oryapis.com/'
    : ''
  if (process.env.ORY_SDK_URL) {
    baseUrl = process.env.ORY_SDK_URL
  }

  if (options.apiBaseUrlOverride) {
    baseUrl = options.apiBaseUrlOverride
  }

  baseUrl = baseUrl.replace(/\/$/, '')

  return (req: NextApiRequest, res: NextApiResponse<string>) => {
    console.log('hey ho')
    const { paths, ...query } = req.query
    const search = new URLSearchParams()
    Object.keys(query).forEach((key) => {
      search.set(key, String(query[key]))
    })

    const path = Array.isArray(paths) ? paths.join('/') : paths
    const url = `${baseUrl}/${path}?${search.toString()}`

    if (path === 'ui/welcome') {
      // A special for redirecting to the home page
      // if we were being redirected to the hosted UI
      // welcome page.
      res.redirect(303, '../../../')
      return
    }

    const isTls =
      (req as unknown as { protocol: string }).protocol === 'https:' ||
      (req as unknown as { secure: boolean }).secure ||
      req.headers['x-forwarded-proto'] === 'https'

    let buf = Buffer.alloc(0)
    let code = 0
    let headers: IncomingHttpHeaders
    return new Promise<void>((resolve) => {
      req
        .pipe(
          request(url, {
            followAllRedirects: false,
            followRedirect: false,
            gzip: true,
            json: false,
          })
        )
        .on('response', (res) => {
          if (res.headers.location) {
            if (res.headers.location.indexOf(baseUrl) === 0) {
              res.headers.location = res.headers.location.replace(
                baseUrl,
                '/api/.ory'
              )
            } else if (
              res.headers.location.indexOf('/api/kratos/public/') === 0
            ) {
              res.headers.location = '/api/.ory' + res.headers.location
            }
          }

          const secure =
            options.forceCookieSecure === undefined
              ? isTls
              : options.forceCookieSecure
          res.headers['set-cookie'] = parse(res)
            .map((cookie) => ({
              ...cookie,
              domain: options.forceCookieDomain,
              secure,
              encode,
            }))
            .map(({ value, name, ...options }) => {
              console.log(value, name, options)
              return serialize(name, value, options as CookieSerializeOptions)
            })

          headers = res.headers
          code = res.statusCode
        })
        .on('data', (chunk: Buffer) => {
          buf = Buffer.concat([buf, chunk], buf.length + chunk.length)
        })
        .on('end', () => {
          delete headers['transfer-encoding']
          delete headers['content-encoding']
          delete headers['content-length']

          Object.keys(headers).forEach((key) => {
            res.setHeader(key, headers[key])
          })

          res.status(code)
          if (buf.length > 0) {
            if (isText(null, buf)) {
              res.send(
                buf
                  .toString('utf-8')
                  .replace(new RegExp(baseUrl, 'g'), '/api/.ory')
              )
            } else {
              res.write(buf)
            }
          }

          res.end()
          resolve()
        })
    })
  }
}
