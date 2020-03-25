import withArticle from '../src/schema/articleNormalizer'
import { createEditor, Editor } from 'slate'

const document = {
  children: [
    {
      type: 'spoiler-body',
      children: [
        {
          type: 'inline-math',
          children: [
            {
              type: 'p',
              children: [{ text: '123' }]
            }
          ]
        },
        {
          type: 'img',
          children: [{ text: '123' }]
        }
      ]
    }
  ]
}

function HelloWorld() {
  const editor = withArticle(createEditor())
  editor.children = document.children
  Editor.normalize(editor, { force: true })
  return JSON.stringify(editor.children)
}

export default HelloWorld
