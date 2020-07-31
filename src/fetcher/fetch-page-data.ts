import { render } from 'external/legacy_render'
import { request } from 'graphql-request'

import { createBreadcrumbs } from './create-breadcrumbs'
import { createNavigation } from './create-navigation'
import { createTitle } from './create-title'
import { getMetaImage, getMetaDescription } from './get-meta-description'
import { dataQuery, QueryResponse } from './query'
import { endpoint } from '@/api/endpoint'
import { PageData, FrontendContentNode } from '@/data-types'
import { horizonData } from '@/data/horizon_de'
import { parseLanguageSubfolder, getLandingData } from '@/helper/feature-i18n'
import { convert } from '@/schema/convert-edtr-io-state'
import { convertLegacyState } from '@/schema/convert-legacy-state'

export async function fetchPageData(raw_alias: string): Promise<PageData> {
  const { alias, instance } = parseLanguageSubfolder(raw_alias)

  if (alias == '/') {
    return { kind: 'landing', landingData: getLandingData(instance) }
  }

  try {
    return await apiRequest(alias, instance)
  } catch (e) {
    const message = `Error while fetching data: ${(e as Error).message ?? e}`
    const code = message.includes("Cannot read property 'path' of null")
      ? 404
      : 500
    return { kind: 'error', errorData: { code, message } }
  }
}

async function apiRequest(alias: string, instance: string): Promise<PageData> {
  const QUERY = dataQuery(
    /^\/[\d]+$/.test(alias)
      ? 'id: ' + alias.substring(1)
      : `alias: { instance: ${instance}, path: "${alias}"}`
  )

  const { uuid } = await request<{ uuid: QueryResponse }>(endpoint, QUERY)

  const secondaryNavigationData = createNavigation(uuid)

  const breadcrumbsData = createBreadcrumbs(uuid)

  if (uuid.__typename === 'Page') {
    const content = convertState(uuid.currentRevision?.content)
    return {
      kind: 'single-entity',
      newsletterPopup: true,
      entityData: {
        id: uuid.id,
        title: uuid.currentRevision?.title ?? '',
        content,
      },
      metaData: {
        title: createTitle(uuid),
        contentType: 'page',
        metaImage: getMetaImage(alias),
        metaDescription: getMetaDescription(content),
      },
      horizonData: instance == 'de' ? buildHorizonData() : undefined,
      cacheKey: `/${instance}${alias}`,
      secondaryNavigationData,
      breadcrumbsData: secondaryNavigationData ? undefined : breadcrumbsData,
    }
  }

  return { kind: 'error', errorData: { code: 200 } }
}

function buildHorizonData() {
  const entries = Object.keys(horizonData)
  const selected = []

  while (selected.length < 3) {
    const index = parseInt(entries[Math.floor(Math.random() * entries.length)])
    if (Math.random() > horizonData[index].frequency) continue
    if (selected.indexOf(horizonData[index]) === -1)
      selected.push(horizonData[index])
  }
  return selected
}

function convertState(raw: string | undefined): FrontendContentNode[] {
  if (raw === undefined) return []

  if (raw?.startsWith('[')) {
    // legacy
    const legacyHTML = render(raw)
    return convertLegacyState(legacyHTML).children
  } else if (raw?.startsWith('{')) {
    // edtrio
    return convert(JSON.parse(raw))
  } else {
    // raw as text
    return [{ type: 'p', children: [{ type: 'text', text: raw ?? {} }] }]
  }
}
