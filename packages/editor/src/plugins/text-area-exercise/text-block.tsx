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
import { useContext } from 'react'
import { v4 as uuid_v4 } from 'uuid'

import { FeedbackButton } from './feedback-button'
import { StateContext } from './state-context'
import { Text } from './types'

// Where user types text
export function TextBlock({ id, content, type }: Text) {
  return (
    <>
      <textarea></textarea>
      <FeedbackButton id={id} />
    </>

    // <CKEditor
    //   editor={ClassicEditor}
    //   config={{
    //     toolbar: {
    //       items: ['undo', 'redo', '|', 'bold', 'italic'],
    //     },
    //     plugins: [SCAYT],
    //     licenseKey: '<YOUR_LICENSE_KEY>',
    //     initialData: '<p>Hello from CKEditor 5 in React!</p>',
    //   }}
    // />
    // <textarea
    //   id={id}
    //   key={id}
    //   rows={3}
    //   // onKeyDown={(keyDownEvent) => {
    //   //   keyDownEvent.preventDefault()
    //   //   if (keyDownEvent.key === 'Enter')
    //   //     setBlocks((blocks) => [...blocks, createEmptyTextBlock()])
    //   // }}
    // ></textarea>
  )
}

export function createTextBlock(): Text {
  return { id: uuid_v4(), type: 'text', content: '' }
}
