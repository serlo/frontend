import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { tw } from '@/helper/tw'

export function SkipMenu() {
  const { strings } = useInstanceData()
  const skipStrings = strings.header.skipLinks

  return (
    <div
      className={tw`
        sr-only left-side top-side rounded-md bg-yellow
        focus-within:not-sr-only focus-within:absolute focus-within:p-side
      `}
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
