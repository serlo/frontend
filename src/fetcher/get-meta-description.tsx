import {
  ProcessedResponse,
  ResponseDataQuickFix,
} from '@/fetcher/process-response'

export function getMetaDescription(processed: ProcessedResponse) {
  if (processed.contentType === 'TaxonomyTerm') return

  if (!processed.data) return

  const data = (processed.data as unknown) as ResponseDataQuickFix

  //could have custom description set, return directly
  if (
    processed.contentType === 'Article' ||
    processed.contentType === 'Applet'
  ) {
    if (data.metaDescription && data.metaDescription.length > 10) {
      return data.metaDescription
    }
  }

  if (data.value === undefined || data.value.children === undefined) return

  const slice = data.value.children.slice(0, 10)
  const stringified = JSON.stringify(slice)
  const regexp = /"text":"(.)*?"/g
  const matches = stringified.match(regexp)
  const longFallback = matches
    ? matches.map((str) => str.substring(8, str.length - 1)).join('')
    : ''
  if (longFallback.length < 50) return

  const softCutoff = 135
  const fallback =
    longFallback.substr(
      0,
      softCutoff + longFallback.substr(softCutoff).indexOf(' ')
    ) + ' …'
  const description = fallback
  return description
}
