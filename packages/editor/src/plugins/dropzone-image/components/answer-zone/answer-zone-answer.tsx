import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import type { Descendant } from 'slate'

import { AnswerContent } from './answer-content'
import { AnswerType } from '../../types'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'

export const answerZoneDragType = 'answerZone'

interface AnswerZoneAnswerProps {
  answerImageUrl: string
  answerText?: Descendant[]
  answerType: string
  dataQa: string
  onEditAnswer: () => void
  onRemoveAnswer: () => void
}

export const AnswerZoneAnswer = (props: AnswerZoneAnswerProps) => {
  const {
    answerImageUrl,
    answerText,
    answerType,
    dataQa,
    onEditAnswer,
    onRemoveAnswer,
  } = props

  const pluginStrings = useEditorStrings().plugins.dropzoneImage

  return (
    <div
      className={cn(`
        group/edit relative
        ${answerType === AnswerType.Image ? 'h-full object-contain' : ''}
      `)}
    >
      <div
        className={cn(`
          absolute bottom-0 left-0 right-0 top-0 mx-1 hidden h-full
          items-center justify-center rounded-full group-hover/edit:flex
        `)}
      >
        <button
          onClick={onEditAnswer}
          className="serlo-button-editor-secondary serlo-tooltip-trigger mx-1 h-6 w-6 p-0"
        >
          <FaIcon icon={faPencilAlt} className="text-xs" />
          <EditorTooltip
            text={pluginStrings.answers.edit}
            className="!-ml-2 !pb-2"
          />
        </button>
        <button
          data-qa={dataQa}
          onClick={onRemoveAnswer}
          className="serlo-button-editor-secondary serlo-tooltip-trigger mx-1 h-6 w-6 p-0"
        >
          <FaIcon icon={faTrashAlt} className="text-xs" />
          <EditorTooltip
            text={pluginStrings.answers.remove}
            className="!-ml-2 !pb-2"
          />
        </button>
      </div>

      <AnswerContent
        url={answerImageUrl}
        text={answerText}
        isPreview={false}
        display="block"
      />
    </div>
  )
}
