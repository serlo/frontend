import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faComments } from '@fortawesome/free-regular-svg-icons'
import {
  faExclamationCircle,
  faTimes,
  faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons'

import { AnimateChangeInHeight } from './animate-change-in-height'
import { PrototypeStateStore } from './prototype-state'
import { Feedback } from './types'
import { usePluginId } from './use-plugin-id'

export function FeedbackBlock({ id, content }: Feedback) {
  const silentmode = PrototypeStateStore.useState((s) => s.silentMode)
  const pluginId = usePluginId()

  return (
    <div
      id={id}
      className={cn(
        'relative mb-3 rounded-md bg-purple-100 p-3 shadow-lg',
        silentmode && 'hidden'
      )}
    >
      <button
        className="absolute -top-2 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100"
        onClick={() => {
          PrototypeStateStore.update((s) => {
            s.textAreaPlugins[pluginId].textAreaBlocks = s.textAreaPlugins[
              pluginId
            ].textAreaBlocks.filter((x) => x.id !== id)
          })
        }}
      >
        <FaIcon icon={faTimes} />
      </button>
      <AnimateChangeInHeight>
        {/* {isCorrect ? (
          <FaIcon icon={faCheck} className="text-purple-400" />
        ) : (
          <FaIcon icon={faExclamationTriangle} className="text-purple-400" />
        )}{' '} */}
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        <div className="mt-3 flex flex-row justify-end gap-5 text-sm text-gray-600">
          <button className="hover:underline">
            <FaIcon icon={faVolumeHigh} /> Vorlesen
          </button>
          <button className="hover:underline">
            <FaIcon icon={faComments} /> Chat
          </button>
          <button className="hover:underline">
            <FaIcon icon={faExclamationCircle} /> Feedback nicht hilfreich oder
            falsch
          </button>
        </div>
      </AnimateChangeInHeight>
    </div>
  )
}
