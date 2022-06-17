import {
  getNodeLabel,
  isUiNodeAnchorAttributes,
  isUiNodeImageAttributes,
  isUiNodeInputAttributes,
  isUiNodeScriptAttributes,
  isUiNodeTextAttributes,
} from '@ory/integrations/ui'
import { UiNode } from '@ory/kratos-client'
import { FormEvent } from 'react'

import { triggerSentry } from '@/helper/trigger-sentry'

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export interface NodeProps {
  node: UiNode
  disabled: boolean
  value: unknown
  onChange: (value: unknown) => void
  onSubmit: (e: FormEvent | MouseEvent, method?: string) => Promise<void>
  // dispatchSubmit: FormDispatcher
}

export function Node(props: NodeProps) {
  const { node, onChange, onSubmit, value, disabled } = props
  const { attributes } = node

  if (isUiNodeImageAttributes(attributes)) {
    triggerSentry({
      message:
        'kratos: tried to render image node which is not implemented yet',
    })
    return null
  }

  if (isUiNodeScriptAttributes(attributes)) {
    triggerSentry({
      message:
        'kratos: tried to render script node which is not implemented yet',
    })
    return null
  }

  if (isUiNodeTextAttributes(attributes)) {
    triggerSentry({
      message: 'kratos: tried to render text node which is not implemented yet',
    })
    return null
  }

  if (isUiNodeAnchorAttributes(attributes)) {
    triggerSentry({
      message:
        'kratos: tried to render anchor node which is not implemented yet',
    })
    return null
  }

  if (isUiNodeInputAttributes(attributes)) {
    switch (attributes.type) {
      case 'hidden':
        return (
          <input
            type={attributes.type}
            name={attributes.name}
            value={attributes.value ?? 'true'}
          />
        )

      case 'checkbox':
        triggerSentry({
          message:
            'kratos: tried to render checkbox input node which is not implemented yet',
        })
        return null

      case 'button':
        triggerSentry({
          message:
            'kratos: tried to render button input node which is not implemented yet',
        })
        return null

      case 'submit':
        return (
          <button
            name={attributes.name}
            onClick={(e) => {
              void onSubmit(e, attributes.value)
            }}
            value={attributes.value || ''}
            disabled={attributes.disabled || disabled}
          >
            {getNodeLabel(node)}
          </button>
        )

      default:
        // TODO: this possibly contains "required" and "pattern"
        console.log(node.attributes)
        return (
          <>
            <label>
              {getNodeLabel(node)}
              <input
                type={attributes.type}
                name={attributes.name}
                // TODO:
                value={(value as any) ?? ''}
                disabled={disabled}
                onChange={(e) => {
                  void onChange(e.target.value)
                }}
              />
            </label>
          </>
        )
    }
  }

  return null
}
