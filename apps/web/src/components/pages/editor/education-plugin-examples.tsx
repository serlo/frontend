import type { BoxType } from '@editor/plugins/box/renderer'
import { BoxStaticRenderer } from '@editor/plugins/box/static'
import { HighlightRenderer } from '@editor/plugins/highlight/renderer'
import { SpoilerRenderer } from '@editor/plugins/spoiler/renderer'
import type { StaticMathProps } from '@editor/plugins/text/static-components/static-math'
import { parseDocumentString } from '@editor/static-renderer/helper/parse-document-string'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { EditorBoxDocument } from '@editor/types/editor-plugins'
import dynamic from 'next/dynamic'

const StaticMath = dynamic<StaticMathProps>(() =>
  import('@editor/plugins/text/static-components/static-math').then(
    (mod) => mod.StaticMath
  )
)

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
    {[
      createBoxExample('A Box', 'This box is of the type "Note"', 'note'),
      createBoxExample(
        'Another Box',
        'This box is of the type "Attention"',
        'attention'
      ),
      createBoxExample(
        'Yet another Box',
        'This box is of the type "Quote"',
        'quote'
      ),
    ].map((document, index) => (
      <BoxStaticRenderer key={index} {...document} />
    ))}
  </>
)

export const FillInTheGapExample = (
  <div className="flex flex-col gap-2 pt-2">
    <h1 className="ml-[32px] text-xl font-bold">Typing</h1>
    <StaticRenderer
      document={parseDocumentString(
        '{"plugin":"blanksExercise","state":{"text":{"plugin":"text","state":[{"type":"p","children":[{"text":"Whales are the biggest "},{"type":"textBlank","blankId":"9070d7e2-f087-41f7-bb65-a7a05c643c88","correctAnswers":[{"answer":"mammals"}],"acceptMathEquivalents":false,"children":[{"text":""}]},{"text":" in the world. They communicate over long "},{"type":"textBlank","blankId":"3b0cfadb-eae6-48dd-aa08-18fa21686405","correctAnswers":[{"answer":"distances"}, {"answer":"distance"}],"acceptMathEquivalents":false,"children":[{"text":""}]},{"text":" through long songs up to thousands of kilometers."}]}]},"mode":"typing"}}'
      )}
    />
    <h1 className="ml-[32px] text-xl font-bold">Drag & Drop</h1>
    <StaticRenderer
      document={parseDocumentString(
        '{"plugin":"blanksExercise","state":{"text":{"plugin":"text","state":[{"type":"p","children":[{"text":"Some species of spiders are able to detect "},{"type":"textBlank","blankId":"1070e7e2-f087-41f7-bb65-a7a05c643c88","correctAnswers":[{"answer":"magnetic fields"}],"acceptMathEquivalents":false,"children":[{"text":""}]},{"text":" . They also have extraordinary "},{"type":"textBlank","blankId":"ab0cfadb-eae6-48dd-aa08-18fa21686402","correctAnswers":[{"answer":"sensory abilities"}],"acceptMathEquivalents":false,"children":[{"text":""}]},{"text":" in their leg hairs and have special receptors to detect even the slightest "},{"type":"textBlank","blankId":"8a0cfadb-eae6-48dd-aa08-18fa21686405","correctAnswers":[{"answer":"vibrations"}],"acceptMathEquivalents":false,"children":[{"text":""}]},{"text":" and air currents to identify their prey and predators."}]}]},"mode":"drag-and-drop"}}'
      )}
    />
    <h1 className="ml-side text-xl font-bold">
      Exercise with table drag & drop
    </h1>
    <StaticRenderer
      document={parseDocumentString(
        '{"plugin":"rows","state":[{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Vervollständige die Vierfeldertafel. Die Wahrscheinlichkeit "},{"type":"math","src":"P(A~\\\\cap~B)","inline":true,"children":[{"text":""}]},{"text":" beträgt "},{"type":"math","src":"21~\\\\%","inline":true,"children":[{"text":""}]},{"text":"."}]}]}]},"interactive":{"plugin":"blanksExercise","state":{"text":{"plugin":"serloTable","state":{"rows":[{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"A","inline":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"\\\\bar{A}","inline":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"B","inline":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"textBlank","blankId":"16c4d09d-a4d5-4792-b975-4594700b8486","correctAnswers":[{"answer":"21 %"}],"acceptMathEquivalents":true,"children":[{"text":""}]},{"text":" "}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"14~\\\\%","inline":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"textBlank","blankId":"884597fa-ea00-47da-8404-eb7db26512de","correctAnswers":[{"answer":"35 %"}],"acceptMathEquivalents":true,"children":[{"text":""}]},{"text":" "}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"\\\\bar{B}","inline":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"19 ~\\\\%","inline":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"textBlank","blankId":"b85fde19-284e-457c-b054-8ea42180f933","correctAnswers":[{"answer":"46 %"}],"acceptMathEquivalents":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"textBlank","blankId":"b91deb33-3c1f-4b27-9d89-59f0bdc94e48","correctAnswers":[{"answer":"65 %"}],"acceptMathEquivalents":true,"children":[{"text":""}]},{"text":""}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"textBlank","blankId":"5bccafac-d0d2-46e7-a737-bb3e462d4218","correctAnswers":[{"answer":"40 %"}],"acceptMathEquivalents":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"textBlank","blankId":"80a57af9-e968-4ead-8c06-6a9183be0e10","correctAnswers":[{"answer":"60 %"}],"acceptMathEquivalents":true,"children":[{"text":""}]},{"text":""}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"100~\\\\%","inline":true,"children":[{"text":""}]},{"text":""}]}]}}]}],"tableType":"RowAndColumnHeader"}},"mode":"drag-and-drop"}},"solution":{"plugin":"solution","state":{"strategy":{"plugin":"text","state":[{"children":[{"children":[{"type":"list-item-child","children":[{"text":"Setze für die Wahrscheinlichkeit "},{"type":"math","src":"","inline":true,"children":[{"text":""}]},{"text":""},{"type":"math","src":"P(A\\\\cap B)","inline":true,"children":[{"text":""}]},{"text":" "},{"type":"math","src":"21~\\\\%","inline":true,"children":[{"text":""}]},{"text":" ein."}]}],"type":"list-item"},{"children":[{"type":"list-item-child","children":[{"text":"Berechne die fehlenden Werte in den Zeilen und Spalten. Die Summe der Werte im Inneren der "},{"type":"a","href":"/1875","children":[{"text":"Tafel"}]},{"text":" ergeben den Wert am Rand der Tafel."}]}],"type":"list-item"}],"type":"unordered-list"}]},"steps":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"h","children":[{"text":"Ausgefüllte Vierfeldertafel"}],"level":3}]},{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Die Wahrscheinlichkeit "},{"type":"math","src":"P(A\\\\cap B)","inline":true,"children":[{"text":""}]},{"text":" beträgt nach Angabe "},{"type":"math","src":"21~\\\\%","inline":true,"children":[{"text":""}]},{"text":". Diese tragen wir in die Tafel ein."}]}]}]},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/8d7f6370-18e8-11ef-890b-238e2c9e9d69/image.png","caption":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}]}}},"illustrating":true,"width":50}},{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"In jeder Zeile und Spalte gilt:"}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":"Die Werte im Inneren der Tafel ergeben als "},{"text":"Summe","strong":true},{"text":" den Wert am Rand."}]},{"type":"p","children":[{"text":""}]}]}]},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/e427af20-18e8-11ef-890b-238e2c9e9d69/image.png","caption":{"plugin":"text","state":[{"type":"p","children":[{"text":"Ausfüllen der Zeilen und Spalten"}]}]}}},"illustrating":true,"width":50}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Damit kann die Tafel vollständig ausgefüllt werden:"}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/20e463e0-18e9-11ef-890b-238e2c9e9d69/image.png","caption":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]}]}}}]},"prerequisite":{"id":"1875","title":"Vierfeldertafel"}}}}}]}'
      )}
    />
  </div>
)

export const InputExample = (
  <div className="pt-2">
    <StaticRenderer
      document={parseDocumentString(
        '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"There are "},{"type":"math","src":"13 ","inline":true,"children":[{"text":"13"}]},{"text":" boys and "},{"type":"math","src":"11 ","inline":true,"children":[{"text":"11"}]},{"text":" girls in class 5b. How many children are in the class in total?"}]}]}]},"interactive":{"plugin":"inputExercise","state":{"type":"input-string-normalized-match-challenge","unit":"","answers":[{"value":"24","isCorrect":true,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Great job!"}]}]}},{"value":"25","isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Almost..."}]}]}},{"value":"2","isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"You have to take the sum and not the difference."}]}]}},{"value":"","isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Almost..."}]}]}}]}}}}'
      )}
    />
    <StaticRenderer
      document={parseDocumentString(
        '{"plugin":"solution","state":{"prerequisite":{"id":"138148","title":"Addition"},"strategy":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"steps":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Add the number of boys and the number of girls:"}]},{"type":"p","children":[{"text":""},{"type":"math","src":"13+11=24","inline":true,"children":[{"text":""}]},{"text":""}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"There are "},{"type":"math","src":"24 ","inline":true,"children":[{"text":"24"}]},{"text":" children in the class."}]}]}]}}}'
      )}
    />
  </div>
)

export const TextExerciseExample = (
  <div className="pt-2">
    <StaticRenderer
      document={parseDocumentString(
        '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"The drawbridge of a castle is "},{"type":"math","src":"8m","inline":true,"children":[{"text":"8m"}]},{"text":" long and has an angle of "},{"type":"math","src":"43^\\\\circ","inline":true,"children":[{"text":"43^\\\\circ"}]},{"text":" between the wall and the chain. How long must a chain be that can be used to fold down the drawbridge?"}]}]}]},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/1840.png","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},"illustrating":true,"width":50}}]}}}'
      )}
    />
    <StaticRenderer
      document={parseDocumentString(
        '{"plugin":"solution","state":{"prerequisite":{"id":"228138","title":"Sine, Cosine and Tangent"},"strategy":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"steps":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Determine the chain length "},{"type":"math","src":"k","inline":true,"children":[{"text":"k"}]},{"text":" using the sine."}]}]},{"plugin":"equations","state":{"transformationTarget":"equation","firstExplanation":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"steps":[{"left":"\\\\sin\\\\left(43°\\\\right)","sign":"equals","right":"\\\\frac{8\\\\text{m}}{k}","transform":"\\\\cdot k","explanation":{"plugin":"text","state":[{"type":"p","children":[{}]}]}},{"left":"\\\\sin\\\\left(43°\\\\right)\\\\cdot k","sign":"equals","right":"8\\\\ \\\\text{m}\\\\ ","transform":"\\\\ :\\\\sin\\\\left(43°\\\\right)","explanation":{"plugin":"text","state":[{"type":"p","children":[{}]}]}},{"left":"k","sign":"equals","right":"\\\\frac{8\\\\text{m}}{\\\\sin\\\\left(43°\\\\right)}","transform":"","explanation":{"plugin":"text","state":[{"type":"p","children":[{}]}]}},{"left":"k","sign":"almost-equal-to","right":"11.7\\\\text{m}\\\\ ","transform":"","explanation":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}]}},{"plugin":"text","state":[{"type":"p","children":[{"text":"The chain must be about "},{"type":"math","src":"11.7 m","inline":true,"children":[{"text":"11.7 m"}]},{"text":" long so that you can lower the drawbridge."}]}]}]}}}'
      )}
    />
  </div>
)

export const SCExample = (
  <div className="pt-3.5">
    <StaticRenderer
      document={parseDocumentString(
        '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"What is the value of "},{"type":"math","src":"3x + 5","inline":true,"children":[{"text":"3x + 5"}]},{"text":" when "},{"type":"math","src":"x = 2","inline":true,"children":[{"text":"x = 2"}]},{"text":"?"}]}]}]},"interactive":{"plugin":"scMcExercise","state":{"isSingleChoice":true,"answers":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"11"}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"When X is substituted, its value gets "},{"text":"multiplied ","strong":true},{"text":"with 3."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"10"}]}]},"isCorrect":true,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Great!"}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"9"}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Try again!"}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"8"}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"You need to substitute x with 2!"}]}]}}]}}}}'
      )}
    />
  </div>
)

export const MCExample = (
  <div className="pt-2">
    <StaticRenderer
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
  <>
    <div className="slate-container mb-block">
      <h4 className="serlo-h4">
        <StaticMath
          type="math"
          src="23+19= 23 +(17+2)=(23+17)+2=40+2=42"
          inline
        />
      </h4>
    </div>
    <SpoilerRenderer
      title={<>There are also other ways to split the summands:</>}
      content={
        <div className="serlo-spoiler-body motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-8">
          <div className="slate-container mb-block">
            <p className="slate-p serlo-p mb-0 min-h-[1.33em]">
              <StaticMath
                type="math"
                src="23+19=(21+2)+19=(21+19)+2=40+2=42"
                inline
              />
            </p>
          </div>
        </div>
      }
    />
  </>
)
