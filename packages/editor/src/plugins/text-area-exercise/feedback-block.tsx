import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faSpeakap } from '@fortawesome/free-brands-svg-icons'
import { faComments } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowUpRightFromSquare,
  faExclamationCircle,
  faTimes,
  faUser,
  faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons'

import { AnimateChangeInHeight } from './animate-change-in-height'
import { PrototypeStateStore } from './prototype-state'
import { Feedback } from './types'
import { usePluginId } from './use-plugin-id'

export function FeedbackBlock({ id, content }: Feedback) {
  const silentmode = PrototypeStateStore.useState((s) => s.silentMode)
  const pluginId = usePluginId()

  const showLinkPreview =
    content.filter((entry) => entry.type === 'link')?.length !== 0

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
        <span>
          {content.map((entry, index) => {
            if (entry.type === 'text') {
              return (
                <span className={cn(entry.bold ? 'font-bold' : '')} key={index}>
                  {entry.text}
                </span>
              )
            }
            if (entry.type === 'link')
              return (
                <a
                  className="underline decoration-purple-700 underline-offset-2"
                  key={index}
                  href={entry.href}
                >
                  {entry.text}
                  {/* <FaIcon className="ml-1" icon={faArrowDown} /> */}
                </a>
              )
          })}
          {/* Link previews */}
          {showLinkPreview ? (
            <div className="py-3">
              {content
                .filter((entry) => entry.type === 'link')
                .map((_entry, index) => {
                  return (
                    <button
                      className="flex flex-row gap-3 rounded-md bg-purple-200 p-3 shadow hover:bg-purple-300"
                      key={index}
                    >
                      <img
                        className="h-[5.7rem] rounded-md shadow-inner"
                        src={_entry.linkPreview.image}
                      />
                      <div className="flex flex-col items-center gap-2 ">
                        <div className="font-bold">
                          {_entry.linkPreview.title}
                        </div>
                        <div className="flex flex-row items-center gap-3 text-gray-600">
                          <FaIcon icon={faUser} />
                          <span>|</span>
                          <span>Übung</span>
                          <span>|</span>
                          <span>5min</span>
                        </div>
                        <div className="flex w-full flex-row items-center justify-end  text-purple-400">
                          <FaIcon
                            className=""
                            icon={faArrowUpRightFromSquare}
                          />
                        </div>
                      </div>
                    </button>
                  )
                })}
            </div>
          ) : null}
        </span>
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
