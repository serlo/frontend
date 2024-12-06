import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

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
        'relative m-3 rounded-md bg-purple-200 p-3',
        silentmode && 'hidden'
      )}
    >
      <button
        className="absolute -right-1 -top-3 h-6 w-6 rounded-full bg-blue-200 text-center"
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
        {content}
      </AnimateChangeInHeight>
    </div>
  )
}
