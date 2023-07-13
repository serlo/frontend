import { Box } from '@/components/content/box'
import { Equations } from '@/components/content/equations'
import { Exercise } from '@/components/content/exercises/exercise'
import { MathSpan } from '@/components/content/math-span'
import { Multimedia } from '@/components/content/multimedia'
import { Spoiler } from '@/components/content/spoiler'
import { FrontendNodeType } from '@/frontend-node-types'
import { renderNested } from '@/schema/article-renderer'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import { Sign } from '@/serlo-editor/plugins/equations/sign'
import { HighlightRenderer } from '@/serlo-editor/plugins/highlight/renderer'
import { InjectionRenderer } from '@/serlo-editor/plugins/injection/renderer'

export const boxExample = (
  <>
    <Box
      boxType="note"
      title={[
        {
          type: FrontendNodeType.SlateP,
          children: [{ type: FrontendNodeType.Text, text: 'A Box' }],
        },
      ]}
      anchorId="box77874"
      renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
      // eslint-disable-next-line react/no-children-prop
      children={[
        {
          type: FrontendNodeType.SlateContainer,
          children: [
            {
              type: FrontendNodeType.SlateP,
              children: [
                {
                  type: FrontendNodeType.Text,
                  text: 'This box is of the type "Note"',
                },
              ],
            },
          ],
        },
      ]}
      type={FrontendNodeType.Box}
    />
    <Box
      boxType="attention"
      title={[
        {
          type: FrontendNodeType.SlateP,
          children: [{ type: FrontendNodeType.Text, text: 'Another Box' }],
        },
      ]}
      anchorId="box77874"
      renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
      // eslint-disable-next-line react/no-children-prop
      children={[
        {
          type: FrontendNodeType.SlateContainer,
          children: [
            {
              type: FrontendNodeType.SlateP,
              children: [
                {
                  type: FrontendNodeType.Text,
                  text: 'This box is of the type "Attention"',
                },
              ],
            },
          ],
        },
      ]}
      type={FrontendNodeType.Box}
    />
    <Box
      boxType="quote"
      title={[
        {
          type: FrontendNodeType.SlateP,
          children: [{ type: FrontendNodeType.Text, text: 'Yet another Box' }],
        },
      ]}
      anchorId="box77874"
      renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
      // eslint-disable-next-line react/no-children-prop
      children={[
        {
          type: FrontendNodeType.SlateContainer,
          children: [
            {
              type: FrontendNodeType.SlateP,
              children: [
                {
                  type: FrontendNodeType.Text,
                  text: 'This box is of the type "Quote"',
                },
              ],
            },
          ],
        },
      ]}
      type={FrontendNodeType.Box}
    />
  </>
)

export const multimediaExample = (
  <Multimedia
    mediaWidth={50}
    media={[
      {
        type: FrontendNodeType.Image,
        src: 'https://assets.serlo.org/629480521269f_75475afecab129c4c7f203b3ce88f53416bf9946.jpg',
        alt: 'Illustration des Endoplasmatischen Retikulums',
      },
    ]}
    // eslint-disable-next-line react/no-children-prop
    children={[
      {
        type: FrontendNodeType.SlateContainer,
        children: [
          {
            type: FrontendNodeType.SlateP,
            children: [
              { type: FrontendNodeType.Text, text: 'Das ' },
              {
                type: FrontendNodeType.Text,
                text: 'Endoplasmatische Retikulum (ER)',
                strong: true,
              },
              {
                type: FrontendNodeType.Text,
                text: ' ist ein großes Labyrinth aus abgeflachten und miteinander verbundenen Membransäckchen (Zisternen). Es steht in direkter Verbindung mit der ',
              },
              {
                type: FrontendNodeType.A,
                href: '/biologie/77992/der-zellkern',
                children: [
                  { type: FrontendNodeType.Text, text: 'Kernmembran' },
                ],
              },
              { type: FrontendNodeType.Text, text: ' und ist an zahlreichen ' },
              {
                type: FrontendNodeType.Text,
                text: 'Stoffwechselvorgängen',
                strong: true,
              },
              { type: FrontendNodeType.Text, text: ' beteiligt.' },
            ],
          },
        ],
      },
    ]}
    renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
    type={FrontendNodeType.Multimedia}
  />
)

export const inputExample = (
  <Exercise
    renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
    path={[]}
    node={{
      type: FrontendNodeType.Exercise,
      grouped: false,
      trashed: false,
      task: {
        edtrState: {
          content: [
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [
                    { type: FrontendNodeType.Text, text: 'There are ' },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: '13 ',
                      formulaSource: '13 ',
                    },
                    { type: FrontendNodeType.Text, text: ' boys and ' },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: '11 ',
                      formulaSource: '11 ',
                    },
                    {
                      type: FrontendNodeType.Text,
                      text: ' girls in class 5b. How many children are in the class in total?',
                    },
                  ],
                },
              ],
            },
          ],
          interactive: {
            plugin: EditorPluginType.InputExercise,
            state: {
              type: 'input-string-normalized-match-challenge',
              unit: '',
              answers: [
                {
                  value: '24',
                  isCorrect: true,
                  feedback: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            { type: FrontendNodeType.Text, text: 'Great job!' },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  value: '25',
                  isCorrect: false,
                  feedback: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            { type: FrontendNodeType.Text, text: 'Almost...' },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  value: '2',
                  isCorrect: false,
                  feedback: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.Text,
                              text: 'You have to take the sum and not the difference.',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  value: '',
                  isCorrect: false,
                  feedback: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            { type: FrontendNodeType.Text, text: 'Almost...' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        license: {
          id: 9,
          url: 'https://creativecommons.org/licenses/by-sa/4.0/',
          title: 'This content is licensed under CC BY-SA 4.0',
          shortTitle: 'CC BY-SA 4.0',
          // agreement:
          //   'By saving this page, you confirm that your contribution (including any edits you have made) is your own work, and that it does not infringe on the rights of third parties. You consent to publishing your contribution under the <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution/Share-Alike License 4.0</a> and/or under an equivalent license chosen by the Serlo Education e.V. in accordance with the regulations laid out in the <a href="https://en.serlo.org/terms">terms of use</a>. Should the contribution not be your own work, it must be available in accordance with the <a href="https://en.serlo.org/terms">terms of use</a>, and you must agree to comply with any necessary license requests.',
          isDefault: true,
        },
      },
      solution: {
        edtrState: {
          prerequisite: {
            id: 138148,
            title: 'Addition',
            href: '/math/138148/addition',
          },
          strategy: [],
          steps: [
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [
                    {
                      type: FrontendNodeType.Text,
                      text: 'Add the number of boys and the number of girls:',
                    },
                  ],
                },
                {
                  type: FrontendNodeType.SlateP,
                  children: [
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: '13+11=24',
                      formulaSource: '13+11=24',
                    },
                  ],
                },
              ],
            },
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [
                    { type: FrontendNodeType.Text, text: 'There are ' },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: '24 ',
                      formulaSource: '24 ',
                    },
                    {
                      type: FrontendNodeType.Text,
                      text: ' children in the class.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        trashed: false,
        license: {
          id: 9,
          url: 'https://creativecommons.org/licenses/by-sa/4.0/',
          title: 'This content is licensed under CC BY-SA 4.0',
          shortTitle: 'CC BY-SA 4.0',
          // agreement:
          //   'By saving this page, you confirm that your contribution (including any edits you have made) is your own work, and that it does not infringe on the rights of third parties. You consent to publishing your contribution under the <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution/Share-Alike License 4.0</a> and/or under an equivalent license chosen by the Serlo Education e.V. in accordance with the regulations laid out in the <a href="https://en.serlo.org/terms">terms of use</a>. Should the contribution not be your own work, it must be available in accordance with the <a href="https://en.serlo.org/terms">terms of use</a>, and you must agree to comply with any necessary license requests.',
          isDefault: true,
        },
      },
      context: {
        id: 258549,
        solutionId: 258551,
        revisionId: 0,
      },
      href: '/math/258549/258549',
      unrevisedRevisions: 0,
    }}
  />
)

export const textExExample = (
  <Exercise
    renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
    path={[]}
    node={{
      type: FrontendNodeType.Exercise,
      grouped: false,
      trashed: false,
      task: {
        edtrState: {
          content: [
            {
              type: FrontendNodeType.Multimedia,
              mediaWidth: 50,
              media: [
                {
                  type: FrontendNodeType.Image,
                  src: 'https://assets.serlo.org/legacy/1840.png',
                  alt: '',
                  caption: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        { type: FrontendNodeType.SlateP, children: [] },
                      ],
                    },
                  ],
                },
              ],
              children: [
                {
                  type: FrontendNodeType.SlateContainer,
                  children: [
                    {
                      type: FrontendNodeType.SlateP,
                      children: [
                        {
                          type: FrontendNodeType.Text,
                          text: 'The drawbridge of a castle is ',
                        },
                        {
                          type: FrontendNodeType.InlineMath,
                          formula: '8m',
                          formulaSource: '8m',
                        },
                        {
                          type: FrontendNodeType.Text,
                          text: ' long and has an angle of ',
                        },
                        {
                          type: FrontendNodeType.InlineMath,
                          formula: '43^\\circ',
                          formulaSource: '43^\\circ',
                        },
                        {
                          type: FrontendNodeType.Text,
                          text: ' between the wall and the chain. How long must a chain be that can be used to fold down the drawbridge?',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        license: {
          id: 9,
          url: 'https://creativecommons.org/licenses/by-sa/4.0/',
          title: 'This content is licensed under CC BY-SA 4.0',
          shortTitle: 'CC BY-SA 4.0',
          // agreement:
          //   'By saving this page, you confirm that your contribution (including any edits you have made) is your own work, and that it does not infringe on the rights of third parties. You consent to publishing your contribution under the <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution/Share-Alike License 4.0</a> and/or under an equivalent license chosen by the Serlo Education e.V. in accordance with the regulations laid out in the <a href="https://en.serlo.org/terms">terms of use</a>. Should the contribution not be your own work, it must be available in accordance with the <a href="https://en.serlo.org/terms">terms of use</a>, and you must agree to comply with any necessary license requests.',
          isDefault: true,
        },
      },
      solution: {
        edtrState: {
          prerequisite: {
            id: 228138,
            title: 'Sine, Cosine and Tangent',
            href: '/math/228138/sine-cosine-and-tangent',
          },
          strategy: [],
          steps: [
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [
                    {
                      type: FrontendNodeType.Text,
                      text: 'Determine the chain length ',
                    },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: 'k',
                      formulaSource: 'k',
                    },
                    { type: FrontendNodeType.Text, text: ' using the sine.' },
                  ],
                },
              ],
            },
            {
              type: FrontendNodeType.Equations,
              steps: [
                {
                  left: '\\sin\\left(43°\\right)',
                  leftSource: '\\sin\\left(43°\\right)',
                  sign: Sign.Equals,
                  right: '\\frac{8\\text{m}}{k}',
                  rightSource: '\\frac{8\\text{m}}{k}',
                  transform: '\\cdot k',
                  // transformSource: '\\cdot k',
                  explanation: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        { type: FrontendNodeType.SlateP, children: [] },
                      ],
                    },
                  ],
                },
                {
                  left: '\\sin\\left(43°\\right)\\cdot k',
                  leftSource: '\\sin\\left(43°\\right)\\cdot k',
                  sign: Sign.Equals,
                  right: '8\\ \\text{m}\\ ',
                  rightSource: '8\\ \\text{m}\\ ',
                  transform: '\\ :\\sin\\left(43°\\right)',
                  // transformSource: '\\ :\\sin\\left(43°\\right)',
                  explanation: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        { type: FrontendNodeType.SlateP, children: [] },
                      ],
                    },
                  ],
                },
                {
                  left: 'k',
                  leftSource: 'k',
                  sign: Sign.Equals,
                  right: '\\frac{8\\text{m}}{\\sin\\left(43°\\right)}',
                  rightSource: '\\frac{8\\text{m}}{\\sin\\left(43°\\right)}',
                  transform: '',
                  // transformSource: '',
                  explanation: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        { type: FrontendNodeType.SlateP, children: [] },
                      ],
                    },
                  ],
                },
                {
                  left: 'k',
                  leftSource: 'k',
                  sign: Sign.AlmostEqualTo,
                  right: '11.7\\text{m}\\ ',
                  rightSource: '11.7\\text{m}\\ ',
                  transform: '',
                  // transformSource: '',
                  explanation: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        { type: FrontendNodeType.SlateP, children: [] },
                      ],
                    },
                  ],
                },
              ],
              firstExplanation: [
                {
                  type: FrontendNodeType.SlateContainer,
                  children: [{ type: FrontendNodeType.SlateP, children: [] }],
                },
              ],
              transformationTarget: 'equation',
            },
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [
                    {
                      type: FrontendNodeType.Text,
                      text: 'The chain must be about ',
                    },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: '11.7 m',
                      formulaSource: '11.7 m',
                    },
                    {
                      type: FrontendNodeType.Text,
                      text: ' long so that you can lower the drawbridge.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        trashed: false,
        license: {
          id: 9,
          url: 'https://creativecommons.org/licenses/by-sa/4.0/',
          title: 'This content is licensed under CC BY-SA 4.0',
          shortTitle: 'CC BY-SA 4.0',
          // agreement:
          //   'By saving this page, you confirm that your contribution (including any edits you have made) is your own work, and that it does not infringe on the rights of third parties. You consent to publishing your contribution under the <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution/Share-Alike License 4.0</a> and/or under an equivalent license chosen by the Serlo Education e.V. in accordance with the regulations laid out in the <a href="https://en.serlo.org/terms">terms of use</a>. Should the contribution not be your own work, it must be available in accordance with the <a href="https://en.serlo.org/terms">terms of use</a>, and you must agree to comply with any necessary license requests.',
          isDefault: true,
        },
      },
      context: {
        id: 228988,
        solutionId: 228989,
        revisionId: 0,
      },
      href: '/math/228988/228988',
      unrevisedRevisions: 0,
    }}
  />
)

export const SCExample = (
  <Exercise
    renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
    path={[]}
    node={{
      type: FrontendNodeType.Exercise,
      grouped: false,
      trashed: false,
      task: {
        edtrState: {
          content: [
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [
                    {
                      type: FrontendNodeType.Text,
                      text: 'If I had worn my glasses, I ______________(not step) on the toys.',
                    },
                  ],
                },
              ],
            },
          ],
          interactive: {
            plugin: EditorPluginType.ScMcExercise,
            state: {
              isSingleChoice: true,
              answers: [
                {
                  content: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.Text,
                              text: 'would not step',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  isCorrect: false,
                  feedback: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.Text,
                              text: 'The past perfect ',
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'had worn ',
                              strong: true,
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'in the subordinate clause, indicates that this is ',
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'type III if clause',
                              strong: true,
                            },
                            { type: FrontendNodeType.Text, text: '. ' },
                            {
                              type: FrontendNodeType.Text,
                              text: 'would + infinitive',
                              strong: true,
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: ' is used in ',
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'type II if clauses',
                              strong: true,
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: ' and therefore wrong in this case.',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  originalIndex: 3,
                },
                {
                  content: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.Text,
                              text: 'will not have stepped',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  isCorrect: false,
                  feedback: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.Text,
                              text: 'This is the ',
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'future perfect',
                              strong: true,
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: ' and not used in ',
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'if clauses',
                              strong: true,
                            },
                            { type: FrontendNodeType.Text, text: '.' },
                          ],
                        },
                      ],
                    },
                  ],
                  originalIndex: 1,
                },
                {
                  content: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.Text,
                              text: 'will not step',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  isCorrect: false,
                  feedback: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.Text,
                              text: 'The past perfect ',
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'had worn ',
                              strong: true,
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'in the subordinate clause, indicates that this is ',
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'type III if clause',
                              strong: true,
                            },
                            { type: FrontendNodeType.Text, text: '. W' },
                            {
                              type: FrontendNodeType.Text,
                              text: 'ill + infinitive',
                              strong: true,
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: ' is used in ',
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'type I if clauses',
                              strong: true,
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: ' and therefore wrong in this case.',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  originalIndex: 2,
                },
                {
                  content: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.Text,
                              text: 'would not have stepped',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  isCorrect: true,
                  feedback: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.Text,
                              text: 'The past perfect ',
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'had worn ',
                              strong: true,
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'in the subordinate clause, indicates that this is ',
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'type III if clause',
                              strong: true,
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: '. Therefore you need to use ',
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: 'would not + present perfect',
                              strong: true,
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: ' in the main clause.',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  originalIndex: 0,
                },
              ],
            },
          },
        },
        license: {
          id: 1,
          url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
          title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0.',
          shortTitle: 'CC BY-SA 4.0',
          // agreement:
          //   'Mit dem Speichern dieser Seite versicherst du, dass du deinen Beitrag (damit sind auch Änderungen gemeint) selbst verfasst hast bzw. dass er keine fremden Rechte verletzt. Du willigst ein, deinen Beitrag unter der <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.de">Creative Commons Attribution/Share-Alike Lizenz 4.0</a> und/oder unter einer gleichwertigen Lizenz zu veröffentlichen, welche der Serlo Education e. V. entsprechend der Regelungen in den <a href="/21654">Nutzungsbedingungen</a> festlegen darf. Falls du den Beitrag nicht selbst verfasst hast, muss er unter den <a href="/21654">Nutzungsbedingungen</a> verfügbar sein und du stimmst zu, notwendigen Lizenzanforderungen zu folgen.',
          isDefault: true,
        },
      },
      solution: {
        trashed: false,
        license: {
          id: 1,
          url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
          title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0.',
          shortTitle: 'CC BY-SA 4.0',
          // agreement:
          //   'Mit dem Speichern dieser Seite versicherst du, dass du deinen Beitrag (damit sind auch Änderungen gemeint) selbst verfasst hast bzw. dass er keine fremden Rechte verletzt. Du willigst ein, deinen Beitrag unter der <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.de">Creative Commons Attribution/Share-Alike Lizenz 4.0</a> und/oder unter einer gleichwertigen Lizenz zu veröffentlichen, welche der Serlo Education e. V. entsprechend der Regelungen in den <a href="/21654">Nutzungsbedingungen</a> festlegen darf. Falls du den Beitrag nicht selbst verfasst hast, muss er unter den <a href="/21654">Nutzungsbedingungen</a> verfügbar sein und du stimmst zu, notwendigen Lizenzanforderungen zu folgen.',
          isDefault: true,
        },
      },
      context: {
        id: 264021,
        solutionId: 264023,
        revisionId: 0,
      },
      href: '/f%C3%A4cher-im-aufbau/264021/264021',
      unrevisedRevisions: 0,
    }}
  />
)

export const MCExample = (
  <Exercise
    renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
    path={[]}
    node={{
      type: FrontendNodeType.Exercise,
      grouped: false,
      trashed: false,
      task: {
        edtrState: {
          content: [
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [
                    {
                      type: FrontendNodeType.Text,
                      text: 'Consider on the unit circle: For which angles between ',
                    },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: '0^\\circ',
                      formulaSource: '0^\\circ',
                    },
                    { type: FrontendNodeType.Text, text: ' and ' },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: '360^\\circ',
                      formulaSource: '360^\\circ',
                    },
                    { type: FrontendNodeType.Text, text: ' you have ' },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: '\\sin\\left(\\alpha\\right)=0.5',
                      formulaSource: '\\sin\\left(\\alpha\\right)=0.5',
                    },
                    { type: FrontendNodeType.Text, text: '?' },
                  ],
                },
              ],
            },
          ],
          interactive: {
            plugin: EditorPluginType.ScMcExercise,
            state: {
              isSingleChoice: false,
              answers: [
                {
                  content: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.InlineMath,
                              formula: '\\alpha = 60^\\circ',
                              formulaSource: '\\alpha = 60^\\circ',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  isCorrect: false,
                  feedback: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.Text,
                              text: 'Here, you have ',
                            },
                            {
                              type: FrontendNodeType.InlineMath,
                              formula: ' \\cos(\\alpha) = 0.5',
                              formulaSource: ' \\cos(\\alpha) = 0.5',
                            },
                            { type: FrontendNodeType.Text, text: '.' },
                          ],
                        },
                      ],
                    },
                  ],
                  originalIndex: 2,
                },
                {
                  content: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.InlineMath,
                              formula: '\\alpha = 150^\\circ',
                              formulaSource: '\\alpha = 150^\\circ',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  isCorrect: true,
                  feedback: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            { type: FrontendNodeType.Text, text: 'Correct!' },
                          ],
                        },
                      ],
                    },
                  ],
                  originalIndex: 3,
                },
                {
                  content: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.InlineMath,
                              formula: '\\alpha = 45^\\circ',
                              formulaSource: '\\alpha = 45^\\circ',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  isCorrect: false,
                  feedback: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.Text,
                              text: 'Nope! Even though this angle cuts the ',
                            },
                            {
                              type: FrontendNodeType.InlineMath,
                              formula: '90^\\circ',
                              formulaSource: '90^\\circ',
                            },
                            {
                              type: FrontendNodeType.Text,
                              text: ' - angle in half, the sine is not ',
                            },
                            {
                              type: FrontendNodeType.InlineMath,
                              formula: '\\tfrac 12',
                              formulaSource: '\\tfrac 12',
                            },
                            { type: FrontendNodeType.Text, text: ', but ' },
                            {
                              type: FrontendNodeType.InlineMath,
                              formula: '\\tfrac{\\sqrt{2}}{2}',
                              formulaSource: '\\tfrac{\\sqrt{2}}{2}',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  originalIndex: 1,
                },
                {
                  content: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            {
                              type: FrontendNodeType.InlineMath,
                              formula: '\\alpha=30^{\\circ}',
                              formulaSource: '\\alpha=30^{\\circ}',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  isCorrect: true,
                  feedback: [
                    {
                      type: FrontendNodeType.SlateContainer,
                      children: [
                        {
                          type: FrontendNodeType.SlateP,
                          children: [
                            { type: FrontendNodeType.Text, text: 'Correct!' },
                          ],
                        },
                      ],
                    },
                  ],
                  originalIndex: 0,
                },
              ],
            },
          },
        },
        license: {
          id: 9,
          url: 'https://creativecommons.org/licenses/by-sa/4.0/',
          title: 'This content is licensed under CC BY-SA 4.0',
          shortTitle: 'CC BY-SA 4.0',
          // agreement:
          //   'By saving this page, you confirm that your contribution (including any edits you have made) is your own work, and that it does not infringe on the rights of third parties. You consent to publishing your contribution under the <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution/Share-Alike License 4.0</a> and/or under an equivalent license chosen by the Serlo Education e.V. in accordance with the regulations laid out in the <a href="https://en.serlo.org/terms">terms of use</a>. Should the contribution not be your own work, it must be available in accordance with the <a href="https://en.serlo.org/terms">terms of use</a>, and you must agree to comply with any necessary license requests.',
          isDefault: true,
        },
      },
      solution: { trashed: false },
      context: {
        id: 228897,
        revisionId: 0,
      },
      href: '/math/228897/228897',
      unrevisedRevisions: 0,
    }}
  />
)

export const formulaExample = (
  <Equations
    renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
    {...{
      steps: [
        {
          left: '\\int_1^e\\frac{x^2+2x+3}{2x}\\ \\mathrm{d}x',
          // leftSource: '\\int_1^e\\frac{x^2+2x+3}{2x}\\ \\mathrm{d}x',
          sign: Sign.Equals,
          right:
            '\\int_1^e\\left(\\frac{x^2}{2x}+\\frac{2x}{2x}+\\frac{3}{2x}\\right)\\ \\mathrm{d}x',
          // rightSource:
          // '\\int_1^e\\left(\\frac{x^2}{2x}+\\frac{2x}{2x}+\\frac{3}{2x}\\right)\\ \\mathrm{d}x',
          transform: '',
          // transformSource: '',
          explanation: [
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [],
                },
              ],
            },
          ],
        },
        {
          left: '',
          // leftSource: '',
          sign: Sign.Equals,
          right:
            '\\int_1^e\\left(\\frac{1}{2}x+1+\\frac{3}{2}\\cdot\\frac{1}{x}\\right)\\ \\mathrm{d}x',
          // rightSource:
          //   '\\int_1^e\\left(\\frac{1}{2}x+1+\\frac{3}{2}\\cdot\\frac{1}{x}\\right)\\ \\mathrm{d}x',
          transform: '',
          // transformSource: '',
          explanation: [
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [
                    {
                      type: FrontendNodeType.A,
                      href: '/1595',
                      children: [
                        {
                          type: FrontendNodeType.Text,
                          text: 'Integriere',
                        },
                      ],
                    },
                    {
                      type: FrontendNodeType.Text,
                      text: '. Die Stammfunktion von ',
                    },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: '\\frac1x',
                      formulaSource: '\\frac1x',
                    },
                    {
                      type: FrontendNodeType.Text,
                      text: ' ist ',
                    },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: '\\ln x',
                      formulaSource: '\\ln x',
                    },
                    {
                      type: FrontendNodeType.Text,
                      text: '.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          left: '',
          // leftSource: '',
          sign: Sign.Equals,
          right:
            '\\left[\\frac{1}{2\\cdot2}x^2+x+\\frac{3}{2}\\ln x\\right]_1^e',
          // rightSource:
          //   '\\left[\\frac{1}{2\\cdot2}x^2+x+\\frac{3}{2}\\ln x\\right]_1^e',
          transform: '',
          // transformSource: '',
          explanation: [
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [
                    {
                      type: FrontendNodeType.Text,
                      text: 'In die Klammer wird für ',
                    },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: 'x',
                      formulaSource: 'x',
                    },
                    {
                      type: FrontendNodeType.Text,
                      text: ' der obere Wert ',
                    },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: '(e)',
                      formulaSource: '(e)',
                    },
                    {
                      type: FrontendNodeType.Text,
                      text: ' eingesetzt und minus die Klammer mit dem unteren Wert 1 gerechnet.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          left: '',
          // leftSource: '',
          sign: Sign.Equals,
          right:
            '\\left(\\frac{1}{4}e^2+e+\\frac{3}{2}\\ln e\\right)-\\left(\\frac{1}{4}1^2+1+\\frac{3}{2}\\ln1\\right)',
          // rightSource:
          //   '\\left(\\frac{1}{4}e^2+e+\\frac{3}{2}\\ln e\\right)-\\left(\\frac{1}{4}1^2+1+\\frac{3}{2}\\ln1\\right)',
          transform: '',
          // transformSource: '',
          explanation: [
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [
                    {
                      type: FrontendNodeType.Text,
                      text: 'Löse die Klammern auf. Dabei ist ',
                    },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: '\\ln e=1',
                      formulaSource: '\\ln e=1',
                    },
                    {
                      type: FrontendNodeType.Text,
                      text: ' und ',
                    },
                    {
                      type: FrontendNodeType.InlineMath,
                      formula: '\\ln1=0',
                      formulaSource: '\\ln1=0',
                    },
                    {
                      type: FrontendNodeType.Text,
                      text: '.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          left: '',
          // leftSource: '',
          sign: Sign.Equals,
          right: '\\frac{e^2}{4}+e+\\frac{3}{2}-\\frac{1}{4}-1',
          // rightSource: '\\frac{e^2}{4}+e+\\frac{3}{2}-\\frac{1}{4}-1',
          transform: '',
          // transformSource: '',
          explanation: [
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [
                    {
                      type: FrontendNodeType.Text,
                      text: 'Gleiche Elemente zusammenfassen.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          left: '',
          // leftSource: '',
          sign: Sign.Equals,
          right: '\\frac{e^2}{4}+e+\\frac{1}{4}',
          // rightSource: '\\frac{e^2}{4}+e+\\frac{1}{4}',
          transform: '',
          // transformSource: '',
          explanation: [
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [],
                },
              ],
            },
          ],
        },
        {
          left: '',
          // leftSource: '',
          sign: Sign.AlmostEqualTo,
          right: '4{,}8155',
          // rightSource: '4,8155',
          transform: '',
          // transformSource: '',
          explanation: [
            {
              type: FrontendNodeType.SlateContainer,
              children: [
                {
                  type: FrontendNodeType.SlateP,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
      firstExplanation: [
        {
          type: FrontendNodeType.SlateContainer,
          children: [
            {
              type: FrontendNodeType.SlateP,
              children: [],
            },
          ],
        },
      ],
      transformationTarget: 'equation',
    }}
  />
)

export const injectionExample = (
  <>
    <h1 className="serlo-h1 mt-12">Haus der Vierecke</h1>
    <InjectionRenderer
      href="/71317"
      renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
    />
    <style jsx global>
      {`
        .serlo-ul {
          position: relative;
        }
      `}
    </style>
  </>
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
        <MathSpan formula="23+19= 23 +(17+2)=(23+17)+2=40+2=42" />
      </h4>
    </div>
    <Spoiler
      title="There are also other ways to split the summands:"
      body={
        <div className="serlo-spoiler-body motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-8">
          <div className="slate-container mb-block">
            <p className="slate-p serlo-p mb-0 min-h-[1.33em]">
              <MathSpan formula="23+19=(21+2)+19=(21+19)+2=40+2=42" />
            </p>
          </div>
        </div>
      }
    />
  </>
)
