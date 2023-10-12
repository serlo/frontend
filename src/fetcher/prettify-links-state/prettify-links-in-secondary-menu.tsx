import request from 'graphql-request'

import { idsQuery } from './ids-query'
import { IdsQueryReturn } from './prettify-links-in-state'
import { createSecondaryMenu } from '../create-secondary-menu'
import { endpoint } from '@/api/endpoint'
import { hasSpecialUrlChars } from '@/helper/urls/check-special-url-chars'

type DataType = ReturnType<typeof createSecondaryMenu>

export async function prettifyLinksInSecondaryMenu(
  data?: DataType
): Promise<DataType> {
  if (!data) return undefined

  const ids = data.filter(({ url, id }) => id && !url).map(({ id }) => id!)
  if (!ids.length) return data
  const prettyLinks = await request<IdsQueryReturn>(endpoint, idsQuery(ids))
  if (!prettyLinks) return data

  return data.map((entry) => {
    if (entry.url) return entry
    const prettyAlias = prettyLinks[`uuid${entry.id}`]?.alias ?? `/${entry.id}`
    if (hasSpecialUrlChars(prettyAlias)) return entry
    return { ...entry, url: prettyAlias }
  })
}
