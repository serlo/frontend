import { useState } from 'react'

// import { convertAiGeneratedDataToEditorData } from '@/helper/ai-generated-exercises/data-conversion'
import { AddButton } from '@/serlo-editor/editor-ui'

export function Experiment() {
  const [openAiApiOutputJson, setOpenAiApiOutputJson] = useState<string>('')

  const clickHandler = () => {
    //console.log(convertAiGeneratedDataToEditorData(openAiApiOutputJson))
  }

  return (
    <div className="my-10">
      <input
        value={openAiApiOutputJson}
        onChange={(event) => setOpenAiApiOutputJson(event.target.value)}
      />
      <AddButton onClick={clickHandler}>
        Convert OpenAI API output JSON to exercise JSON
      </AddButton>
    </div>
  )
}
