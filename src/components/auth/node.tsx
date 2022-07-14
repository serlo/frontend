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

import { useInstanceData } from '@/contexts/instance-context'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
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

  const { strings } = useInstanceData()

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
            className="text-xl serlo-button-green block w-full py-2 mt-10"
            name={attributes.name}
            onClick={(e) => {
              void onSubmit(e, (attributes as { value: string }).value)
            }}
            value={attributes.value || ''}
            disabled={attributes.disabled || disabled}
          >
            {getNodeLabel(node)}
          </button>
        )

      default:
        // TODO: this possibly contains "required" and "pattern"
        return (
          <>
            <label className="block my-4">
              {hasOwnPropertyTs(strings.auth.fields, attributes.name)
                ? strings.auth.fields[attributes.name]
                : attributes.name}
              <br />
              <input
                className="text-xl serlo-input-font-reset serlo-button-light hover:bg-brand-150 focus:bg-brand-150 outline-none -ml-1 mt-1 text-brand hover:text-brand px-4 py-2 w-full"
                type={attributes.type}
                name={attributes.name}
                // TODO: TODO message missing but it may be obvious to the experts.
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
