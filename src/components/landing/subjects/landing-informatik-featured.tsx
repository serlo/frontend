import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'

interface FeaturedContentData {
  title: string
  type: string
  url: string
  img: string
}

const featuredContent = [
  {
    title: 'Vektor- und Pixelgrafik',
    type: 'article',
    url: '/informatik/57636/vektor-und-pixelgrafik',
    img: 'https://assets.serlo.org/legacy/573afde7f3fc1_0b64541b7d14bafc97c9ab582b7d480d1b970b39.png',
  },
  {
    title: 'Beispiele: Wie verändert Big Data die Welt?',
    type: 'article',
    url: '/informatik/158556/beispiele-wie-verändert-big-data-die-welt',
    img: 'https://assets.serlo.org/5e6bba021ecc6_8a830acbe9cdd3341b5cc829bd14d6d0fde2ee02.jpg',
  },
  {
    title: 'Einführung in die Pixel- und Vektorgrafik',
    type: 'course',
    url: '/informatik/93484/pixelgrafik',
    img: 'https://assets.serlo.org/5a4f9574a8bba_0e16bbe25658c9d1ceb68425e781f7985817f0ca.png',
  },
  {
    title: 'Caesar-Verschlüsselung',
    type: 'article',
    url: '/informatik/48121/caesar-verschlüsselung',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Caesar3.svg',
  },
  {
    title: 'Welche Probleme entstehen durch Big Data?',
    type: 'article',
    url: '/informatik/158565/welche-probleme-entstehen-durch-big-data',
    img: 'https://assets.serlo.org/5e820b77172a8_57299a41c225cec8161139906a807e1d57dd2467.jpg',
  },
  {
    title: 'Hack The Web',
    type: 'folder',
    url: '/informatik/200247/hack-the-web',
    img: 'https://assets.serlo.org/60f583949b1a6_bf557cf5479ff23e170c34e8a2eef03d0d645bdc.gif',
  },
] as FeaturedContentData[]

export function LandingInformatikFeatured() {
  const { strings } = useInstanceData()

  return <>{renderFeaturedContent()}</>

  function renderFeaturedContent() {
    return (
      <div
        className={clsx(
          'flex items-stretch justify-around',
          'px-side pb-6 flex-wrap',
          'w-full mx-auto sm:max-w-3xl lg:max-w-max '
        )}
      >
        {featuredContent.map(renderFeaturedBox)}
      </div>
    )
  }

  function renderFeaturedBox(data: FeaturedContentData) {
    return (
      <Link
        className={clsx(
          'text-brand hover:no-underline box-border',
          'p-2.5 leading-cozy',
          'rounded hover:shadow-menu hover:text-truegray-700',
          'mb-4 mx-2 w-44 group transition-all text-left',
          'relative'
        )}
        href={data.url}
        key={data.title}
        path={[]}
      >
        <div className="mb-2.5 mr-5 bg-brand-100 group-hover:bg-white rounded-lg transition-all">
          <img
            className={clsx(
              'object-contain object-center',
              'mix-blend-multiply opacity-80 transition-all',
              'group-hover:opacity-100'
            )}
            style={{ aspectRatio: '1' }}
            alt={data.title}
            src={data.img}
          />
        </div>
        <h4 className="font-bold text-xl mx-0 mt-1 mb-10">{data.title}</h4>
        <span className="block mt-1 font-sm text-brand-lighter absolute bottom-2">
          {renderTypeIcon(data.type)} {getTranslatedType(strings, data.type)}
        </span>
      </Link>
    )
  }

  function renderTypeIcon(type: string) {
    const icon = getIconByTypename(type)
    return (
      <FontAwesomeIcon icon={icon} title={getTranslatedType(strings, type)} />
    )
  }
}
