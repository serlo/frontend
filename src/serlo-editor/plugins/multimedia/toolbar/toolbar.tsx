import { faCog } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { MouseEvent, ReactNode, RefObject, useCallback, useState } from 'react'

import type { MultimediaProps } from '..'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

type MultimediaToolbarProps = {
  children: ReactNode
  containerRef: RefObject<HTMLDivElement> | undefined
} & MultimediaProps

export const MultimediaToolbar = ({
  id,
  children,
  containerRef,
  domFocus,
  domFocusWithin,
}: MultimediaToolbarProps) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const editorStrings = useEditorStrings()

  const handleFocusParentButtonClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLButtonElement
    const pluginWrapperContainer = target.closest(
      '.plugin-wrapper-container'
    ) as HTMLDivElement

    if (pluginWrapperContainer) {
      event.preventDefault()
      event.stopPropagation()
      pluginWrapperContainer.focus()
    }
  }, [])

  if (!domFocusWithin) return null

  return domFocus ? (
    <PluginToolbar
      pluginType={EditorPluginType.Multimedia}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
            data-qa="plugin-multimedia-settings-button"
          >
            {editorStrings.edtrIo.settings} <FaIcon icon={faCog} />
          </button>
          {showSettingsModal ? (
            <ModalWithCloseButton
              isOpen={showSettingsModal}
              onCloseClick={() => setShowSettingsModal(false)}
              className="!top-1/3 !max-w-xl"
              parentSelector={() => containerRef?.current ?? document.body}
            >
              <h3 className="serlo-h3 mt-4">
                {editorStrings.edtrIo.settings}:{' '}
                {editorStrings.plugins.multimedia.title}
              </h3>

              <div className="mx-side mb-3">{children}</div>
            </ModalWithCloseButton>
          ) : null}
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
      className="-top-[35px] left-[21px] w-[calc(100%-37px)]"
    />
  ) : (
    <button
      onMouseDown={handleFocusParentButtonClick}
      className={clsx(
        tw`
            absolute -top-6 right-14 z-50 block h-6 rounded-t-md bg-gray-100
            px-2 pt-0.5 text-sm font-bold hover:bg-editor-primary-100
          `
      )}
    >
      {editorStrings.plugins.multimedia.title}
    </button>
  )
}
