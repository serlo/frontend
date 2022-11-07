import { UiText } from '@ory/client'

import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { triggerSentry } from '@/helper/trigger-sentry'

export function Message({
  uiText,
  fieldName,
}: {
  uiText: UiText
  fieldName?: string
}) {
  const { strings } = useInstanceData()
  const { id: codeId, text } = uiText

  const hasTranslatedMessage = hasOwnPropertyTs(strings.auth.messages, codeId)
  const rawMessage = hasTranslatedMessage
    ? strings.auth.messages[codeId as keyof typeof strings.auth.messages]
    : text

  if (!hasTranslatedMessage) {
    triggerSentry({
      message: 'kratos-untranslated-message',
      code: codeId,
    })
  }

  const translatedMessage = replacePlaceholders(rawMessage, {
    reason: text.replace(
      'does not match pattern "^[\\\\w\\\\-]+$"',
      strings.auth.usernameRules
    ),
    verificationLinkText: (
      <Link
        className="text-brand serlo-link font-bold"
        href="/auth/verification"
      >
        {strings.auth.verificationLinkText}
      </Link>
    ),
    field: fieldName ?? '',
  })

  return <>{translatedMessage}</>
  // TODO: check context
}
