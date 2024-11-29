import { CKEditor } from '@ckeditor/ckeditor5-react'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { cn } from '@editor/utils/cn'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {
  Bold,
  ClassicEditor,
  Essentials,
  Italic,
  Mention,
  Paragraph,
} from 'ckeditor5'
import { useContext, useEffect, useRef } from 'react'
import { v4 as uuid_v4 } from 'uuid'

import { FeedbackButton } from './feedback-button'
import { StateContext } from './state-context'
import { Text } from './types'
import { PrototypeStateStore } from './prototype-state'

// Where user types text
export function TextBlock({ id, content, type }: Text) {
  //const { state, setState } = useContext(StateContext)

  const autofocusId = useRef<string | null>(null)

  useEffect(() => {
    if (!autofocusId.current) return

    console.log(autofocusId.current)

    setTimeout(() => {
      document.getElementById(autofocusId).focus()
      autofocusId.current = null
    }, 100)
  }, [autofocusId])

  return (
    <div className="flex flex-row">
      <textarea
        id={id}
        onKeyDown={(keyDownEvent) => {
          if (keyDownEvent.key !== 'Enter') return
          keyDownEvent.preventDefault() // Don't add newline
          PrototypeStateStore.update((s) => {
            const index = s.textAreaBlocks.findIndex((block) => block.id === id)
            const newTextBlock = createTextBlock()
            //autofocusId.current = newTextBlock.id
            s.textAreaBlocks.splice(index + 1, 0, newTextBlock)
          })
        }}
        className="plugin-text-area-text-area grow resize-none bg-transparent outline-none"
      ></textarea>
      <FeedbackButton id={id} />
    </div>
  )
}

export function createTextBlock(): Text {
  return { id: uuid_v4(), type: 'text', content: '' }
}
