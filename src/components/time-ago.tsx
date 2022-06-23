import { Instance } from '@serlo/api'
import { useState } from 'react'
import ReactTimeAgo, { TimeAgoProps as ReactTimeAgoProps } from 'timeago-react'
import * as timeago from 'timeago.js'

import { useInstanceData } from '@/contexts/instance-context'

interface TimeAgoProps extends Pick<ReactTimeAgoProps, 'datetime'> {
  className?: string
  dateAsTitle?: boolean
}

export function TimeAgo({ datetime, dateAsTitle, className }: TimeAgoProps) {
  const [languageLoaded, setLanguageLoaded] = useState(false)
  const { lang } = useInstanceData()

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

  if (!languageLoaded && lang !== Instance.En)
    return <>datetime.toLocaleString(lang)</>

  return (
    <ReactTimeAgo
      datetime={datetime}
      locale={lang}
      opts={{ minInterval: 60 }}
      className={className}
      title={dateAsTitle ? datetime.toLocaleString(lang) : undefined}
    />
  )
}

function getTimeAgoLang(lang: string) {
  // eslint-disable-next-line import/no-internal-modules
  if (lang == Instance.De) return import('timeago.js/lib/lang/de')
  // eslint-disable-next-line import/no-internal-modules
  if (lang == Instance.Es) return import('timeago.js/lib/lang/es')
  // eslint-disable-next-line import/no-internal-modules
  if (lang == Instance.Fr) return import('timeago.js/lib/lang/fr')
  // eslint-disable-next-line import/no-internal-modules
  if (lang == Instance.Hi) return import('timeago.js/lib/lang/hi_IN')
  // eslint-disable-next-line import/no-internal-modules
  if (lang == Instance.Ta) return import('timeago.js/lib/lang/ta')
}
