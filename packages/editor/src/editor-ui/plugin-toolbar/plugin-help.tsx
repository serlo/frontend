import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { pluginHelpContent } from '@editor/i18n/strings/de/help-content'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { AnyEditorDocument } from '@editor/types/editor-plugins'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'

import { EditorModal } from '../editor-modal'
import { FaIcon } from '../fa-icon'

export function PluginHelp({
  pluginType,
  pluginTitle,
}: {
  pluginType: string
  pluginTitle: string
}) {
  const { lang } = useEditStrings()
  const [showModal, setShowModal] = useState(false)

  const data =
    Object.hasOwn(pluginHelpContent, pluginType) &&
    pluginHelpContent[pluginType as keyof typeof pluginHelpContent]

  if (lang !== 'de' || !data) return null

  const { video, shortExplanation } = data

  return (
    <>
      <button
        className="ml-[-8px] hover:text-editor-primary active:text-editor-primary"
        onClick={() => setShowModal(true)}
      >
        <FaIcon icon={faCircleQuestion} className="mr-2" />
      </button>
      <EditorModal
        className="top-0 my-4 max-h-[calc(100vh-2rem)] w-[700px] max-w-[95%] translate-y-0 overflow-hidden"
        title={`Hilfe für das ${pluginTitle}-Plugin`}
        isOpen={showModal}
        extraTitleClassName="text-lg border-0 -mt-4 mb-3"
        setIsOpen={setShowModal}
      >
        <div className="max-h-[calc(100vh-2rem)] overflow-y-auto pb-12">
          {renderContent()}
          {video ? (
            <video
              muted
              loop
              controls
              playsInline
              className="mx-side mb-12 max-w-[calc(100%-32px)] rounded-md border-4 border-brand-200"
            >
              <source src={video} type="video/webm" />
            </video>
          ) : null}
        </div>
      </EditorModal>
    </>
  )

  function renderContent() {
    if (!shortExplanation) return null
    if (typeof shortExplanation === 'string') {
      return <p className="serlo-p">{shortExplanation}</p>
    }
    return <StaticRenderer document={shortExplanation as AnyEditorDocument} />
  }
}
