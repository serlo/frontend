import { EditorModal } from '@editor/editor-ui/editor-modal'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { SwitchButton } from '@editor/editor-ui/switch-button'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { cn } from '@editor/utils/cn'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'

import { type InteractiveVideoProps } from '..'

export function OverlayContentModal({
  mark,
  onClose,
}: {
  mark: InteractiveVideoProps['state']['marks'][number]
  onClose: () => void
}) {
  const { title, autoOpen, mandatory, forceRewatch, child } = mark
  const pluginStrings = useEditStrings().plugins.interactiveVideo

  const titleRef = useRef<HTMLInputElement>(null)

  return (
    <EditorModal
      isOpen
      setIsOpen={onClose}
      className="bottom-24 top-side h-auto w-full max-w-4xl translate-y-0 overflow-x-auto"
      title={pluginStrings.editOverlayTitle}
      extraTitleClassName="text-sm font-bold !border-0 mb-1 -mt-2"
      extraCloseButtonClassName="sr-only"
    >
      <button
        className="serlo-button-editor-primary absolute right-side top-8"
        onClick={onClose}
      >
        {pluginStrings.saveButton} <FaIcon icon={faCheck} />
      </button>
      <input
        ref={titleRef}
        value={title.value}
        onChange={(e) => title.set(e.target.value)}
        className={cn(
          'mx-side w-3/4 px-2 py-1',
          'rounded-md border-2 border-editor-primary-100 bg-editor-primary-100 focus:border-editor-primary focus:outline-none',
          'serlo-input-font-reset text-2xl font-bold'
        )}
        placeholder={pluginStrings.titlePlaceholder}
      />
      <div className="mx-side mt-4 flex gap-3">
        <label className="serlo-tooltip-trigger cursor-pointer">
          <EditorTooltip text={pluginStrings.autoOpenExplanation} />
          <SwitchButton
            isOn={autoOpen.value}
            onClick={() => {
              if (autoOpen.value) mandatory.set(false)
              autoOpen.set(!autoOpen.value)
            }}
          />{' '}
          {pluginStrings.autoOpenLabel}
        </label>

        <label className="serlo-tooltip-trigger cursor-pointer">
          <EditorTooltip text={pluginStrings.mandatoryExplanation} />
          <SwitchButton
            isOn={mandatory.value}
            onClick={() => {
              if (!mandatory.value) autoOpen.set(true)
              mandatory.set(!mandatory.value)
            }}
          />{' '}
          {pluginStrings.mandatoryLabel}
        </label>

        <label className="serlo-tooltip-trigger cursor-pointer">
          <EditorTooltip text={pluginStrings.forceRewatchExplanation} />
          <SwitchButton
            isOn={forceRewatch.value}
            onClick={() => forceRewatch.set(!forceRewatch.value)}
          />{' '}
          {pluginStrings.forceRewatchLabel}
        </label>
      </div>
      <div className="mx-side mt-16">{child.render()}</div>
    </EditorModal>
  )
}
