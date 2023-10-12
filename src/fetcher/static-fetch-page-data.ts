import { prettifyLinks } from './prettify-links'
import { staticRequestPage } from './static-request-page'
import { RequestPageData } from '@/data-types'
import { parseLanguageSubfolder } from '@/helper/feature-i18n'

export async function staticFetchPageData(
  raw_alias: string
): Promise<RequestPageData> {
  const { alias, instance } = parseLanguageSubfolder(raw_alias)

  const pageData = await staticRequestPage(alias, instance)
  await prettifyLinks(pageData)
  return pageData
}
