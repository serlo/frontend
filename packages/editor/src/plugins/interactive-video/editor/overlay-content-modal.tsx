import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { SwitchButton } from '@editor/editor-ui/switch-button'

import { type InteractiveVideoProps } from '..'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'

export function OverlayContentModal({
  mark,
  onClose,
}: {
  mark: InteractiveVideoProps['state']['marks'][number]
  onClose: () => void
}) {
  const { title, autoOpen, mandatory, forceRewatch, child } = mark
  const pluginStrings = useEditorStrings().plugins.interactiveVideo
  return (
    <ModalWithCloseButton
      isOpen
      setIsOpen={onClose}
      className="bottom-24 top-side h-auto w-full max-w-4xl translate-y-0 overflow-x-auto"
      title={pluginStrings.editOverlayTitle}
      extraTitleClassName="text-sm font-bold !border-0 mb-1"
    >
      <div>
        <input
          value={title.value}
          onChange={(e) => title.set(e.target.value)}
          className={cn(
            'mx-side w-3/4 px-2 py-1',
            'rounded-md border-2 border-editor-primary-100 bg-editor-primary-100 focus:border-editor-primary focus:outline-none',
            'serlo-input-font-reset text-2xl font-bold'
          )}
          placeholder={pluginStrings.titlePlaceholder}
        />
      </div>
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
    </ModalWithCloseButton>
  )
}
