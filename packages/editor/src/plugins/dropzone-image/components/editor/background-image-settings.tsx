import type { ImageProps } from '@editor/plugins/image'
import { OverlayInput } from '@editor/plugins/image/controls/overlay-input' // TODO: Extract as editor-ui component
import { runChangeDocumentSaga, useAppDispatch } from '@editor/store'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useState } from 'react'

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
  const { alt, src, maxWidth } = formState

  const dispatch = useAppDispatch()

  function handleChange(
    prop: 'src' | 'alt' | 'maxWidth',
    value: string | { value: string }
  ) {
    const newState = {
      ...formState,
      [prop]: typeof value === 'string' ? value : { ...value, defined: true },
    }

    setFormState(newState)

    if (!id) return

    dispatch(runChangeDocumentSaga({ id, state: { initial: () => newState } }))
  }

  return (
    <>
      <OverlayInput
        label={imageStrings.imageUrl}
        autoFocus
        placeholder={imageStrings.placeholderEmpty}
        value={src?.toString()}
        onChange={(event) => handleChange('src', event.target.value)}
      />
      <label className="mx-auto mb-0 mt-5 flex flex-row justify-between">
        <span className="w-[20%]">{imageStrings.alt}</span>
        <textarea
          placeholder={imageStrings.altPlaceholder}
          value={alt?.defined ? alt.value : ''}
          onChange={(event) =>
            handleChange('alt', { value: event.target.value })
          }
          className={cn(`
            serlo-input-font-reset
            mt-1.5 min-h-[100px] w-3/4 resize-none rounded-md
            border-2 border-editor-primary-100  bg-editor-primary-100 p-2.5 
            focus:border-editor-primary-300 focus:outline-none
          `)}
        />
      </label>
      <OverlayInput
        label={imageStrings.maxWidth}
        placeholder={imageStrings.maxWidthPlaceholder}
        type="number"
        value={maxWidth?.defined ? maxWidth.value : ''}
        onChange={(event) =>
          handleChange('maxWidth', { value: event.target.value })
        }
      />
    </>
  )
}
