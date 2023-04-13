import {
  UiNode,
  UiNodeInputAttributes,
  UiNodeInputAttributesTypeEnum,
} from '@ory/client'

export const loginUrl = '/auth/login'
export const registrationUrl = '/auth/registration'
export const verificationUrl = '/auth/verification'
export const settingsUrl = '/auth/settings'
export const logoutUrl = '/auth/logout'
export const recoveryUrl = 'auth/recovery'
export const VALIDATION_ERROR_TYPE = 'validation-error'

export const changeButtonTypeOfSSOProvider = (uiNode: UiNode) => {
  // Need to manually get rid of the submit type of the provider as it causes
  // two data consent checkboxes to be rendered. It also takes priority over
  // keyboard submits, once the enter key is pressed, the SSO button captures it
  // as long as it has type: 'submit'
  const attributes = uiNode.attributes as UiNodeInputAttributes
  if (attributes.name === 'provider') {
    return {
      ...uiNode,
      attributes: {
        ...uiNode.attributes,
        type: UiNodeInputAttributesTypeEnum.Button,
      },
    }
  }

  return uiNode
}

export function filterUnwantedRedirection({
  desiredPath,
  unwantedPaths,
  alternativePath = '/',
}: {
  desiredPath: string | null
  unwantedPaths: string[]
  alternativePath?: string
}) {
  if (
    !desiredPath ||
    desiredPath === sessionStorage.getItem('currentPathname') ||
    unwantedPaths.some(
      (unwantedPath) =>
        new URL(desiredPath).pathname === unwantedPath.replace(/^\/?/, '/')
    )
  ) {
    return alternativePath
  }
  return desiredPath
}
