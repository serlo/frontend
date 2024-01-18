import { Editor as SlateEditor, Transforms } from 'slate'

/**
 * Experimental: this handles pasting of plaintext with LaTeX formulas.
 * Only inline formulas wrapped in \( …formula… \) are supported
 * this also converts empty lines and \\ to new paragraphs
 */
export function mathpixPasteHandler({
  event,
  text,
  editor,
}: {
  event: React.ClipboardEvent
  text: string
  editor: SlateEditor
}) {
  if (!text.includes('\\(') || !text.includes('\\)')) return

  const paragraphs = text.split(/\n\s*\n|\\\\\n/gm) // Split by empty lines

  paragraphs.forEach((paragraph, index) => {
    const parts = paragraph.split(/\\\((.*?)\\\)/gm)

    if (!parts.length) return

    const children = parts.map((part, partIndex) => {
      if (partIndex % 2 === 1) {
        return {
          type: 'math' as const,
          src: part,
          inline: true,
          children: [{ text: '' }],
        }
      } else return { text: part }
    })

    Transforms.insertNodes(editor, children)

    if (index < paragraphs.length - 1) {
      Transforms.insertNodes(editor, {
        type: 'p',
        children: [{ text: '' }],
      })
    }
    event.preventDefault()
    return
  })
}
