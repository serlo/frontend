import { isTempFile } from '@editor/plugin'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

import { OverlayInput } from './overlay-input'
import type { ImageProps } from '..'

export function SettingsModalControls({ state }: Pick<ImageProps, 'state'>) {
  const { link, alt, src, maxWidth } = state
  const imageStrings = useEditorStrings().plugins.image

  const isTemp = isTempFile(src.value)
  const isFailed = isTempFile(src.value) && src.value.failed

  return (
    <>
      <OverlayInput
        label={imageStrings.imageUrl}
        autoFocus
        placeholder={
          !isTemp
            ? imageStrings.placeholderEmpty
            : isFailed
              ? imageStrings.placeholderFailed
              : imageStrings.placeholderUploading
        }
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        value={isTemp ? '' : src.value.toString()}
        disabled={isTemp && !isFailed}
        onChange={(e) => src.set(e.target.value)}
      />
      <label className="mx-auto mb-0 mt-5 flex flex-row justify-between">
        <span className="w-[20%]">{imageStrings.alt}</span>
        <textarea
          placeholder={imageStrings.altPlaceholder}
          value={alt.defined ? alt.value : ''}
          onChange={({ target }) => {
            const { value } = target
            if (alt.defined) {
              if (value) alt.set(value)
              else alt.remove()
            } else alt.create(value)
          }}
          className={cn(`
            serlo-input-font-reset
            mt-1.5 min-h-[100px] w-3/4 resize-none rounded-md
            border-2 border-editor-primary-100  bg-editor-primary-100 p-2.5 
            focus:border-editor-primary-300 focus:outline-none
          `)}
        />
      </label>
      <OverlayInput
        label={imageStrings.href}
        placeholder={imageStrings.hrefPlaceholder}
        type="text"
        value={link.defined ? link.href.value : ''}
        onChange={(e) => {
          const newHref = e.target.value
          if (link.defined) {
            if (newHref) link.href.set(newHref)
            else link.remove()
          } else link.create({ href: newHref })
        }}
      />
      <OverlayInput
        label={imageStrings.maxWidth}
        placeholder={imageStrings.maxWidthPlaceholder}
        type="number"
        value={maxWidth.defined ? maxWidth.value : ''}
        onChange={(event) => {
          const value = parseInt(event.target.value)
          if (maxWidth.defined) {
            maxWidth.set(value)
          } else {
            maxWidth.create(value)
          }
        }}
      />
    </>
  )
}
