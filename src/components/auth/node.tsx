import { faSpinner, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import type { UiNode, UiNodeInputAttributes } from '@ory/client'
import { isUiNodeInputAttributes } from '@ory/integrations/ui'
import clsx from 'clsx'
import { type FormEvent, useState } from 'react'

import { FlowType } from './flow-type'
import { FaIcon } from '../fa-icon'
import { Message, getKratosMessageString } from '@/components/auth/message'
import { useInstanceData } from '@/contexts/instance-context'
import { triggerSentry } from '@/helper/trigger-sentry'

export interface NodeProps {
  node: UiNode
  disabled: boolean
  value: unknown
  onChange: (value: unknown) => void
  onSubmit: (e: FormEvent | MouseEvent, method?: string) => Promise<void>
  isLoading?: boolean
  flowType: FlowType
}

export function Node({
  node,
  flowType,
  onChange,
  onSubmit,
  value,
  disabled,
  isLoading,
}: NodeProps) {
  const { attributes } = node
  const { strings } = useInstanceData()
  const [showPassword, setShowPassword] = useState(false)

  if (isUiNodeInputAttributes(attributes)) {
    const shortName = attributes.name.replace(
      'traits.',
      ''
    ) as keyof typeof strings.auth.fields
    const fieldName = Object.hasOwn(strings.auth.fields, shortName)
      ? strings.auth.fields[shortName]
      : shortName

    const messages = node.messages.map((uiText) => {
      return (
        <span
          key={`${uiText.id}`}
          className="-mt-2 mb-2 ml-3 block hyphens-manual italic text-red-500"
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

      case 'checkbox': {
        triggerSentry({
          message: `kratos: tried to render input node which is not supported atm: ${attributes.type}`,
        })
        return null
      }
      // provider - NBP button
      case 'button': {
        const label = node.meta.label?.id
          ? getKratosMessageString(
              node.meta.label.id,
              strings.auth.messages,
              node.meta.label?.text ?? strings.auth.messages.code1010002
            )
          : undefined
        return (
          <div className="mt-10">
            <hr />
            <button
              className="serlo-button-blue mt-10 block w-full py-2 text-xl"
              name={attributes.name}
              onClick={(e) => {
                void onSubmit(e, (attributes as { value: string }).value)
              }}
              value={(attributes.value as string) || ''}
              disabled={attributes.disabled || disabled}
            >
              {label}
            </button>
          </div>
        )
      }

      case 'submit': {
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
            className="serlo-button-green mt-10 block w-full py-2 text-xl"
            name={attributes.name}
            onClick={(e) => {
              void onSubmit(e, (attributes as { value: string }).value)
            }}
            value={(attributes.value as string) || ''}
            disabled={attributes.disabled || disabled}
          >
            {isLoading ? (
              <FaIcon icon={faSpinner} className="animate-spin-slow" />
            ) : (
              (label as string)
            )}
          </button>
        )
      }

      default:
        if (attributes.disabled || !attributes.required) return null

        return (
          <div>
            <label
              className={clsx('my-6 block', attributes.required && 'font-bold')}
            >
              <span className="flex content-end justify-between">
                {fieldName}
              </span>
              {renderInput(attributes)}
            </label>
            {attributes.type === 'password' ? (
              <>
                {renderShowHide()}
                {renderPasswordRequirements()}
              </>
            ) : null}
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

  function renderInput(attributes: UiNodeInputAttributes) {
    const basicFields = {
      className:
        'text-xl serlo-input-font-reset serlo-button-light hover:bg-brand-200 focus:bg-brand-200 focus:outline-none -ml-1 mt-1 text-brand hover:text-brand px-4 py-2 w-full border-2 border-transparent focus:border-brand border-solid',
      name: attributes.name,
      onChange: (e: { target: { value: string } }) => {
        void onChange(e.target.value)
      },
    }

    if (attributes.name === 'traits.interest') {
      const optionClass = 'text-brand font-serlo bg-white p-1'
      return (
        <div className="border-solid after:pointer-events-none after:absolute after:-ml-9 after:mt-2.5 after:text-2xl after:text-brand after:content-['▾']">
          <select
            {...{
              ...basicFields,
              className:
                basicFields.className +
                ` [&:invalid]:text-brand-400 appearance-none`,
            }}
            required
            defaultValue=""
          >
            <option value="" disabled className={clsx('hidden', optionClass)}>
              - {strings.auth.interests.pleaseChoose} -
            </option>
            <option value="parent" className={optionClass}>
              {strings.auth.interests.parent}
            </option>
            <option value="teacher" className={optionClass}>
              {strings.auth.interests.teacher}
            </option>
            <option value="pupil" className={optionClass}>
              {strings.auth.interests.pupil}
            </option>
            <option value="student" className={optionClass}>
              {strings.auth.interests.student}
            </option>
            <option value="other" className={optionClass}>
              {strings.auth.interests.other}
            </option>
          </select>
        </div>
      )
    }

    return (
      <input
        {...basicFields}
        type={showPassword ? 'text' : attributes.type}
        pattern={attributes.pattern}
        value={(value as string) ?? ''}
        disabled={disabled}
      />
    )
  }

  function renderShowHide() {
    return (
      <div className="mb-20 text-right">
        <button
          type="button" // keep this, otherwise enter does not submit form any more
          onClick={(e) => {
            e.preventDefault()
            setShowPassword(!showPassword)
          }}
          className="serlo-button-blue-transparent relative -mt-24 ml-auto mr-1.5 block py-0 text-base"
        >
          <FaIcon icon={showPassword ? faEyeSlash : faEye} />{' '}
          {showPassword ? 'hide' : 'show'}
        </button>
      </div>
    )
  }

  function renderPasswordRequirements() {
    if (flowType !== FlowType.registration && flowType !== FlowType.settings)
      return null
    return (
      <p className="-mt-6 mb-4 ml-3 text-gray-500">
        {strings.auth.register.passwordRequirements}
      </p>
    )
  }
}
