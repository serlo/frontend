import { micromark } from 'micromark'

const legalRepo =
  'https://raw.githubusercontent.com/serlo/serlo.org-legal/main/'

export async function fetchAndConvertLegalMarkdown(
  isGerman: boolean,
  path: string
) {
  const response = await fetch(`${legalRepo}/${isGerman ? 'de' : 'en'}/${path}`)
  const markdown = await response.text()
  return micromark(markdown).replace(/&lt;br\/?&gt;/g, '<br/>')
}
