import { UiText } from '@ory/client'

import { verificationUrl } from '../pages/auth/utils'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
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

  if ((translatedMessage ?? text).includes('%reason%')) {
    return (
      <>
        {replacePlaceholders(translatedMessage ?? text, {
          reason: hackyReasonTranslator(),
        })}
      </>
    )
  }

  return (
    <>
      {replacePlaceholders(translatedMessage ?? text, {
        verificationLinkText: (
          <Link
            className="serlo-link font-bold text-brand"
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
    const typedContext = context as Record<string, unknown>
    const reason =
      context && Object.hasOwn(typedContext, 'reason')
        ? (typedContext.reason as string)
        : ''
    const searchString = reason + text
    if (searchString.includes('password length'))
      return strings.auth.passwordTooShort
    if (searchString.includes('passwords are limited to a maximum length'))
      return strings.auth.passwordTooLong
    if (searchString.includes('does not match pattern'))
      return strings.auth.usernameInvalid
    if (searchString.includes('is not valid') && searchString.includes('email'))
      return strings.auth.emailInvalid
    if (
      searchString.includes(
        'the password is too similar to the user identifier'
      )
    )
      return strings.auth.passwordTooSimilar
    if (searchString.includes('A valid session was detected'))
      return strings.auth.login.validSessionDetected
    if (searchString.includes('length must be'))
      return strings.auth.usernameTooLong

    // eslint-disable-next-line no-console
    console.log(searchString)
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
  const translatedMessage = Object.hasOwn(messages, codeKey)
    ? messages[codeKey]
    : undefined

  if (!translatedMessage) {
    // eslint-disable-next-line no-console
    console.log({ codeId })
    triggerSentry({
      message: 'kratos-untranslated-message',
      code: codeId,
    })
  }

  return translatedMessage ?? fallback
}
