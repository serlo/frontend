/* eslint-disable import/no-internal-modules */
import ReactTimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import de from 'timeago.js/lib/lang/de'
import es from 'timeago.js/lib/lang/es'
import fr from 'timeago.js/lib/lang/fr'
import hi from 'timeago.js/lib/lang/hi_IN'
import ta from 'timeago.js/lib/lang/ta'

import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/query'

//TODO: dynamically import only the current language data?

const languageFunctions = {
  de: de,
  es: es,
  fr: fr,
  hi: hi,
  ta: ta,
}

interface TimeAgoProps {
  datetime: timeago.TDate
  opts?: timeago.Opts
  className?: string
}

export function TimeAgo({ datetime, opts, className }: TimeAgoProps) {
  const { lang } = useInstanceData()

  // @ts-expect-error
  if (lang !== 'en') timeago.register(lang, languageFunctions[lang as Instance])

  return (
    <ReactTimeAgo
      className={className}
      datetime={datetime}
      locale={lang}
      opts={opts || { minInterval: 60 }}
    />
  )
}
