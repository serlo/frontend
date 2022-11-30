import { faSpinner } from '@edtr-io/ui'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import { UiNode } from '@ory/client'
import { isUiNodeInputAttributes } from '@ory/integrations/ui'
import clsx from 'clsx'
import { FormEvent, useState } from 'react'

import { FaIcon } from '../fa-icon'
import { Message, getKratosMessageString } from '@/components/auth/message'
import { useInstanceData } from '@/contexts/instance-context'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { triggerSentry } from '@/helper/trigger-sentry'

export interface NodeProps {
  node: UiNode
  disabled: boolean
  value: unknown
  onChange: (value: unknown) => void
  onSubmit: (e: FormEvent | MouseEvent, method?: string) => Promise<void>
  isLoading?: boolean
}

export function Node(props: NodeProps) {
  const { node, onChange, onSubmit, value, disabled, isLoading } = props
  const { attributes } = node
  const { strings } = useInstanceData()
  const [showPassword, setShowPassword] = useState(false)

  if (isUiNodeInputAttributes(attributes)) {
    const shortName = attributes.name.replace('traits.', '')
    const fieldName = hasOwnPropertyTs(strings.auth.fields, shortName)
      ? (strings.auth.fields[shortName] as string)
      : shortName

    const messages = node.messages.map((uiText) => {
      return (
        <span
          key={`${uiText.id}`}
          className="text-red italic -mt-2 mb-2 block ml-3"
        >
          <Message uiText={uiText} fieldName={fieldName} />
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
      case 'button':
        triggerSentry({
          message: `kratos: tried to render input node which is not supported atm: ${attributes.type}`,
        })
        return null

      case 'submit':
        // eslint-disable-next-line no-case-declarations
        const label =
          node.meta.label?.id &&
          getKratosMessageString(
            node.meta.label.id,
            strings.auth.messages,
            strings.auth.messages.code1010013
          )
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
              (label as string)
            )}
          </button>
        )

      default:
        if (attributes.disabled || !attributes.required) return null

        return (
          <div>
            <label
              className={clsx('block my-6', attributes.required && 'font-bold')}
            >
              <span className="flex justify-between content-end">
                {fieldName}
              </span>
              <input
                className="text-xl serlo-input-font-reset serlo-button-light hover:bg-brand-150 focus:bg-brand-150 outline-none -ml-1 mt-1 text-brand hover:text-brand px-4 py-2 w-full"
                type={showPassword ? 'text' : attributes.type}
                name={attributes.name}
                pattern={attributes.pattern}
                value={(value as string) ?? ''}
                disabled={disabled}
                onChange={(e) => {
                  void onChange(e.target.value)
                }}
              />
            </label>
            {attributes.type === 'password' ? renderShowHide() : null}
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

  function renderShowHide() {
    return (
      <div className="text-right mb-20">
        <button
          type="button" // keep this, otherwise enter does not submit form any more
          onClick={(e) => {
            e.preventDefault()
            setShowPassword(!showPassword)
          }}
          className="serlo-button-blue-transparent text-base py-0 mr-1.5 relative block -mt-24 ml-auto"
        >
          <FaIcon icon={showPassword ? faEyeSlash : faEye} />{' '}
          {showPassword ? 'hide' : 'show'}
        </button>
      </div>
    )
  }
}
