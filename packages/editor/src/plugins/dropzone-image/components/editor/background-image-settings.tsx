import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { OverlayInput } from '@editor/editor-ui/overlay-input'
import type { ImageProps } from '@editor/plugins/image'
import { LicenseDropdown } from '@editor/plugins/image/components/licence-dropdown'
import { runChangeDocumentSaga, useAppDispatch } from '@editor/store'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useState } from 'react'

import { FaIcon } from '@/components/fa-icon'

interface BackgroundImageSettingsProps {
  id: string | null
  state?: ImageProps['state']
}

export function BackgroundImageSettings(props: BackgroundImageSettingsProps) {
  const { id, state } = props
  const imageStrings = useEditorStrings().plugins.image

  const [formState, setFormState] = useState<Partial<ImageProps['state']>>(
    state ? { ...state } : {}
  )
  const { alt, src, imageSource, licence } = formState

  const dispatch = useAppDispatch()

  function handleChange(
    prop: 'src' | 'alt' | 'imageSource' | 'licence',
    value: string
  ) {
    if (!id) return

    const newState = { ...formState, [prop]: value }

    setFormState(newState)

    dispatch(runChangeDocumentSaga({ id, state: { initial: () => newState } }))
  }

  const srcValue = src?.toString() ?? ''

  return (
    <>
      <OverlayInput
        label={imageStrings.imageUrl}
        autoFocus
        placeholder={imageStrings.placeholderEmpty}
        value={srcValue}
        onChange={(e) => handleChange('src', e.target.value)}
      />
      <OverlayInput
        label={imageStrings.imageSource}
        placeholder={imageStrings.placeholderSource}
        value={imageSource?.toString() ?? ''}
        onChange={(e) => handleChange('imageSource', e.target.value)}
        tooltip={
          <span className="serlo-tooltip-trigger w-1/4">
            <FaIcon className="ml-2" icon={faQuestionCircle} />
            <EditorTooltip text={imageStrings.imageSourceHelpText} />
          </span>
        }
      />
      <LicenseDropdown
        currentLicence={licence?.defined ? licence?.value : undefined}
        onLicenseChange={(license: string) => handleChange('licence', license)}
        src={srcValue}
      />
      <label className="mx-auto mb-0 mt-5 flex flex-row justify-between">
        <span className="w-[20%]">{imageStrings.alt}</span>
        <textarea
          placeholder={imageStrings.altPlaceholder}
          value={alt?.toString() ?? ''}
          onChange={(e) => handleChange('alt', e.target.value)}
          className={cn(`
            serlo-input-font-reset
            mt-1.5 min-h-[100px] w-3/4 resize-none rounded-md
            border-2 border-editor-primary-100  bg-editor-primary-100 p-2.5 
            focus:border-editor-primary-300 focus:outline-none
          `)}
        />
      </label>
    </>
  )
}
