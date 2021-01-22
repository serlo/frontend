import { prettifyLinks } from './prettify-links'
import { Instance } from './query'
import { requestLicensePage } from './request-license-page'
import { requestPage } from './request-page'
import { PageData } from '@/data-types'
import { parseLanguageSubfolder } from '@/helper/feature-i18n'

export async function fetchPageData(raw_alias: string): Promise<PageData> {
  try {
    const { alias, instance } = parseLanguageSubfolder(raw_alias)
    if (alias.startsWith('/license/detail/')) {
      const id = parseInt(alias.split('license/detail/')[1])
      return await requestLicensePage(id, instance)
    }

    const pageData = await requestPage(alias, instance as Instance)
    await prettifyLinks(pageData)
    return pageData
  } catch (e) {
    const message = `Error while fetching data: ${(e as Error).message ?? e}`
    const code = message.includes('Code: 503') ? 503 : 500
    return { kind: 'error', errorData: { code, message } }
  }
}
