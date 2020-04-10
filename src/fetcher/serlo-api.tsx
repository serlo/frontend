import { request } from 'graphql-request'
import { render } from '../../external/legacy_render'
import { metamenudata } from '../data/metamenudata'
import { horizonData } from '../data/horizondata'
import { convertLegacyState } from '../schema/convertLegacyState'
import { convertEdtrioState } from '../schema/convertEdtrioState'

const endpoint = 'https://api.serlo.org/graphql'

const query = props => `
  {
    uuid(${props.selector}) {
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
        taxonomyTerms {
          path {
            name
            alias
          }
        }
      }
    }
  }
`

export default async function fetchContent(alias) {
  let QUERY

  if (/\/[\d]+/.test(alias)) {
    QUERY = query({ selector: 'id: ' + alias.substring(1) })
  } else {
    QUERY = query({ selector: `alias: { instance: de, path: "${alias}"}` })
  }

  try {
    const reqData: any = await request(endpoint, QUERY)
    const data: any = {}
    let contentType = 'unknown'
    let title = 'Serlo'

    contentType = reqData.uuid.__typename
    let value = reqData.uuid.currentRevision.content
    data.title = reqData.uuid.currentRevision.title
    if (data.title) title = data.title + ' - lernen mit Serlo!'
    if (value.startsWith('[')) {
      // legacy
      data.legacy = await render(value)
    } else {
      data.edtrio = JSON.parse(value)
    }
    if (data.legacy) {
      data.value = convertLegacyState(data.legacy)
      delete data.legacy
    } else if (data.edtrio) {
      data.value = convertEdtrioState(data.edtrio)
      delete data.edtrio
    }

    let breadcrumbs = []
    if (reqData.uuid.taxonomyTerms) {
      reqData.uuid.taxonomyTerms.forEach(({ path }) => {
        if (breadcrumbs.length === 0 || breadcrumbs.length > path.length) {
          breadcrumbs = path
        }
      })
      breadcrumbs = breadcrumbs.filter(entry => entry.alias)
      // compat: why is this entry saved as 'Mathe'?
      breadcrumbs = breadcrumbs.map(({ name, alias }) => ({
        url: alias,
        label: name == 'Mathe' ? 'Mathematik' : name
      }))
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

    return {
      alias,
      contentType,
      data,
      isMeta,
      showBreadcrumbs,
      horizonIndices,
      breadcrumbs,
      title
    }
  } catch (e) {
    return { error: 'Error file fetching data.' }
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
