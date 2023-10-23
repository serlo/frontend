import { prettifyLinks } from './prettify-links'
import { requestPage } from './request-page'
import { RequestPageData } from '@/data-types'
import { parseLanguageSubfolder } from '@/helper/feature-i18n'

export async function fetchPageData(
  raw_alias: string
): Promise<RequestPageData> {
  const { alias, instance } = parseLanguageSubfolder(raw_alias)

  const pageData = await requestPage(alias, instance)
  await prettifyLinks(pageData)
  return pageData
}
