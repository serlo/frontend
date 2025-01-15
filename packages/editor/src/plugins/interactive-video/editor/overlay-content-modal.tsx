import { EditorModal } from '@editor/editor-ui/editor-modal'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { SwitchButton } from '@editor/editor-ui/switch-button'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { cn } from '@editor/utils/cn'
import { useEffect, useRef } from 'react'

import { type InteractiveVideoProps } from '..'

export function OverlayContentModal({
  mark,
  onClose,
}: {
  mark: InteractiveVideoProps['state']['marks'][number]
  onClose: () => void
}) {
  const { title, autoOpen, mandatory, child } = mark
  const pluginStrings = useEditStrings().plugins.interactiveVideo
  const titleRef = useRef<HTMLInputElement>(null)

  // since there is no reliable way of keeping the input in focus
  // we instead make sure it is blurred when the modal opens
  // this way the focus wont move while the user is typing
  useEffect(() => titleRef.current?.blur(), [])

  return (
    <EditorModal
      isOpen
      setIsOpen={onClose}
      className="bottom-24 top-side h-auto w-full max-w-4xl translate-y-0 overflow-x-auto"
      title={pluginStrings.editOverlayTitle}
      extraTitleClassName="text-sm font-bold !border-0 mb-4 -mt-2.5"
      extraCloseButtonClassName="mt-0.5"
    >
      <div className="absolute right-16 top-6 text-sm italic text-gray-600">
        {pluginStrings.saveInfo}
      </div>
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
      <div className="mx-side mt-8 flex gap-3">
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
      </div>
      <div className="mx-side mt-16">{child.render()}</div>
    </EditorModal>
  )
}
