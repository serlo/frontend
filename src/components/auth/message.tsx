import { UiText } from '@ory/client'

import { verificationUrl } from '../pages/auth/utils'
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

  const translatedMessage = getKratosMessageString(
    codeId,
    strings.auth.messages,
    text
  )

  return (
    <>
      {replacePlaceholders(translatedMessage ?? text, {
        reason: hackyReasonTranslator(),
        verificationLinkText: (
          <Link
            className="text-brand serlo-link font-bold"
            href={verificationUrl}
          >
            {strings.auth.verificationLinkText}
          </Link>
        ),
        field: fieldName ?? '',
        break: <br />,
      })}
    </>
  )

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

export function getKratosMessageString(
  codeId: number,
  messages: Record<string, string>,
  fallback: string
): string | undefined {
  const codeKey = `code${codeId}`
  const translatedMessage = hasOwnPropertyTs(messages, codeKey)
    ? messages[codeKey]
    : undefined

  if (!translatedMessage) {
    triggerSentry({
      message: 'kratos-untranslated-message',
      code: codeId,
    })
  }

  return translatedMessage ?? fallback
}
