import {
  UiNode,
  UiNodeInputAttributes,
  UiNodeInputAttributesTypeEnum,
} from '@ory/client'

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

enum SortOrderInputFields {
  'csrf_token',
  'identifier',
  'traits.email',
  'traits.username',
  'password',
  'traits.motivation',
  'traits.submit',

  // Is this still in use?
  'traits.description',

  // Is this still in use?
  'traits.profile_image',

  // Is this still in use?
  'traits.language',
  'traits.interest',
  'traits.subscribedNewsletter',
  'method',
  // SSO provider button
  'provider',
}

export const sortKratosUiNodes = (nodeA: UiNode, nodeB: UiNode) => {
  const aAttributes = nodeA.attributes as UiNodeInputAttributes
  const bAttributes = nodeB.attributes as UiNodeInputAttributes

  const aIndex =
    SortOrderInputFields[aAttributes.name as keyof typeof SortOrderInputFields]
  const bIndex =
    SortOrderInputFields[bAttributes.name as keyof typeof SortOrderInputFields]

  if (aIndex === undefined || bIndex === undefined) {
    // eslint-disable-next-line no-console
    console.warn(
      `Unexpected name attribute '${
        aIndex === undefined ? aAttributes.name : bAttributes.name
      }' found`
    )
    return 0
  }

  return aIndex - bIndex
}
