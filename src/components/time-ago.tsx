import { useState } from 'react'
import ReactTimeAgo, { TimeAgoProps as ReactTimeAgoProps } from 'timeago-react'
import * as timeago from 'timeago.js'

import { useInstanceData } from '@/contexts/instance-context'

interface TimeAgoProps
  extends Pick<ReactTimeAgoProps, 'datetime' | 'className'> {
  dateAsTitle?: boolean
}

export function TimeAgo({ datetime, dateAsTitle, className }: TimeAgoProps) {
  const [languageLoaded, setLanguageLoaded] = useState(false)
  const { lang } = useInstanceData()

  if (lang !== 'en') {
    const promise = getTimeAgoLang(lang)
    if (promise) {
      void promise.then((module) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        timeago.register(lang, module.default)
        setLanguageLoaded(true)
      })
    }
  }

  if (!languageLoaded && lang !== 'en')
    return <>datetime.toLocaleString(lang)</>

  return (
    <ReactTimeAgo
      datetime={datetime}
      locale={lang}
      opts={{ minInterval: 60 }}
      className={className}
      // TODO: Delete when https://github.com/hustcc/timeago-react/pull/37 got merged
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      title={dateAsTitle ? datetime.toLocaleString(lang) : undefined}
    />
  )
}

function getTimeAgoLang(lang: string) {
  // eslint-disable-next-line import/no-internal-modules
  if (lang == 'de') return import('timeago.js/lib/lang/de')
  // eslint-disable-next-line import/no-internal-modules
  if (lang == 'es') return import('timeago.js/lib/lang/es')
  // eslint-disable-next-line import/no-internal-modules
  if (lang == 'fr') return import('timeago.js/lib/lang/fr')
  // eslint-disable-next-line import/no-internal-modules
  if (lang == 'hi') return import('timeago.js/lib/lang/hi_IN')
  // eslint-disable-next-line import/no-internal-modules
  if (lang == 'ta') return import('timeago.js/lib/lang/ta')
}
