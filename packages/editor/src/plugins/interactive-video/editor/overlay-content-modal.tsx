import { OverlayInput } from '@editor/editor-ui/overlay-input'

import { type InteractiveVideoProps } from '..'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'

export function OverlayContentModal({
  mark,
  onClose,
}: {
  mark: InteractiveVideoProps['state']['marks'][number]
  onClose: () => void
}) {
  const { title, autoOpen, mandatory, child } = mark
  return (
    <ModalWithCloseButton
      isOpen
      setIsOpen={onClose}
      className="bottom-24 top-side h-auto w-full max-w-4xl translate-y-0 overflow-x-auto"
      title="Inhalt bearbeiten"
      extraTitleClassName="text-2xl font-bold"
    >
      <div className="p-8">
        <p className="mt-4">
          <OverlayInput
            label="Titel"
            value={title.value}
            onChange={(e) => title.set(e.target.value)}
          />
        </p>
        <p className="mt-4">
          <label>
            <span>Automatisch öffnen</span>
            <input
              type="checkbox"
              checked={autoOpen.value}
              onChange={(e) => autoOpen.set(e.target.checked)}
            />
          </label>
        </p>
        <p className="mt-4">
          <label>
            <span>Muss gelöst werden</span>
            <input
              className=""
              type="checkbox"
              checked={mandatory.value}
              onChange={(e) => mandatory.set(e.target.checked)}
            />
          </label>
        </p>

        <p className="mt-12">{child.render()}</p>
      </div>
    </ModalWithCloseButton>
  )
}
