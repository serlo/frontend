import { prettifyLinks } from './prettify-links'
import { Instance } from './query-types'
import { requestPage } from './request-page'
import { RequestPageData } from '@/data-types'
import { parseLanguageSubfolder } from '@/helper/feature-i18n'

// NOTE: This function is not in use anymore and is only kept for debugging and testing
export async function fetchPageData(
  raw_alias: string
): Promise<RequestPageData> {
  const { alias, instance } = parseLanguageSubfolder(raw_alias)

  const pageData = await requestPage(alias, instance as Instance)
  await prettifyLinks(pageData)
  return pageData
}
