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
