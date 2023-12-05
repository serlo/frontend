import { useEffect, useState } from 'react'
import ReactTimeAgo, { TimeAgoProps as ReactTimeAgoProps } from 'timeago-react'
import * as timeago from 'timeago.js'

import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'

interface TimeAgoProps extends Pick<ReactTimeAgoProps, 'datetime'> {
  className?: string
  dateAsTitle?: boolean
}

export function TimeAgo({ datetime, dateAsTitle, className }: TimeAgoProps) {
  const [languageLoaded, setLanguageLoaded] = useState(false)
  const { lang } = useInstanceData()
  const localeString = datetime.toLocaleString(lang)

  useEffect(() => {
    if (lang !== Instance.En) {
      const promise = getTimeAgoLang(lang)
      if (promise) {
        void promise.then((module) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          timeago.register(lang, module.default)
          setLanguageLoaded(true)
        })
      }
    }
  }, [lang])

  if (!languageLoaded && lang !== Instance.En) return <>{localeString}</>

  return (
    <ReactTimeAgo
      datetime={datetime}
      locale={lang}
      opts={{ minInterval: 60 }}
      className={className}
      title={dateAsTitle ? localeString : undefined}
    />
  )
}

function getTimeAgoLang(lang: string) {
  // eslint-disable-next-line import/no-internal-modules
  if (lang === Instance.De) return import('timeago.js/lib/lang/de')
  // eslint-disable-next-line import/no-internal-modules
  if (lang === Instance.Es) return import('timeago.js/lib/lang/es')
  // eslint-disable-next-line import/no-internal-modules
  if (lang === Instance.Fr) return import('timeago.js/lib/lang/fr')
  // eslint-disable-next-line import/no-internal-modules
  if (lang === Instance.Hi) return import('timeago.js/lib/lang/hi_IN')
  // eslint-disable-next-line import/no-internal-modules
  if (lang === Instance.Ta) return import('timeago.js/lib/lang/ta')
}
