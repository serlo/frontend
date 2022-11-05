import { faSpinner } from '@edtr-io/ui'
import { UiNode } from '@ory/client'
import { getNodeLabel, isUiNodeInputAttributes } from '@ory/integrations/ui'
import clsx from 'clsx'
import { FormEvent } from 'react'

import { FaIcon } from '../fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { triggerSentry } from '@/helper/trigger-sentry'

export interface NodeProps {
  node: UiNode
  disabled: boolean
  value: unknown
  onChange: (value: unknown) => void
  onSubmit: (e: FormEvent | MouseEvent, method?: string) => Promise<void>
  // dispatchSubmit: FormDispatcher
  isLoading?: boolean
}

export function Node(props: NodeProps) {
  const { node, onChange, onSubmit, value, disabled, isLoading } = props
  const { attributes } = node
  const { strings } = useInstanceData()

  if (isUiNodeInputAttributes(attributes)) {
    const shortName = attributes.name.replace('traits.', '')
    const fieldName = hasOwnPropertyTs(strings.auth.fields, shortName)
      ? (strings.auth.fields[shortName] as string)
      : shortName

    const messages = node.messages.map(({ text, id }, k) => {
      const hasTranslatedMessage = hasOwnPropertyTs(strings.auth.messages, id)
      const rawMessage = hasTranslatedMessage
        ? strings.auth.messages[id as keyof typeof strings.auth.messages]
        : text

      const message = replacePlaceholders(rawMessage, {
        // couldn't we find more elegant way to handle %reason% placeholder?
        reason: text.replace(
          'does not match pattern "^[\\\\w\\\\-]+$"',
          strings.auth.usernameRules
        ),
        field: fieldName,
      })

      return (
        <span
          key={`${id}-${k}`}
          className="text-red italic -mt-2 mb-2 block ml-3"
        >
          {message}
        </span>
      )
    })

    switch (attributes.type) {
      case 'hidden':
        return (
          <input
            type={attributes.type}
            name={attributes.name}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
            value={(attributes.value as string) || ''}
            disabled={attributes.disabled || disabled}
          >
            {isLoading ? (
              <FaIcon icon={faSpinner} className={clsx('animate-spin-slow')} />
            ) : (
              getNodeLabel(node)
            )}
          </button>
        )

      default:
        if (attributes.disabled || !attributes.required) return null
        // TODO: this possibly contains "required" and "pattern"
        //className={clsx(!attributes.required && 'opacity-50')} {attributes.required ? '*' : ' (optional)'}

        return (
          <div>
            <label
              className={clsx('block my-4', attributes.required && 'font-bold')}
            >
              {fieldName}
              <br />
              <input
                className="text-xl serlo-input-font-reset serlo-button-light hover:bg-brand-150 focus:bg-brand-150 outline-none -ml-1 mt-1 text-brand hover:text-brand px-4 py-2 w-full"
                type={attributes.type}
                name={attributes.name}
                value={(value as string) ?? ''}
                disabled={disabled}
                onChange={(e) => {
                  void onChange(e.target.value)
                }}
              />
            </label>
            {messages}
          </div>
        )
    }
  }

  // Anchor, Image, Script, Text
  triggerSentry({
    message: 'kratos: tried to render a node which is not an input node',
  })
  return null
}
