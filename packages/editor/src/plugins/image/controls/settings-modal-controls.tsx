import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { OverlayInput } from '@editor/editor-ui/overlay-input'
import { isTempFile } from '@editor/plugin'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

import type { ImageProps } from '..'
import { LicenseDropdown } from '../components/licence-dropdown'
import { FaIcon } from '@/components/fa-icon'

export function SettingsModalControls({ state }: Pick<ImageProps, 'state'>) {
  const { link, alt, src, imageSource, maxWidth, licence } = state
  const imageStrings = useEditorStrings().plugins.image

  const isTemp = isTempFile(src.value)
  const isFailed = isTempFile(src.value) && src.value.failed

  const updateOrCreateLicence = (newLicence: string) => {
    if (!licence?.defined) licence.create(newLicence)
    else licence.set(newLicence)
  }
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
        disabled
        onChange={(e) => {
          src.set(e.target.value)
        }}
      />
      <OverlayInput
        label={imageStrings.imageSource}
        autoFocus
        placeholder={imageStrings.placeholderSource}
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        value={imageSource.defined ? imageSource.value.toString() : ''}
        onChange={(e) => {
          if (!imageSource?.defined) imageSource.create(e.target.value)
          else imageSource.set(e.target.value)
        }}
        tooltip={
          <span className="serlo-tooltip-trigger w-1/4">
            <FaIcon className="ml-2" icon={faQuestionCircle} />
            <EditorTooltip text={imageStrings.imageSourceHelpText} />
          </span>
        }
      />
      <LicenseDropdown
        currentLicence={licence.defined ? licence?.value : undefined}
        onLicenseChange={updateOrCreateLicence}
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        src={src.get().toString()}
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
    </>
  )
}
