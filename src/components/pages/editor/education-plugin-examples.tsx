// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck imported data (would actually interesting to see why some of is data is actually not valid )
import { Box } from '@/components/content/box'
import { Code } from '@/components/content/code'
import { Equations } from '@/components/content/equations'
import { Exercise } from '@/components/content/exercises/exercise'
import { Injection } from '@/components/content/injection'
import { MathSpan } from '@/components/content/math-span'
import { Multimedia } from '@/components/content/multimedia'
import { Spoiler } from '@/components/content/spoiler'
import { renderNested } from '@/schema/article-renderer'

export const boxExample = (
  <>
    <Box
      boxType="note"
      title={[{ type: 'slate-p', children: [{ type: 'text', text: 'A Box' }] }]}
      anchorId="box77874"
      renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
      // eslint-disable-next-line react/no-children-prop
      children={[
        {
          type: 'slate-container',
          children: [
            {
              type: 'slate-p',
              children: [
                { type: 'text', text: 'This box is of the type "Note"' },
              ],
            },
          ],
        },
      ]}
    />
    <Box
      boxType="attention"
      title={[
        { type: 'slate-p', children: [{ type: 'text', text: 'Another Box' }] },
      ]}
      anchorId="box77874"
      renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
      // eslint-disable-next-line react/no-children-prop
      children={[
        {
          type: 'slate-container',
          children: [
            {
              type: 'slate-p',
              children: [
                { type: 'text', text: 'This box is of the type "Attention"' },
              ],
            },
          ],
        },
      ]}
    />
    <Box
      boxType="quote"
      title={[
        {
          type: 'slate-p',
          children: [{ type: 'text', text: 'Yet another Box' }],
        },
      ]}
      anchorId="box77874"
      renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
      // eslint-disable-next-line react/no-children-prop
      children={[
        {
          type: 'slate-container',
          children: [
            {
              type: 'slate-p',
              children: [
                { type: 'text', text: 'This box is of the type "Quote"' },
              ],
            },
          ],
        },
      ]}
    />
  </>
)

export const multimediaExample = (
  <Multimedia
    mediaWidth={50}
    media={[
      {
        type: 'img',
        src: 'https://assets.serlo.org/629480521269f_75475afecab129c4c7f203b3ce88f53416bf9946.jpg',
        alt: 'Illustration des Endoplasmatischen Retikulums',
      },
    ]}
    // eslint-disable-next-line react/no-children-prop
    children={[
      {
        type: 'slate-container',
        children: [
          {
            type: 'slate-p',
            children: [
              { type: 'text', text: 'Das ' },
              {
                type: 'text',
                text: 'Endoplasmatische Retikulum (ER)',
                strong: true,
              },
              {
                type: 'text',
                text: ' ist ein großes Labyrinth aus abgeflachten und miteinander verbundenen Membransäckchen (Zisternen). Es steht in direkter Verbindung mit der ',
              },
              {
                type: 'a',
                href: '/biologie/77992/der-zellkern',
                children: [{ type: 'text', text: 'Kernmembran' }],
              },
              { type: 'text', text: ' und ist an zahlreichen ' },
              { type: 'text', text: 'Stoffwechselvorgängen', strong: true },
              { type: 'text', text: ' beteiligt.' },
            ],
          },
        ],
      },
    ]}
    renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
  />
)

export const inputExample = (
  <Exercise
    renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
    path={[]}
    node={{
      type: 'exercise',
      grouped: false,
      trashed: false,
      task: {
        edtrState: {
          content: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    { type: 'text', text: 'There are ' },
                    {
                      type: 'inline-math',
                      formula: '13 ',
                      formulaSource: '13 ',
                    },
                    { type: 'text', text: ' boys and ' },
                    {
                      type: 'inline-math',
                      formula: '11 ',
                      formulaSource: '11 ',
                    },
                    {
                      type: 'text',
                      text: ' girls in class 5b. How many children are in the class in total?',
                    },
                  ],
                },
              ],
            },
          ],
          interactive: {
            plugin: 'inputExercise',
            state: {
              type: 'input-string-normalized-match-challenge',
              unit: '',
              answers: [
                {
                  value: '24',
                  isCorrect: true,
                  feedback: [
                    {
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [{ type: 'text', text: 'Great job!' }],
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
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [{ type: 'text', text: 'Almost...' }],
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
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            {
                              type: 'text',
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
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [{ type: 'text', text: 'Almost...' }],
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
          default: true,
          agreement:
            'By saving this page, you confirm that your contribution (including any edits you have made) is your own work, and that it does not infringe on the rights of third parties. You consent to publishing your contribution under the <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution/Share-Alike License 4.0</a> and/or under an equivalent license chosen by the Serlo Education e.V. in accordance with the regulations laid out in the <a href="https://en.serlo.org/terms">terms of use</a>. Should the contribution not be your own work, it must be available in accordance with the <a href="https://en.serlo.org/terms">terms of use</a>, and you must agree to comply with any necessary license requests.',
          isDefault: true,
        },
      },
      solution: {
        edtrState: {
          prerequisite: {
            id: '138148',
            title: 'Addition',
            href: '/math/138148/addition',
          },
          strategy: [],
          steps: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    {
                      type: 'text',
                      text: 'Add the number of boys and the number of girls:',
                    },
                  ],
                },
                {
                  type: 'slate-p',
                  children: [
                    {
                      type: 'inline-math',
                      formula: '13+11=24',
                      formulaSource: '13+11=24',
                    },
                  ],
                },
              ],
            },
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    { type: 'text', text: 'There are ' },
                    {
                      type: 'inline-math',
                      formula: '24 ',
                      formulaSource: '24 ',
                    },
                    { type: 'text', text: ' children in the class.' },
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
          default: true,
          agreement:
            'By saving this page, you confirm that your contribution (including any edits you have made) is your own work, and that it does not infringe on the rights of third parties. You consent to publishing your contribution under the <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution/Share-Alike License 4.0</a> and/or under an equivalent license chosen by the Serlo Education e.V. in accordance with the regulations laid out in the <a href="https://en.serlo.org/terms">terms of use</a>. Should the contribution not be your own work, it must be available in accordance with the <a href="https://en.serlo.org/terms">terms of use</a>, and you must agree to comply with any necessary license requests.',
          isDefault: true,
        },
      },
      context: { id: 258549, solutionId: 258551 },
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
      type: 'exercise',
      grouped: false,
      trashed: false,
      task: {
        edtrState: {
          content: [
            {
              type: 'multimedia',
              mediaWidth: 50,
              float: 'right',
              media: [
                {
                  type: 'img',
                  src: 'https://assets.serlo.org/legacy/1840.png',
                  alt: '',
                  caption: [
                    {
                      type: 'slate-container',
                      children: [{ type: 'slate-p', children: [] }],
                    },
                  ],
                },
              ],
              children: [
                {
                  type: 'slate-container',
                  children: [
                    {
                      type: 'slate-p',
                      children: [
                        {
                          type: 'text',
                          text: 'The drawbridge of a castle is ',
                        },
                        {
                          type: 'inline-math',
                          formula: '8m',
                          formulaSource: '8m',
                        },
                        { type: 'text', text: ' long and has an angle of ' },
                        {
                          type: 'inline-math',
                          formula: '43^\\circ',
                          formulaSource: '43^\\circ',
                        },
                        {
                          type: 'text',
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
          default: true,
          agreement:
            'By saving this page, you confirm that your contribution (including any edits you have made) is your own work, and that it does not infringe on the rights of third parties. You consent to publishing your contribution under the <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution/Share-Alike License 4.0</a> and/or under an equivalent license chosen by the Serlo Education e.V. in accordance with the regulations laid out in the <a href="https://en.serlo.org/terms">terms of use</a>. Should the contribution not be your own work, it must be available in accordance with the <a href="https://en.serlo.org/terms">terms of use</a>, and you must agree to comply with any necessary license requests.',
          isDefault: true,
        },
      },
      solution: {
        edtrState: {
          prerequisite: {
            id: '228138',
            title: 'Sine, Cosine and Tangent',
            href: '/math/228138/sine-cosine-and-tangent',
          },
          strategy: [],
          steps: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    { type: 'text', text: 'Determine the chain length ' },
                    { type: 'inline-math', formula: 'k', formulaSource: 'k' },
                    { type: 'text', text: ' using the sine.' },
                  ],
                },
              ],
            },
            {
              type: 'equations',
              steps: [
                {
                  left: '\\sin\\left(43°\\right)',
                  leftSource: '\\sin\\left(43°\\right)',
                  sign: 'equals',
                  right: '\\frac{8\\text{m}}{k}',
                  rightSource: '\\frac{8\\text{m}}{k}',
                  transform: '\\cdot k',
                  transformSource: '\\cdot k',
                  explanation: [
                    {
                      type: 'slate-container',
                      children: [{ type: 'slate-p', children: [] }],
                    },
                  ],
                },
                {
                  left: '\\sin\\left(43°\\right)\\cdot k',
                  leftSource: '\\sin\\left(43°\\right)\\cdot k',
                  sign: 'equals',
                  right: '8\\ \\text{m}\\ ',
                  rightSource: '8\\ \\text{m}\\ ',
                  transform: '\\ :\\sin\\left(43°\\right)',
                  transformSource: '\\ :\\sin\\left(43°\\right)',
                  explanation: [
                    {
                      type: 'slate-container',
                      children: [{ type: 'slate-p', children: [] }],
                    },
                  ],
                },
                {
                  left: 'k',
                  leftSource: 'k',
                  sign: 'equals',
                  right: '\\frac{8\\text{m}}{\\sin\\left(43°\\right)}',
                  rightSource: '\\frac{8\\text{m}}{\\sin\\left(43°\\right)}',
                  transform: '',
                  transformSource: '',
                  explanation: [
                    {
                      type: 'slate-container',
                      children: [{ type: 'slate-p', children: [] }],
                    },
                  ],
                },
                {
                  left: 'k',
                  leftSource: 'k',
                  sign: 'almost-equal-to',
                  right: '11.7\\text{m}\\ ',
                  rightSource: '11.7\\text{m}\\ ',
                  transform: '',
                  transformSource: '',
                  explanation: [
                    {
                      type: 'slate-container',
                      children: [{ type: 'slate-p', children: [] }],
                    },
                  ],
                },
              ],
              firstExplanation: [
                {
                  type: 'slate-container',
                  children: [{ type: 'slate-p', children: [] }],
                },
              ],
              transformationTarget: 'equation',
            },
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    { type: 'text', text: 'The chain must be about ' },
                    {
                      type: 'inline-math',
                      formula: '11.7 m',
                      formulaSource: '11.7 m',
                    },
                    {
                      type: 'text',
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
          default: true,
          agreement:
            'By saving this page, you confirm that your contribution (including any edits you have made) is your own work, and that it does not infringe on the rights of third parties. You consent to publishing your contribution under the <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution/Share-Alike License 4.0</a> and/or under an equivalent license chosen by the Serlo Education e.V. in accordance with the regulations laid out in the <a href="https://en.serlo.org/terms">terms of use</a>. Should the contribution not be your own work, it must be available in accordance with the <a href="https://en.serlo.org/terms">terms of use</a>, and you must agree to comply with any necessary license requests.',
          isDefault: true,
        },
      },
      context: { id: 228988, solutionId: 228989 },
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
      type: 'exercise',
      grouped: false,
      trashed: false,
      task: {
        edtrState: {
          content: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    {
                      type: 'text',
                      text: 'If I had worn my glasses, I ______________(not step) on the toys.',
                    },
                  ],
                },
              ],
            },
          ],
          interactive: {
            plugin: 'scMcExercise',
            state: {
              isSingleChoice: true,
              answers: [
                {
                  content: [
                    {
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [{ type: 'text', text: 'would not step' }],
                        },
                      ],
                    },
                  ],
                  isCorrect: false,
                  feedback: [
                    {
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            { type: 'text', text: 'The past perfect ' },
                            { type: 'text', text: 'had worn ', strong: true },
                            {
                              type: 'text',
                              text: 'in the subordinate clause, indicates that this is ',
                            },
                            {
                              type: 'text',
                              text: 'type III if clause',
                              strong: true,
                            },
                            { type: 'text', text: '. ' },
                            {
                              type: 'text',
                              text: 'would + infinitive',
                              strong: true,
                            },
                            { type: 'text', text: ' is used in ' },
                            {
                              type: 'text',
                              text: 'type II if clauses',
                              strong: true,
                            },
                            {
                              type: 'text',
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
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            { type: 'text', text: 'will not have stepped' },
                          ],
                        },
                      ],
                    },
                  ],
                  isCorrect: false,
                  feedback: [
                    {
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            { type: 'text', text: 'This is the ' },
                            {
                              type: 'text',
                              text: 'future perfect',
                              strong: true,
                            },
                            { type: 'text', text: ' and not used in ' },
                            { type: 'text', text: 'if clauses', strong: true },
                            { type: 'text', text: '.' },
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
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [{ type: 'text', text: 'will not step' }],
                        },
                      ],
                    },
                  ],
                  isCorrect: false,
                  feedback: [
                    {
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            { type: 'text', text: 'The past perfect ' },
                            { type: 'text', text: 'had worn ', strong: true },
                            {
                              type: 'text',
                              text: 'in the subordinate clause, indicates that this is ',
                            },
                            {
                              type: 'text',
                              text: 'type III if clause',
                              strong: true,
                            },
                            { type: 'text', text: '. W' },
                            {
                              type: 'text',
                              text: 'ill + infinitive',
                              strong: true,
                            },
                            { type: 'text', text: ' is used in ' },
                            {
                              type: 'text',
                              text: 'type I if clauses',
                              strong: true,
                            },
                            {
                              type: 'text',
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
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            { type: 'text', text: 'would not have stepped' },
                          ],
                        },
                      ],
                    },
                  ],
                  isCorrect: true,
                  feedback: [
                    {
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            { type: 'text', text: 'The past perfect ' },
                            { type: 'text', text: 'had worn ', strong: true },
                            {
                              type: 'text',
                              text: 'in the subordinate clause, indicates that this is ',
                            },
                            {
                              type: 'text',
                              text: 'type III if clause',
                              strong: true,
                            },
                            {
                              type: 'text',
                              text: '. Therefore you need to use ',
                            },
                            {
                              type: 'text',
                              text: 'would not + present perfect',
                              strong: true,
                            },
                            { type: 'text', text: ' in the main clause.' },
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
          default: true,
          agreement:
            'Mit dem Speichern dieser Seite versicherst du, dass du deinen Beitrag (damit sind auch Änderungen gemeint) selbst verfasst hast bzw. dass er keine fremden Rechte verletzt. Du willigst ein, deinen Beitrag unter der <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.de">Creative Commons Attribution/Share-Alike Lizenz 4.0</a> und/oder unter einer gleichwertigen Lizenz zu veröffentlichen, welche der Serlo Education e. V. entsprechend der Regelungen in den <a href="/21654">Nutzungsbedingungen</a> festlegen darf. Falls du den Beitrag nicht selbst verfasst hast, muss er unter den <a href="/21654">Nutzungsbedingungen</a> verfügbar sein und du stimmst zu, notwendigen Lizenzanforderungen zu folgen.',
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
          default: true,
          agreement:
            'Mit dem Speichern dieser Seite versicherst du, dass du deinen Beitrag (damit sind auch Änderungen gemeint) selbst verfasst hast bzw. dass er keine fremden Rechte verletzt. Du willigst ein, deinen Beitrag unter der <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.de">Creative Commons Attribution/Share-Alike Lizenz 4.0</a> und/oder unter einer gleichwertigen Lizenz zu veröffentlichen, welche der Serlo Education e. V. entsprechend der Regelungen in den <a href="/21654">Nutzungsbedingungen</a> festlegen darf. Falls du den Beitrag nicht selbst verfasst hast, muss er unter den <a href="/21654">Nutzungsbedingungen</a> verfügbar sein und du stimmst zu, notwendigen Lizenzanforderungen zu folgen.',
          isDefault: true,
        },
      },
      context: { id: 264021, solutionId: 264023 },
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
      type: 'exercise',
      grouped: false,
      trashed: false,
      task: {
        edtrState: {
          content: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    {
                      type: 'text',
                      text: 'Consider on the unit circle: For which angles between ',
                    },
                    {
                      type: 'inline-math',
                      formula: '0^\\circ',
                      formulaSource: '0^\\circ',
                    },
                    { type: 'text', text: ' and ' },
                    {
                      type: 'inline-math',
                      formula: '360^\\circ',
                      formulaSource: '360^\\circ',
                    },
                    { type: 'text', text: ' you have ' },
                    {
                      type: 'inline-math',
                      formula: '\\sin\\left(\\alpha\\right)=0.5',
                      formulaSource: '\\sin\\left(\\alpha\\right)=0.5',
                    },
                    { type: 'text', text: '?' },
                  ],
                },
              ],
            },
          ],
          interactive: {
            plugin: 'scMcExercise',
            state: {
              isSingleChoice: false,
              answers: [
                {
                  content: [
                    {
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            {
                              type: 'inline-math',
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
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            { type: 'text', text: 'Here, you have ' },
                            {
                              type: 'inline-math',
                              formula: ' \\cos(\\alpha) = 0.5',
                              formulaSource: ' \\cos(\\alpha) = 0.5',
                            },
                            { type: 'text', text: '.' },
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
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            {
                              type: 'inline-math',
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
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [{ type: 'text', text: 'Correct!' }],
                        },
                      ],
                    },
                  ],
                  originalIndex: 3,
                },
                {
                  content: [
                    {
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            {
                              type: 'inline-math',
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
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            {
                              type: 'text',
                              text: 'Nope! Even though this angle cuts the ',
                            },
                            {
                              type: 'inline-math',
                              formula: '90^\\circ',
                              formulaSource: '90^\\circ',
                            },
                            {
                              type: 'text',
                              text: ' - angle in half, the sine is not ',
                            },
                            {
                              type: 'inline-math',
                              formula: '\\tfrac 12',
                              formulaSource: '\\tfrac 12',
                            },
                            { type: 'text', text: ', but ' },
                            {
                              type: 'inline-math',
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
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            {
                              type: 'inline-math',
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
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [{ type: 'text', text: 'Correct!' }],
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
          default: true,
          agreement:
            'By saving this page, you confirm that your contribution (including any edits you have made) is your own work, and that it does not infringe on the rights of third parties. You consent to publishing your contribution under the <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution/Share-Alike License 4.0</a> and/or under an equivalent license chosen by the Serlo Education e.V. in accordance with the regulations laid out in the <a href="https://en.serlo.org/terms">terms of use</a>. Should the contribution not be your own work, it must be available in accordance with the <a href="https://en.serlo.org/terms">terms of use</a>, and you must agree to comply with any necessary license requests.',
          isDefault: true,
        },
      },
      solution: { trashed: false },
      context: { id: 228897 },
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
          leftSource: '\\int_1^e\\frac{x^2+2x+3}{2x}\\ \\mathrm{d}x',
          sign: 'equals',
          right:
            '\\int_1^e\\left(\\frac{x^2}{2x}+\\frac{2x}{2x}+\\frac{3}{2x}\\right)\\ \\mathrm{d}x',
          rightSource:
            '\\int_1^e\\left(\\frac{x^2}{2x}+\\frac{2x}{2x}+\\frac{3}{2x}\\right)\\ \\mathrm{d}x',
          transform: '',
          transformSource: '',
          explanation: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          left: '',
          leftSource: '',
          sign: 'equals',
          right:
            '\\int_1^e\\left(\\frac{1}{2}x+1+\\frac{3}{2}\\cdot\\frac{1}{x}\\right)\\ \\mathrm{d}x',
          rightSource:
            '\\int_1^e\\left(\\frac{1}{2}x+1+\\frac{3}{2}\\cdot\\frac{1}{x}\\right)\\ \\mathrm{d}x',
          transform: '',
          transformSource: '',
          explanation: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    {
                      type: 'a',
                      href: '/1595',
                      children: [
                        {
                          type: 'text',
                          text: 'Integriere',
                        },
                      ],
                    },
                    {
                      type: 'text',
                      text: '. Die Stammfunktion von ',
                    },
                    {
                      type: 'inline-math',
                      formula: '\\frac1x',
                      formulaSource: '\\frac1x',
                    },
                    {
                      type: 'text',
                      text: ' ist ',
                    },
                    {
                      type: 'inline-math',
                      formula: '\\ln x',
                      formulaSource: '\\ln x',
                    },
                    {
                      type: 'text',
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
          leftSource: '',
          sign: 'equals',
          right:
            '\\left[\\frac{1}{2\\cdot2}x^2+x+\\frac{3}{2}\\ln x\\right]_1^e',
          rightSource:
            '\\left[\\frac{1}{2\\cdot2}x^2+x+\\frac{3}{2}\\ln x\\right]_1^e',
          transform: '',
          transformSource: '',
          explanation: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    {
                      type: 'text',
                      text: 'In die Klammer wird für ',
                    },
                    {
                      type: 'inline-math',
                      formula: 'x',
                      formulaSource: 'x',
                    },
                    {
                      type: 'text',
                      text: ' der obere Wert ',
                    },
                    {
                      type: 'inline-math',
                      formula: '(e)',
                      formulaSource: '(e)',
                    },
                    {
                      type: 'text',
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
          leftSource: '',
          sign: 'equals',
          right:
            '\\left(\\frac{1}{4}e^2+e+\\frac{3}{2}\\ln e\\right)-\\left(\\frac{1}{4}1^2+1+\\frac{3}{2}\\ln1\\right)',
          rightSource:
            '\\left(\\frac{1}{4}e^2+e+\\frac{3}{2}\\ln e\\right)-\\left(\\frac{1}{4}1^2+1+\\frac{3}{2}\\ln1\\right)',
          transform: '',
          transformSource: '',
          explanation: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    {
                      type: 'text',
                      text: 'Löse die Klammern auf. Dabei ist ',
                    },
                    {
                      type: 'inline-math',
                      formula: '\\ln e=1',
                      formulaSource: '\\ln e=1',
                    },
                    {
                      type: 'text',
                      text: ' und ',
                    },
                    {
                      type: 'inline-math',
                      formula: '\\ln1=0',
                      formulaSource: '\\ln1=0',
                    },
                    {
                      type: 'text',
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
          leftSource: '',
          sign: 'equals',
          right: '\\frac{e^2}{4}+e+\\frac{3}{2}-\\frac{1}{4}-1',
          rightSource: '\\frac{e^2}{4}+e+\\frac{3}{2}-\\frac{1}{4}-1',
          transform: '',
          transformSource: '',
          explanation: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    {
                      type: 'text',
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
          leftSource: '',
          sign: 'equals',
          right: '\\frac{e^2}{4}+e+\\frac{1}{4}',
          rightSource: '\\frac{e^2}{4}+e+\\frac{1}{4}',
          transform: '',
          transformSource: '',
          explanation: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          left: '',
          leftSource: '',
          sign: 'almost-equal-to',
          right: '4{,}8155',
          rightSource: '4,8155',
          transform: '',
          transformSource: '',
          explanation: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
      firstExplanation: [
        {
          type: 'slate-container',
          children: [
            {
              type: 'slate-p',
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
    <Injection
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
  <Code
    content={`// global variable: read & write from everywhere
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
    <div className="mb-block slate-container">
      <h4 className="serlo-h4">
        <MathSpan formula="23+19= 23 +(17+2)=(23+17)+2=40+2=42" />
      </h4>
    </div>
    <Spoiler
      title="There are also other ways to split the summands:"
      body={
        <div className="serlo-spoiler-body motion-safe:animate-in motion-safe:slide-in-from-top-8 motion-safe:fade-in">
          <div className="mb-block slate-container">
            <p className="serlo-p mb-0 slate-p min-h-[1.33em]">
              <MathSpan formula="23+19=(21+2)+19=(21+19)+2=40+2=42" />
            </p>
          </div>
        </div>
      }
    />
  </>
)
