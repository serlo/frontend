import { selectDocument, useAppSelector } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { EditorImageDocument } from '@editor/types/editor-plugins'
import { faImage } from '@fortawesome/free-solid-svg-icons'

import type { DragDropBgProps } from '.'
import { EditorCanvas } from './components/editor/EditorCanvas'
import { DragDropBgToolbar } from './toolbar'
import { FaIcon } from '@/components/fa-icon'

export function DragDropBgEditor({ state, id }: DragDropBgProps) {
  const { backgroundImage, backgroundType } = state

  const bgImagePluginState = useAppSelector((state) =>
    selectDocument(state, backgroundImage.get())
  ) as EditorImageDocument
  const backgroundImageUrlFromPlugin = bgImagePluginState?.state?.src || ''

  const onClickAddAnswerZone = () => {
    const currentLength = state.answerZones.length
    state.answerZones.insert(currentLength, {
      id: `${id}-answerZone-${currentLength}`,
      position: { left: 20 * currentLength + 1, top: 20 },
      layout: {
        width: 100,
        height: 100,
        visible: true,
        lockedAspectRatio: true,
      },
      answer: {
        image: { plugin: EditorPluginType.Image },
        text: { plugin: EditorPluginType.Text },
      },
    })
  }

  const addButton = (
    <button
      onClick={onClickAddAnswerZone}
      className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
    >
      Ablagezone
    </button>
  )

  const blankVsImage = (
    <>
      <DragDropBgToolbar id={id}>{addButton}</DragDropBgToolbar>
      <div className="flex flex-row items-center justify-center">
        <button
          className="m-[20px] rounded-[5px] bg-orange-100 p-[10px] pr-[20px]"
          onClick={() => {
            backgroundType.set('text')
          }}
        >
          Blank
        </button>
        <span>oder</span>
        <button
          className="m-[20px] rounded-[5px] bg-orange-100 p-[10px] pr-[20px]"
          onClick={() => backgroundType.set('image')}
        >
          Image <FaIcon icon={faImage} />
        </button>
      </div>
    </>
  )

  const isBlankBg = backgroundType.get() === 'text'
  const isBackgroundImageDefined =
    backgroundType.get() === 'image' && backgroundImage.get() !== ''

  const isBackgroundDefined = isBlankBg || isBackgroundImageDefined
  const canvas = (
    <>
      <div className={!isBackgroundDefined ? '' : '-left-[999px] hidden'}>
        {backgroundImage.render({ config: {} })}
      </div>
      <DragDropBgToolbar id={id}>{addButton}</DragDropBgToolbar>
      <div className={isBackgroundDefined ? '' : '-left-[999px] hidden'}>
        <EditorCanvas state={state} config={{}} id="" focused={false} />
      </div>
    </>
  )

  return isBackgroundDefined ? canvas : blankVsImage
}
