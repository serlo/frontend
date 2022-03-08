import { prettifyLinks } from './prettify-links'
import { Instance } from './query-types'
import { requestPage } from './request-page'
import { SlugPageData } from '@/data-types'
import { parseLanguageSubfolder } from '@/helper/feature-i18n'

export async function fetchPageData(raw_alias: string): Promise<SlugPageData> {
  const { alias, instance } = parseLanguageSubfolder(raw_alias)

  const pageData = await requestPage(alias, instance as Instance)
  await prettifyLinks(pageData)
  return pageData
}
