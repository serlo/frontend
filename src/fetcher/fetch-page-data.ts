import { PageData } from '@/data-types'

export async function fetchPageData(
  _raw_alias: string,
  _origin: string
): Promise<PageData> {
  await new Promise((res) => res())
  return { kind: 'error', errorData: { code: 200 } }
}
