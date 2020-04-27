import { request } from 'graphql-request'
import { dataQuery, idQuery } from './query'
import { processResponse } from './processResponse'

const endpoint = 'https://api.serlo.org/graphql'

export default async function fetchContent(alias: string, redirect) {
  try {
    if (redirect && /^\/[\d]+$/.test(alias)) {
      // redirect id to alias
      const response = await request(endpoint, idQuery(alias.substring(1)))
      const redirect = response.uuid.alias
      if (redirect) {
        return { redirect }
      }
    }
  } catch (e) {}

  try {
    const QUERY = dataQuery(
      /^\/[\d]+$/.test(alias)
        ? 'id: ' + alias.substring(1)
        : `alias: { instance: de, path: "${alias}"}`
    )
    const reqData = await request(endpoint, QUERY)
    // compat: redirect first page of course
    if (reqData.uuid.__typename === 'Course' && reqData.uuid.pages[0]?.alias) {
      return { redirect: reqData.uuid.pages[0].alias }
    }
    return { alias, ...processResponse(reqData) }
  } catch (e) {
    return { error: 'Error while fetching data: ' + (e.message ?? e) }
  }
}
