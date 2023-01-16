import { FrontendContentNode } from '@/frontend-node-types'
import { serloDomain } from '@/helper/urls/serlo-domain'

const rootsWithImage = [
  'biologie',
  'chemie',
  'informatik',
  'lerntipps',
  'mathe',
  'nachhaltigkeit',
  'mitmachen',
  'community', // remove when renaming is done
]

const metaAliases = [
  '/serlo',
  '/21423/pädagogisches-konzept',
  '/features',
  '/team',
  '/jobs',
  '/partner',
  '/wirkung',
  '/transparenz',
  '/geschichte',
  '/21657/kontakt-und-standorte',
]

export function getMetaImage(alias: string) {
  const root = alias.split('/')[1]
  const imageFileName = rootsWithImage.includes(root)
    ? root
    : metaAliases.includes(alias)
    ? 'meta'
    : alias.length <= 1
    ? 'landing'
    : 'serlo' // fallback, i18n in the future
  return `https://de.${serloDomain}/_assets/img/meta/${imageFileName}.png`
}

export function getMetaDescription(content: FrontendContentNode[]): string {
  const slice = content.slice(0, 10)
  const stringified = JSON.stringify(slice)
  const regexp = /"text":"(.)*?"/g
  const matches = stringified.match(regexp)
  const longFallback = matches
    ? matches.map((str) => str.substring(8, str.length - 1)).join('')
    : ''
  if (longFallback.length < 50) return ''

  const softCutoff = 135
  const fallback =
    longFallback.substring(
      0,
      softCutoff + longFallback.substring(softCutoff).indexOf(' ')
    ) + ' …'
  const description = fallback
  return description
}
