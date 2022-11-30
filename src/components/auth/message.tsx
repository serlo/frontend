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
  const { id: codeId, text, context } = uiText

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
    reason: hackyReasonTranslator(),
    verificationLinkText: (
      <Link
        className="text-brand serlo-link font-bold"
        href="/auth/verification"
      >
        {strings.auth.verificationLinkText}
      </Link>
    ),
    field: fieldName ?? '',
    break: <br />,
  })

  return <>{translatedMessage}</>

  // I did not find a clean way to translate those strings kratos provides
  function hackyReasonTranslator() {
    const reason =
      context && hasOwnPropertyTs(context, 'reason')
        ? (context.reason as string)
        : ''
    const searchString = reason + text
    if (searchString.includes('password length'))
      return strings.auth.passwordInvalid
    if (searchString.includes('does not match pattern'))
      return strings.auth.usernameInvalid

    // eslint-disable-next-line no-console
    console.log(text)
    triggerSentry({ message: 'kratos-untranslated-reason' })
    return '[unknown reason]'
  }
}
