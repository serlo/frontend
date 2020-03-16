import fetch from 'isomorphic-unfetch'

const hideAll =
  '?hideTopbar&hideLeftSidebar&hideRightSidebar&hideBreadcrumbs&hideDiscussions&hideBanner&hideHorizon&hideFooter&fullWidth'

export default async function fetchContent(alias) {
  const res = await fetch('https://de.serlo.org' + alias + hideAll)
  const html = await res.text()

  const ctype = /<meta name="content_type" content="([\w\- ]+)">/.exec(html)
  const contentType = ctype === null ? 'unknown' : ctype[1]

  if (contentType === 'unknown') {
    console.log(html)
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

  return { alias, contentType, data }
}
