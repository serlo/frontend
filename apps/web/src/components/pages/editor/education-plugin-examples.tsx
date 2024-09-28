import { Editor } from '@editor/core'
import { EditStringsProvider } from '@editor/i18n/edit-strings-provider'
import { editStrings as editStringsDe } from '@editor/i18n/strings/de/edit'
import { editStrings as editStringsEn } from '@editor/i18n/strings/en/edit'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import type { BoxType } from '@editor/plugins/box/renderer'
import { BoxStaticRenderer } from '@editor/plugins/box/static'
import { HighlightRenderer } from '@editor/plugins/highlight/renderer'
import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type {
  AnyEditorDocument,
  EditorBoxDocument,
} from '@editor/types/editor-plugins'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { mergeDeepRight } from 'ramda'
import { useEffect, useState } from 'react'
import { debounce } from 'ts-debounce'

import { FaIcon } from '@/components/fa-icon'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'
import { createPlugins } from '@/serlo-editor-integration/create-plugins'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

function createBoxExample(title: string, content: string, type: BoxType) {
  return {
    plugin: EditorPluginType.Box,
    state: {
      type,
      title: {
        plugin: 'text',
        state: [{ type: 'p', children: [{ text: title }] }],
      },
      anchorId: '',
      content: {
        plugin: 'rows',
        state: [
          {
            plugin: 'text',
            state: [
              {
                type: 'p',
                children: [{ text: content }],
              },
            ],
          },
        ],
      },
    },
  } as EditorBoxDocument
}

export const BoxExample = (
  <>
    <ExampleWithEditSwitch
      className="mt-10"
      title="Editable Example"
      startInEdit
      stateString={JSON.stringify(
        createBoxExample('A Box', 'This box is of the type "Note"', 'note')
      )}
    />
    <BoxStaticRenderer
      {...createBoxExample(
        'Another Box',
        'This box is of the type "Attention"',
        'attention'
      )}
    />
    <BoxStaticRenderer
      {...createBoxExample(
        'Yet another Box',
        'This box is of the type "Quote"',
        'quote'
      )}
    />
  </>
)

function ExampleWithEditSwitch({
  title,
  stateString,
  startInEdit,
  className,
}: {
  title?: string
  stateString: string
  startInEdit?: boolean
  className?: string
}) {
  const [exampleState, setExampleState] = useState<AnyEditorDocument>(
    parseDocumentString(stateString)
  )
  const [isEdit, setIsEdit] = useState(!!startInEdit)

  useEffect(() => {
    if (!isEdit) return
    setTimeout(() => {
      void (
        document.activeElement
          ?.closest('.example-with-switch-wrapper')
          ?.querySelector('.plugin-wrapper-container') as HTMLDivElement
      )?.focus()
    }, 20)
  }, [isEdit])

  const { lang } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData)
    return (
      <div className="text-center">
        <LoadingSpinner />
      </div>
    )

  const debouncedSetState = debounce(
    (state?: AnyEditorDocument | null) =>
      setExampleState(state ?? parseDocumentString(stateString)),
    40
  )

  editorPlugins.init(createPlugins({ lang }))
  return (
    <EditStringsProvider
      value={
        lang === 'de'
          ? mergeDeepRight(editStringsEn, editStringsDe)
          : editStringsEn
      }
    >
      <div className={cn('example-with-switch-wrapper', isEdit && 'edit')}>
        <div className="ml-4 flex">
          {title ? (
            <h1 className="ml-4 mr-2 text-xl font-bold">{title}</h1>
          ) : null}

          <button
            onClick={() => setIsEdit(!isEdit)}
            className="serlo-button-light !px-4 text-base"
          >
            {isEdit ? (
              <>
                <FaIcon icon={faEye} /> Show Student-View
              </>
            ) : (
              <>
                <FaIcon icon={faPencilAlt} /> Show Edit-View
              </>
            )}
          </button>
        </div>
        {isEdit ? (
          <div className={cn('mt-12', className)}>
            <Editor
              initialState={exampleState}
              onChange={({ changed, getDocument }) => {
                if (!changed) return
                void debouncedSetState(getDocument())
              }}
            />
          </div>
        ) : (
          <div className="pt-4">
            <EditorRenderer document={exampleState} />
          </div>
        )}
      </div>
    </EditStringsProvider>
  )
}

export function FillInTheBlanksExample() {
  return (
    <div className="-ml-side flex flex-col gap-2 pt-2">
      <ExampleWithEditSwitch
        title="Typing"
        // startInEdit // does steal focus
        stateString='{"plugin":"blanksExercise","state":{"text":{"plugin":"text","state":[{"type":"p","children":[{"text":"Whales are the biggest "},{"type":"textBlank","blankId":"9070d7e2-f087-41f7-bb65-a7a05c643c88","correctAnswers":[{"answer":"mammals"}],"acceptMathEquivalents":false,"children":[{"text":""}]},{"text":" in the world. They communicate over long "},{"type":"textBlank","blankId":"3b0cfadb-eae6-48dd-aa08-18fa21686405","correctAnswers":[{"answer":"distances"}, {"answer":"distance"}],"acceptMathEquivalents":false,"children":[{"text":""}]},{"text":" through long songs up to thousands of kilometers."}]}]},"mode":"typing"}}'
      />

      <h1 className="ml-8 text-xl font-bold">Drag & Drop</h1>
      <EditorRenderer
        document={parseDocumentString(
          '{"plugin":"blanksExercise","state":{"text":{"plugin":"text","state":[{"type":"p","children":[{"text":"Some species of spiders are able to detect "},{"type":"textBlank","blankId":"1070e7e2-f087-41f7-bb65-a7a05c643c88","correctAnswers":[{"answer":"magnetic fields"}],"acceptMathEquivalents":false,"children":[{"text":""}]},{"text":" . They also have extraordinary "},{"type":"textBlank","blankId":"ab0cfadb-eae6-48dd-aa08-18fa21686402","correctAnswers":[{"answer":"sensory abilities"}],"acceptMathEquivalents":false,"children":[{"text":""}]},{"text":" in their leg hairs and have special receptors to detect even the slightest "},{"type":"textBlank","blankId":"8a0cfadb-eae6-48dd-aa08-18fa21686405","correctAnswers":[{"answer":"vibrations"}],"acceptMathEquivalents":false,"children":[{"text":""}]},{"text":" and air currents to identify their prey and predators."}]}]},"mode":"drag-and-drop"}}'
        )}
      />

      <h1 className="ml-8 text-xl font-bold">
        Exercise with table drag & drop
      </h1>
      <div className="ml-4">
        <EditorRenderer
          document={parseDocumentString(
            '{"plugin":"rows","state":[{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Vervollständige die Vierfeldertafel. Die Wahrscheinlichkeit "},{"type":"math","src":"P(A~\\\\cap~B)","inline":true,"children":[{"text":""}]},{"text":" beträgt "},{"type":"math","src":"21~\\\\%","inline":true,"children":[{"text":""}]},{"text":"."}]}]}]},"interactive":{"plugin":"blanksExercise","state":{"text":{"plugin":"serloTable","state":{"rows":[{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"A","inline":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"\\\\bar{A}","inline":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"B","inline":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"textBlank","blankId":"16c4d09d-a4d5-4792-b975-4594700b8486","correctAnswers":[{"answer":"21 %"}],"acceptMathEquivalents":true,"children":[{"text":""}]},{"text":" "}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"14~\\\\%","inline":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"textBlank","blankId":"884597fa-ea00-47da-8404-eb7db26512de","correctAnswers":[{"answer":"35 %"}],"acceptMathEquivalents":true,"children":[{"text":""}]},{"text":" "}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"\\\\bar{B}","inline":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"19 ~\\\\%","inline":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"textBlank","blankId":"b85fde19-284e-457c-b054-8ea42180f933","correctAnswers":[{"answer":"46 %"}],"acceptMathEquivalents":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"textBlank","blankId":"b91deb33-3c1f-4b27-9d89-59f0bdc94e48","correctAnswers":[{"answer":"65 %"}],"acceptMathEquivalents":true,"children":[{"text":""}]},{"text":""}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"textBlank","blankId":"5bccafac-d0d2-46e7-a737-bb3e462d4218","correctAnswers":[{"answer":"40 %"}],"acceptMathEquivalents":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"textBlank","blankId":"80a57af9-e968-4ead-8c06-6a9183be0e10","correctAnswers":[{"answer":"60 %"}],"acceptMathEquivalents":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"100~\\\\%","inline":true,"children":[{"text":""}]},{"text":""}]}]}}]}],"tableType":"RowAndColumnHeader"}},"mode":"drag-and-drop"}},"solution":{"plugin":"solution","state":{"strategy":{"plugin":"text","state":[{"children":[{"children":[{"type":"list-item-child","children":[{"text":"Setze für die Wahrscheinlichkeit "},{"type":"math","src":"","inline":true,"children":[{"text":""}]},{"text":""},{"type":"math","src":"P(A\\\\cap B)","inline":true,"children":[{"text":""}]},{"text":" "},{"type":"math","src":"21~\\\\%","inline":true,"children":[{"text":""}]},{"text":" ein."}]}],"type":"list-item"},{"children":[{"type":"list-item-child","children":[{"text":"Berechne die fehlenden Werte in den Zeilen und Spalten. Die Summe der Werte im Inneren der "},{"type":"a","href":"/1875","children":[{"text":"Tafel"}]},{"text":" ergeben den Wert am Rand der Tafel."}]}],"type":"list-item"}],"type":"unordered-list"}]},"steps":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"h","children":[{"text":"Ausgefüllte Vierfeldertafel"}],"level":3}]},{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Die Wahrscheinlichkeit "},{"type":"math","src":"P(A\\\\cap B)","inline":true,"children":[{"text":""}]},{"text":" beträgt nach Angabe "},{"type":"math","src":"21~\\\\%","inline":true,"children":[{"text":""}]},{"text":". Diese tragen wir in die Tafel ein."}]}]}]},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/8d7f6370-18e8-11ef-890b-238e2c9e9d69/image.png","caption":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}]}}},"illustrating":true,"width":50}},{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"In jeder Zeile und Spalte gilt:"}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":"Die Werte im Inneren der Tafel ergeben als "},{"text":"Summe","strong":true},{"text":" den Wert am Rand."}]},{"type":"p","children":[{"text":""}]}]}]},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/e427af20-18e8-11ef-890b-238e2c9e9d69/image.png","caption":{"plugin":"text","state":[{"type":"p","children":[{"text":"Ausfüllen der Zeilen und Spalten"}]}]}}},"illustrating":true,"width":50}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Damit kann die Tafel vollständig ausgefüllt werden:"}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/20e463e0-18e9-11ef-890b-238e2c9e9d69/image.png","caption":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}]}}}]},"prerequisite":{"id":"1875","title":"Vierfeldertafel"}}}}}]}'
          )}
        />
      </div>
    </div>
  )
}

export const DropzoneExample = (
  <div className="pt-2">
    <ExampleWithEditSwitch
      // startInEdit // does steal focus
      stateString='{"plugin":"rows","state":[{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"77620693-3a91-4da6-9473-a11ecf3f5bf5"}],"id":"ff2620f8-349d-4dc3-aee4-7eb92b7bc2e2"},"interactive":{"plugin":"dropzoneImage","state":{"answerZones":[{"id":"answerZone-0","name":"","position":{"top":0.0784,"left":0.2267},"layout":{"width":0.3149,"height":0.1704},"answers":[{"id":"a987ac56-9c73-4625-9d8b-f635ba418643","image":{"plugin":"image","state":{"src":""},"id":"782e0412-9618-40e1-8ea7-a1354370258e"},"text":{"plugin":"text","state":[{"type":"p","children":[{"text":"Condensation","strong":true}]}],"id":"e199f1b6-ccbc-4049-90a0-286bebe99130"}}]},{"id":"answerZone-1","name":"","position":{"top":0.4193,"left":0},"layout":{"width":0.3317,"height":0.1642},"answers":[{"id":"b48d3e4a-6076-478f-b45e-c6ef5a0e0032","image":{"plugin":"image","state":{"src":""},"id":"08a6c108-ea96-4388-9b4c-62e887602f6e"},"text":{"plugin":"text","state":[{"type":"p","children":[{"text":"Evaporation","strong":true}]}],"id":"aa3116c8-87a9-4b05-84ba-376a596fe8b5"}}]},{"id":"answerZone-2","name":"","position":{"top":0.3152,"left":0.6983},"layout":{"width":0.3,"height":0.1894},"answers":[{"id":"8bb93f22-055b-4961-a3b9-959158708cd1","image":{"plugin":"image","state":{"src":""},"id":"e8156ff2-bdd0-4c82-9901-996b436dfd14"},"text":{"plugin":"text","state":[{"type":"p","children":[{"text":"Precipitation","strong":true}]}],"id":"cd8f5505-d78d-484f-b06a-5138e3048d16"}}]},{"id":"answerZone-3","name":"","position":{"top":0.7919,"left":0.4517},"layout":{"width":0.3383,"height":0.1611},"answers":[{"id":"56d78ed9-621b-47d5-a94c-3cbe9059d6e2","image":{"plugin":"image","state":{"src":""},"id":"171c8f60-3086-4b82-ada0-075cd55a6d08"},"text":{"plugin":"text","state":[{"type":"p","children":[{"text":"Infiltration","strong":true}]}],"id":"d7c7dfb3-c0ef-420c-83bb-2d3340a05150"}}]}],"canvasShape":"","canvasDimensions":{"height":316.7750325097529,"width":600},"backgroundType":"image","backgroundImage":{"plugin":"image","state":{"src":"https://assets.serlo.org/c7b11690-4806-11ef-b44b-9b93a28029ea/image.jpg","caption":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}],"id":"d28a8490-1f60-429f-a8bc-a14189324c7c"}},"id":"0fb8a4ea-4ee2-4c34-835b-02a2f19a0bce"},"dropzoneVisibility":"full","extraDraggableAnswers":[]},"id":"00596756-5bb7-445c-b4e3-2ca744716f1e"}},"id":"22dde504-84ec-4466-9761-9b5097599893"}]}'
    />
  </div>
)

export const InputExample = (
  <div className="pt-2">
    <EditorRenderer
      document={parseDocumentString(
        '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"There are "},{"type":"math","src":"13 ","inline":true,"children":[{"text":"13"}]},{"text":" boys and "},{"type":"math","src":"11 ","inline":true,"children":[{"text":"11"}]},{"text":" girls in class 5b. How many children are in the class in total?"}]}]}]},"interactive":{"plugin":"inputExercise","state":{"type":"input-string-normalized-match-challenge","unit":"","answers":[{"value":"24","isCorrect":true,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Great job!"}]}]}},{"value":"25","isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Almost..."}]}]}},{"value":"2","isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"You have to take the sum and not the difference."}]}]}},{"value":"","isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Almost..."}]}]}}]}}}}'
      )}
    />
    <EditorRenderer
      document={parseDocumentString(
        '{"plugin":"solution","state":{"prerequisite":{"id":"138148","title":"Addition"},"strategy":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"steps":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Add the number of boys and the number of girls:"}]},{"type":"p","children":[{"text":""},{"type":"math","src":"13+11=24","inline":true,"children":[{"text":""}]},{"text":""}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"There are "},{"type":"math","src":"24 ","inline":true,"children":[{"text":"24"}]},{"text":" children in the class."}]}]}]}}}'
      )}
    />
  </div>
)

export const TextExerciseExample = (
  <div className="pt-2">
    <EditorRenderer
      document={parseDocumentString(
        '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"The drawbridge of a castle is "},{"type":"math","src":"8m","inline":true,"children":[{"text":"8m"}]},{"text":" long and has an angle of "},{"type":"math","src":"43^\\\\circ","inline":true,"children":[{"text":"43^\\\\circ"}]},{"text":" between the wall and the chain. How long must a chain be that can be used to fold down the drawbridge?"}]}]}]},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/1840.png","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},"illustrating":true,"width":50}}]}}}'
      )}
    />
    <EditorRenderer
      document={parseDocumentString(
        '{"plugin":"solution","state":{"prerequisite":{"id":"228138","title":"Sine, Cosine and Tangent"},"strategy":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"steps":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Determine the chain length "},{"type":"math","src":"k","inline":true,"children":[{"text":"k"}]},{"text":" using the sine."}]}]},{"plugin":"equations","state":{"transformationTarget":"equation","firstExplanation":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"steps":[{"left":"\\\\sin\\\\left(43°\\\\right)","sign":"equals","right":"\\\\frac{8\\\\text{m}}{k}","transform":"\\\\cdot k","explanation":{"plugin":"text","state":[{"type":"p","children":[{}]}]}},{"left":"\\\\sin\\\\left(43°\\\\right)\\\\cdot k","sign":"equals","right":"8\\\\ \\\\text{m}\\\\ ","transform":"\\\\ :\\\\sin\\\\left(43°\\\\right)","explanation":{"plugin":"text","state":[{"type":"p","children":[{}]}]}},{"left":"k","sign":"equals","right":"\\\\frac{8\\\\text{m}}{\\\\sin\\\\left(43°\\\\right)}","transform":"","explanation":{"plugin":"text","state":[{"type":"p","children":[{}]}]}},{"left":"k","sign":"almost-equal-to","right":"11.7\\\\text{m}\\\\ ","transform":"","explanation":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}]}},{"plugin":"text","state":[{"type":"p","children":[{"text":"The chain must be about "},{"type":"math","src":"11.7 m","inline":true,"children":[{"text":"11.7 m"}]},{"text":" long so that you can lower the drawbridge."}]}]}]}}}'
      )}
    />
  </div>
)

export const SCExample = (
  <div className="pt-3.5">
    <ExampleWithEditSwitch
      // startInEdit // does steal focus
      stateString='{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"What is the value of "},{"type":"math","src":"3x + 5","inline":true,"children":[{"text":"3x + 5"}]},{"text":" when "},{"type":"math","src":"x = 2","inline":true,"children":[{"text":"x = 2"}]},{"text":"?"}]}]}]},"interactive":{"plugin":"scMcExercise","state":{"isSingleChoice":true,"answers":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"11"}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"When X is substituted, its value gets "},{"text":"multiplied ","strong":true},{"text":"with 3."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"10"}]}]},"isCorrect":true,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Great!"}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"9"}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Try again!"}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"8"}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"You need to substitute x with 2!"}]}]}}]}}}}'
    />
    {/* <EditorRenderer document={parseDocumentString()} /> */}
  </div>
)

export const MCExample = (
  <div className="pt-2">
    <EditorRenderer
      document={parseDocumentString(
        '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Consider on the unit circle: For which angles between "},{"type":"math","src":"0^\\\\circ","inline":true,"children":[{"text":"0^\\\\circ"}]},{"text":" and "},{"type":"math","src":"360^\\\\circ","inline":true,"children":[{"text":"360^\\\\circ"}]},{"text":" you have "},{"type":"math","src":"\\\\sin\\\\left(\\\\alpha\\\\right)=0.5","inline":true,"children":[{"text":"\\\\sin\\\\left(\\\\alpha\\\\right)=0{,}5"}]},{"text":"?"}]}]}]},"interactive":{"plugin":"scMcExercise","state":{"isSingleChoice":false,"answers":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"\\\\alpha=30^{\\\\circ}","inline":true,"children":[{"text":"\\\\alpha = 20^\\\\circ"}]},{"text":""}]}]},"isCorrect":true,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Correct!"}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"\\\\alpha = 45^\\\\circ","inline":true,"children":[{"text":"\\\\alpha = 45^\\\\circ"}]},{"text":""}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Nope! Even though this angle cuts the "},{"type":"math","src":"90^\\\\circ","inline":true,"children":[{"text":"90^\\\\circ"}]},{"text":" - angle in half, the sine is not "},{"type":"math","src":"\\\\tfrac 12","inline":true,"children":[{"text":"\\\\tfrac 12"}]},{"text":", but "},{"type":"math","src":"\\\\tfrac{\\\\sqrt{2}}{2}","inline":true,"children":[{"text":"\\\\tfrac{\\\\sqrt{2}}{2}"}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"\\\\alpha = 60^\\\\circ","inline":true,"children":[{"text":"\\\\alpha = 60^\\\\circ"}]},{"text":""}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Here, you have "},{"type":"math","src":" \\\\cos(\\\\alpha) = 0.5","inline":true,"children":[{"text":"\\\\cos(\\\\alpha) = 0.5"}]},{"text":"."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"\\\\alpha = 150^\\\\circ","inline":true,"children":[{"text":"\\\\alpha = 150^\\\\circ"}]},{"text":""}]}]},"isCorrect":true,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Correct!"}]}]}}]}}}}'
      )}
    />
  </div>
)

export const HighlightExample = (
  <HighlightRenderer
    code={`// global variable: read & write from everywhere
var cookieAmount = 100

// local variable: read & write from everywhere only in current code block
// (only in the "feed" function)
function feed(){
  let cookieAmount = 20
}

// constant: local variable that can only be read after initialization
// this will always be 5
const cookieSize = 5`}
    language="javascript"
    showLineNumbers
  />
)
export const SpoilerExample = (
  <ExampleWithEditSwitch stateString='{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"23+19= 23 +(17+2)=(23+17)+2=40+2=42","inline":true,"children":[{"text":""}]},{"text":""}]}],"id":"bf806213-a61e-448d-8778-5a37807cd037"},{"plugin":"spoiler","state":{"richTitle":{"plugin":"text","state":[{"type":"p","children":[{"text":"There are also other ways to split the summands:"}]}],"id":"c9e6206f-0486-4f9b-8a5c-7d300d23e433"},"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"23+19=(21+2)+19=(21+19)+2=40+2=42","inline":true,"children":[{"text":""}]},{"text":""}]}],"id":"9186dda2-b71e-4512-8194-c70e4c111622"}],"id":"e452d8cb-330a-495a-a968-192e9e6fb6ce"}},"id":"46c20fab-f1b0-4837-a6d5-389395cc9cf9"}]}' />
)
