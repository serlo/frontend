import React from 'react'
import ReactTimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'

import { useInstanceData } from '@/contexts/instance-context'

interface TimeAgoProps {
  datetime: timeago.TDate
  opts?: timeago.Opts
  className?: string
  dateAsTitle?: boolean
}

export function TimeAgo({
  datetime,
  opts,
  className,
  dateAsTitle,
}: TimeAgoProps) {
  const [languageLoaded, setLanguageLoaded] = React.useState(false)
  const { lang } = useInstanceData()

  if (lang !== 'en') {
    void import(
      /* webpackInclude: /de\.js$|en\.js$|es\.js$|fr\.js$|hi\.js$|ta\.js$/ */
      `timeago.js/lib/lang/${lang}`
    ).then((module) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      timeago.register(lang, module.default)
      setLanguageLoaded(true)
    })
  }

  if (!languageLoaded && lang !== 'en')
    return <>datetime.toLocaleString(lang)</>

  return (
    <span title={dateAsTitle ? datetime.toLocaleString(lang) : undefined}>
      <ReactTimeAgo
        className={className}
        datetime={datetime}
        locale={lang}
        opts={opts || { minInterval: 60 }}
      />
    </span>
  )
}
