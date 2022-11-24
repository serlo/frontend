import clsx from 'clsx'

import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

export function SkipMenu() {
  const { strings } = useInstanceData()
  const skipStrings = strings.header.skipLinks

  return (
    <div
      className={clsx(
        'sr-only focus-within:not-sr-only focus-within:absolute',
        'left-side top-side bg-yellow rounded-md focus-within:p-side'
      )}
    >
      {replacePlaceholders(skipStrings.sentence, {
        content: (
          <a className="serlo-link" href="#content">
            {skipStrings.content}
          </a>
        ),
        footer: (
          <a className="serlo-link" href="#footer">
            {skipStrings.footer}
          </a>
        ),
      })}
    </div>
  )
}
