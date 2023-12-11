import dynamic from 'next/dynamic'

import type { BoxType } from '@/serlo-editor/plugins/box/renderer'
import { BoxStaticRenderer } from '@/serlo-editor/plugins/box/static'
import { HighlightRenderer } from '@/serlo-editor/plugins/highlight/renderer'
import { SpoilerRenderer } from '@/serlo-editor/plugins/spoiler/renderer'
import type { StaticMathProps } from '@/serlo-editor/plugins/text/static-components/static-math'
import { parseDocumentString } from '@/serlo-editor/static-renderer/helper/parse-document-string'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'
import type { EditorBoxDocument } from '@/serlo-editor/types/editor-plugins'

const StaticMath = dynamic<StaticMathProps>(() =>
  import('@/serlo-editor/plugins/text/static-components/static-math').then(
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

export const boxExample = (
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

export const inputExample = (
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

export const textExExample = (
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
        '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"If I had worn my glasses, I ______________(not step) on the toys."}]}]}]},"interactive":{"plugin":"scMcExercise","state":{"isSingleChoice":true,"answers":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"would not have stepped"}]}]},"isCorrect":true,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"The past perfect "},{"text":"had worn ","strong":true},{"text":"in the subordinate clause, indicates that this is "},{"text":"type III if clause","strong":true},{"text":". Therefore you need to use "},{"text":"would not + present perfect","strong":true},{"text":" in the main clause."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"will not have stepped"}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"This is the "},{"text":"future perfect","strong":true},{"text":" and not used in "},{"text":"if clauses","strong":true},{"text":"."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"will not step"}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"The past perfect "},{"text":"had worn ","strong":true},{"text":"in the subordinate clause, indicates that this is "},{"text":"type III if clause","strong":true},{"text":". W"},{"text":"ill + infinitive","strong":true},{"text":" is used in "},{"text":"type I if clauses","strong":true},{"text":" and therefore wrong in this case."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"would not step"}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"The past perfect "},{"text":"had worn ","strong":true},{"text":"in the subordinate clause, indicates that this is "},{"text":"type III if clause","strong":true},{"text":". "},{"text":"would + infinitive","strong":true},{"text":" is used in "},{"text":"type II if clauses","strong":true},{"text":" and therefore wrong in this case."}]}]}}]}}}}'
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

export const highlighExample = (
  <HighlightRenderer
    code={`// global variable: read & write from everywhere
var cookieAmount = 100

// local variable: read & write from everywhere only in current code block
// (only in the "feed" function)
function feed(){
  let cookieAmount = 20
}

// constant: local variable that can only be read after initialisation
// this will always be 5
const cookieSize = 5`}
    language="javascript"
    showLineNumbers
  />
)

export const spoilerExample = (
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
