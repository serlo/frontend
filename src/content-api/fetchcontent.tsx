import fetch from 'isomorphic-unfetch'

export default async function fetchContent(alias) {
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
    contentType = 'Cloudflare verweigert Zugriff'
  }

  const data: any = {}

  if (contentType === 'article') {
    const h1 = /<h1><span itemprop="name">([^<]+)<\/span><\/h1>/.exec(html)
    if (h1) {
      data.title = h1[1]
    }

    const edtrio = /data\-raw\-content='([\w\+\/\=]+)'/.exec(html)
    if (edtrio) {
      data.edtrio = Buffer.from(edtrio[1], 'base64').toString()
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
  }
  if (contentType === 'Page revision') {
    // static pages?
    const h1 = /<h1 itemprop="name">([^<]+)<\/h1>/.exec(html)
    if (h1) {
      data.title = h1[1]
    }

    const edtrio = /data\-raw\-content='([\w\+\/\=]+)'/.exec(html)
    if (edtrio) {
      data.edtrio = Buffer.from(edtrio[1], 'base64').toString()
    } else {
      const startPattern = '<section itemprop="articleBody" class="editable">'
      const pageStart = html.indexOf(startPattern)
      const pageEnd = html.indexOf('</section>')
      const page = html
        .substring(pageStart + startPattern.length, pageEnd)
        .trim()
      data.legacy = page
    }
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
    console.log(data)
  }
  return { alias, contentType, data }
}
