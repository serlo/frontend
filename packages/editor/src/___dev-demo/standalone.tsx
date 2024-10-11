import { SerloEditor } from '@editor/package'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const initialState =
  '{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"h","level":1,"children":[{"text":"Hello React Package 🎉"}]}]}]}'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SerloEditor
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      initialState={JSON.parse(initialState)}
      editorVariant="unknown"
      onChange={(newState) => {
        // eslint-disable-next-line no-console
        console.log(`changed: `, newState)
      }}
    >
      {(editor) => <div>{editor.element}</div>}
    </SerloEditor>
  </StrictMode>
)
