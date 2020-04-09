import fetch from 'isomorphic-unfetch'
import { request } from 'graphql-request'
import { render } from '../../external/legacy_render'
import { metamenudata } from '../metamenudata'
import { horizonData } from '../horizondata'
import { convertLegacyState } from '../schema/convertLegacyState'
import { convertEdtrioState } from '../schema/convertEdtrioState'

const endpoint = 'https://api.serlo.org/graphql'

export async function fetchContentQL(alias) {
  const data: any = {}
  let contentType = 'unknown'

  let QUERY

  if (/\/[\d]+/.test(alias)) {
    // by id
    const id = alias.substring(1)
    QUERY = `
    {
      uuid(id:${id}) {
        __typename
        ... on Page {
          currentRevision {
            title
            content
          }
        }
        ... on Article {
          currentRevision {
            title
            content
          }
        }
      }
    }`
  } else {
    QUERY = `
    {
      uuid(alias:{instance:de,path:"${alias}"}) {
        __typename
        ... on Page {
          currentRevision {
            title
            content
          }
        }
        ... on Article {
          currentRevision {
            title
            content
          }
        }
      }
    }`
  }

  if (QUERY) {
    let reqData = await request(endpoint, QUERY)
    contentType = reqData.uuid.__typename
    let value = reqData.uuid.currentRevision.content
    data.title = reqData.uuid.currentRevision.title
    if (value.startsWith('[')) {
      // legacy
      data.legacy = await render(value)
    } else {
      data.edtrio = JSON.parse(value)
    }
  }

  return { alias, contentType, data }
}

export default async function fetchContent(alias) {
  // deeeeeep shit
  alias = alias.replace('ä', '%C3%A4')
  alias = alias.replace('ö', '%C3%B6')
  alias = alias.replace('ü', '%C3%BC')
  alias = alias.replace('ß', '%C3%9F')

  const res = await fetch('https://de.serlo.org' + alias + '?contentOnly', {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0'
    }
  })
  const html = await res.text()

  const ctype = /<meta name="content_type" content="([\w\- ]+)">/.exec(html)
  let contentType = ctype === null ? 'unknown' : ctype[1]

  if (html.includes('existiert nicht')) {
    contentType = 'Unbekannte Seite'
  } else if (html.includes('Cloudflare')) {
    contentType = 'Problem beim Zugriff'
  }

  const data: any = {}

  if (contentType === 'article') {
    const h1 = /<h1><span itemprop="name">([^<]+)<\/span><\/h1>/.exec(html)
    if (h1) {
      data.title = h1[1]
    }

    const edtrio = /data\-raw\-content='([\w\+\/\=]+)'/.exec(html)
    if (edtrio) {
      data.edtrio = JSON.parse(Buffer.from(edtrio[1], 'base64').toString())
    } else {
      // legacy format
      const articleStart = html.indexOf('<article>')
      const articleEnd = html.indexOf('</article>')
      const article = html.substring(articleStart + 9, articleEnd)
      const sectionTagEnd = article.indexOf('>')
      const firstSectionEnd = article.indexOf('</section>')
      const legacy = article
        .substring(sectionTagEnd + 1, firstSectionEnd)
        .trim()
      data.legacy = legacy
    }
    contentType = 'Article'
  }
  if (contentType === 'Page revision') {
    // static pages?
    const h1 = /<h1 itemprop="name">([^<]+)<\/h1>/.exec(html)
    if (h1) {
      data.title = h1[1]
    }

    const edtrio = /data\-raw\-content='([\w\+\/\=]+)'/.exec(html)
    if (edtrio) {
      data.edtrio = JSON.parse(Buffer.from(edtrio[1], 'base64').toString())
    } else {
      const startPattern = '<section itemprop="articleBody" class="editable">'
      const pageStart = html.indexOf(startPattern)
      const pageEnd = html.indexOf('</section>')
      const page = html
        .substring(pageStart + startPattern.length, pageEnd)
        .trim()
      data.legacy = page
    }
    contentType = 'Page'
  }
  if (contentType === 'topic' || contentType === 'subject') {
    const h1 = /<h1>([^<]+)<\/h1>/.exec(html)
    if (h1) {
      data.title = h1[1]
    }
    const anchors = []
    const re = /<a href="(\/[^"]+)">([^<]+)<\/a>/g
    let t
    let limit = 1000
    while ((t = re.exec(html)) && limit-- > 0) {
      anchors.push({ href: t[1], title: t[2].trim() })
    }
    data.anchors = anchors
  }
  if (contentType === 'topic-folder' || contentType === 'text-exercise') {
    // filter all edtrio tags
    const contents = []
    const re = /data\-raw\-content='([\w\+\/\=]+)'/g
    let t
    let limit = 1000
    while ((t = re.exec(html)) && limit-- > 0) {
      contents.push(Buffer.from(t[1], 'base64').toString())
    }
    data.legacyCount = (html.match(/<div class="r">/) || []).length
    data.contents = contents
  }

  const breadcrumbsStart = '<ol id="breadcrumbs">'
  const bcIndex = html.indexOf(breadcrumbsStart)
  let breadcrumbs = undefined
  if (bcIndex >= 0) {
    // read breadcrumbs
    const bcEnd = html.indexOf('</ol>', bcIndex)
    const bcs = html.substring(bcIndex + breadcrumbsStart.length, bcEnd)
    const re = /<li> <a href="([^"]+)"> <span>([^<]+)<\/span> <\/a> <\/li>/g
    const links = []
    let t
    let limit = 1000
    while ((t = re.exec(bcs)) && limit-- > 0) {
      links.push({ url: t[1], label: t[2] })
    }
    const myself = /<li>[\s]*<span>([^<]+)<\/span>[\s]*<\/li>/.exec(html)
    if (myself) {
      links.push({ url: '#', label: myself[1] })
    }
    breadcrumbs = links
  }

  // do some more post-processing here!!
  const isMeta =
    alias == '/serlo' || metamenudata.some(entry => alias == entry.url)
  const showBreadcrumbs =
    !isMeta &&
    breadcrumbs.length > 1 &&
    (contentType === 'Article' || contentType === 'Page')

  // horizon
  const horizonIndices = shuffle(Object.keys(horizonData))

  // convert
  if (data.legacy) {
    data.value = convertLegacyState(data.legacy)
    delete data.legacy
  } else if (data.edtrio) {
    data.value = convertEdtrioState(data.edtrio)
    delete data.edtrio
  }

  return {
    alias,
    contentType,
    data,
    isMeta,
    showBreadcrumbs,
    horizonIndices,
    breadcrumbs
  }
}

function shuffle(a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    const r = Math.random()
    j = Math.floor(r * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}
