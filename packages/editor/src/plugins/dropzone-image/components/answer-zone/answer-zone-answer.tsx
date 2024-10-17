import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { useStore } from '@editor/store'
import { cn } from '@editor/utils/cn'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { AnswerContent } from './answer-content'
import { AnswerType, type AnswerZoneState } from '../../types'
import {
  getAnswerZoneImageSrc,
  getAnswerZoneText,
} from '../../utils/answer-zone'

export const answerZoneDragType = 'answerZone'

interface AnswerZoneAnswerProps {
  answer: AnswerZoneState['answers'][0]
  isOnlyAnswer: boolean
  onEditAnswer: (answerType: AnswerType) => void
  onRemoveAnswer: () => void
}

export function AnswerZoneAnswer(props: AnswerZoneAnswerProps) {
  const store = useStore()
  const { answer, isOnlyAnswer, onEditAnswer, onRemoveAnswer } = props

  const pluginStrings = useEditStrings().plugins.dropzoneImage

  const answerImageUrl = getAnswerZoneImageSrc(answer.image.id, () =>
    store.getState()
  )
  const answerText = getAnswerZoneText(answer.text.id, () => store.getState())

  return (
    <div
      className={cn(
        'group/edit relative',
        getSize(answerImageUrl, isOnlyAnswer),
        getBorder(answerImageUrl, isOnlyAnswer)
      )}
    >
      <div
        className={cn(`
          absolute bottom-0 left-0 right-0 top-0 mx-1 hidden h-full
          items-center justify-center rounded-full group-hover/edit:flex
        `)}
      >
        <button
          onClick={() => {
            onEditAnswer(answerImageUrl ? AnswerType.Image : AnswerType.Text)
          }}
          className="serlo-button-editor-secondary serlo-tooltip-trigger z-10 mx-1 h-6 w-6 p-0"
        >
          <FaIcon icon={faPencilAlt} className="text-xs" />
          <EditorTooltip
            text={pluginStrings.answers.edit}
            className="!-ml-2 !pb-2"
          />
        </button>
        <button
          data-qa={`answer-zone-${answer.id.value}-remove-answer-button`}
          onClick={onRemoveAnswer}
          className="serlo-button-editor-secondary serlo-tooltip-trigger z-10 mx-1 h-6 w-6 p-0"
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
        className={getAnswerBorder(answerImageUrl, isOnlyAnswer)}
      />
    </div>
  )
}

function getSize(imageUrl: string | undefined, isOnlyAnswer: boolean) {
  if (!imageUrl) return ''
  if (isOnlyAnswer) return 'h-full object-contain'
  return 'h-16 object-contain'
}

function getBorder(imageUrl: string | undefined, isOnlyAnswer: boolean) {
  if (imageUrl && isOnlyAnswer) return ''
  return 'border-3 border-transparent'
}

function getAnswerBorder(imageUrl: string | undefined, isOnlyAnswer: boolean) {
  if (isOnlyAnswer) return ''
  if (imageUrl) return 'rounded border border-brand'
  return ''
}
