// @ts-nocheck imported data
import { Box } from '@/components/content/box'
import { Equations } from '@/components/content/equations'
import { Exercise } from '@/components/content/exercises/exercise'
import { Injection } from '@/components/content/injection'
import { Multimedia } from '@/components/content/multimedia'
import { renderNested } from '@/schema/article-renderer'

export const boxExample = (
  <Box
    boxType="attention"
    title={[{ type: 'slate-p', children: [] }]}
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
              { type: 'text', text: 'Die Formel ' },
              {
                type: 'inline-math',
                formula: 'a^2 + b^2 = c^2',
                formulaSource: 'a^2 + b^2 = c^2',
              },
              { type: 'text', text: ' gilt ' },
              { type: 'text', text: 'nur', strong: true },
              { type: 'text', text: ' bei ' },
              { type: 'text', text: 'rechtwinkligen', strong: true },
              {
                type: 'text',
                text: ' Dreiecken, wenn c die Hypotenuse ist!',
              },
            ],
          },
        ],
      },
    ]}
  />
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
              type: 'slate-container',
              children: [
                {
                  type: 'h',
                  level: 3,
                  children: [
                    {
                      type: 'text',
                      text: 'Ergebnismenge eines Glücksrads bestimmen',
                    },
                  ],
                },
              ],
            },
            {
              type: 'multimedia',
              mediaWidth: 25,
              float: 'right',
              media: [
                {
                  type: 'img',
                  src: 'https://assets.serlo.org/b170b3a0-71a1-11ed-a696-f999fc1f99f7/image.png',
                  alt: '',
                  caption: [
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
              children: [
                {
                  type: 'slate-container',
                  children: [
                    {
                      type: 'slate-p',
                      children: [
                        {
                          type: 'text',
                          text: 'Auf einer Kirmes wird ein Glücksrad gedreht, welches unterschiedliche Farben als Gewinnfelder hat.',
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
                        {
                          type: 'text',
                          text: 'Bestimme die Ergebnismenge ',
                        },
                        {
                          type: 'inline-math',
                          formula: '\\Omega',
                          formulaSource: '\\Omega',
                        },
                        {
                          type: 'text',
                          text: ' des Glücksrads.',
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
        edtrState: {
          prerequisite: {
            id: '1501',
            title: 'Ergebnismenge',
            href: '/mathe/1501/ergebnismenge',
          },
          strategy: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    {
                      type: 'text',
                      text: 'Überlege dir, welche Ergebnisse in diesem Zufallsexperiment möglich sind.',
                    },
                  ],
                },
              ],
            },
          ],
          steps: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    {
                      type: 'text',
                      text: 'Die Ergebnismenge ist ',
                    },
                    {
                      type: 'inline-math',
                      formula: '\\Omega=\\{rot, grün, blau, gelb\\}',
                      formulaSource: '\\Omega=\\{rot, grün, blau, gelb\\}',
                    },
                    {
                      type: 'text',
                      text: '.',
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
                    {
                      type: 'text',
                      text: 'Hierbei spielt es keine Rolle wie groß die Felder sind, denn theoretisch kann jede Farbe gedreht werden, egal wie wahrscheinlich.',
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
                    {
                      type: 'text',
                      text: 'Auch wenn ',
                    },
                    {
                      type: 'inline-math',
                      formula: 'rot',
                      formulaSource: 'rot',
                    },
                    {
                      type: 'text',
                      text: ' und ',
                    },
                    {
                      type: 'inline-math',
                      formula: 'grün',
                      formulaSource: 'grün',
                    },
                    {
                      type: 'text',
                      text: ' mehrfach vorkommen, zählen sie in der Ergebnismenge nur einmal.',
                    },
                  ],
                },
              ],
            },
          ],
        },
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
      context: {
        id: 261942,
        solutionId: 261944,
      },
      href: '/mathe/261942/261942',
      unrevisedRevisions: 0,
    }}
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
                    {
                      type: 'inline-math',
                      formula: 'f(x)=\\frac{4x^3}{3}',
                      formulaSource: 'f(x)=\\frac{4x^3}{3}',
                    },
                  ],
                },
              ],
            },
            {
              type: 'img',
              src: 'https://assets.serlo.org/5b9692c965326_321c1cab798d6432f770dd020d27521c016b6dbe.png',
              alt: 'Graph ',
              caption: [
                {
                  type: 'slate-container',
                  children: [{ type: 'slate-p', children: [] }],
                },
              ],
            },
          ],
          interactive: {
            plugin: 'inputExercise',
            state: {
              type: 'input-expression-equal-match-challenge',
              unit: '',
              answers: [
                {
                  value: '1',
                  isCorrect: true,
                  feedback: [
                    {
                      type: 'slate-container',
                      children: [
                        {
                          type: 'slate-p',
                          children: [{ type: 'text', text: 'Sehr gut!' }],
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
        edtrState: {
          prerequisite: {
            id: '63350',
            title: 'Ableiten',
            href: '/mathe/63350/ableiten-von-potenzfunktionen',
          },
          strategy: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    {
                      type: 'text',
                      text: 'Tipp: Beim Ableiten einer Potenzfunktion verringert sich der Grad der Funktion um eins.',
                    },
                  ],
                },
              ],
            },
          ],
          steps: [
            {
              type: 'slate-container',
              children: [
                {
                  type: 'slate-p',
                  children: [
                    {
                      type: 'text',
                      text: 'Wenn man die Funktionen mit Hilfe der Rechenregeln für ',
                    },
                    {
                      type: 'a',
                      href: '/mathe/1935/bruchterme',
                      children: [{ type: 'text', text: 'Bruchterme' }],
                    },
                    {
                      type: 'text',
                      text: ' umformt, ist das Ableiten einfacher.',
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
                    {
                      type: 'inline-math',
                      formula: 'f(x)=\\dfrac{4x^3}{3}',
                      formulaSource: 'f(x)=\\dfrac{4x^3}{3}',
                    },
                  ],
                },
                {
                  type: 'slate-p',
                  children: [
                    {
                      type: 'inline-math',
                      formula: '\\phantom{f(x)}=\\dfrac{4}{3}\\cdot x^3',
                      formulaSource: '\\phantom{f(x)}=\\dfrac{4}{3}\\cdot x^3',
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
                    { type: 'text', text: 'Ziehe den Faktor vor den Bruch.' },
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
                    { type: 'text', text: 'Jetzt brauchst du die Regel zum ' },
                    {
                      type: 'a',
                      href: '\\63350',
                      children: [
                        { type: 'text', text: 'Ableiten von Potenzfunktionen' },
                      ],
                    },
                    { type: 'text', text: '.' },
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
                    {
                      type: 'inline-math',
                      formula: "f'(x)=\\dfrac{4}{3}\\cdot 3\\cdot x^2=4x^2",
                      formulaSource:
                        "f'(x)=\\dfrac{4}{3}\\cdot 3\\cdot x^2=4x^2",
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
                    {
                      type: 'text',
                      text: 'Das heißt, die in der Grafik gesuchte Funktion ist ',
                    },
                    {
                      type: 'inline-math',
                      formula: "f'(x)=4x^2",
                      formulaSource: "f'(x)=4x^2",
                    },
                    { type: 'text', text: '.' },
                  ],
                },
                {
                  type: 'ul',
                  children: [
                    {
                      type: 'li',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            {
                              type: 'text',
                              text: 'Der Graph einer Funktion zweiten Grades ist eine ',
                            },
                            {
                              type: 'a',
                              href: '/mathe/1855/parabel',
                              children: [{ type: 'text', text: 'Parabel' }],
                            },
                            { type: 'text', text: '.' },
                          ],
                        },
                      ],
                    },
                    {
                      type: 'li',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            {
                              type: 'text',
                              text: 'Deswegen kann man die Graphen ',
                            },
                            {
                              type: 'inline-math',
                              formula: '2',
                              formulaSource: '2',
                            },
                            { type: 'text', text: ' und ' },
                            {
                              type: 'inline-math',
                              formula: '4',
                              formulaSource: '4',
                            },
                            {
                              type: 'text',
                              text: ' ausschließen, da diese beide keine Parabeln sind. ',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: 'li',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            { type: 'text', text: 'Der Graph ' },
                            {
                              type: 'inline-math',
                              formula: '3',
                              formulaSource: '3',
                            },
                            {
                              type: 'text',
                              text: ' ist eine nach unten geöffnete Parabel. Bei einer nach unten geöffneten Parabel ist der Faktor vor dem ',
                            },
                            {
                              type: 'inline-math',
                              formula: 'x^2',
                              formulaSource: 'x^2',
                            },
                            {
                              type: 'text',
                              text: ' negativ. Bei der Funktion ',
                            },
                            {
                              type: 'inline-math',
                              formula: "f'(x)",
                              formulaSource: "f'(x)",
                            },
                            { type: 'text', text: ' ist der Faktor vor dem ' },
                            {
                              type: 'inline-math',
                              formula: 'x^2',
                              formulaSource: 'x^2',
                            },
                            { type: 'text', text: ' eine ' },
                            {
                              type: 'inline-math',
                              formula: '4',
                              formulaSource: '4',
                            },
                            { type: 'text', text: ' und damit positiv. ' },
                          ],
                        },
                      ],
                    },
                    {
                      type: 'li',
                      children: [
                        {
                          type: 'slate-p',
                          children: [
                            {
                              type: 'text',
                              text: 'Die gesuchte Funktion ist also die ',
                            },
                            {
                              type: 'inline-math',
                              formula: '1',
                              formulaSource: '1',
                            },
                            { type: 'text', text: '.' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
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
      context: { id: 115501, solutionId: 115624 },
      href: '/mathe/115501/115501',
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
                          children: [{ type: 'text', text: 'Try again.' }],
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
                          children: [{ type: 'text', text: 'Fantastic.' }],
                        },
                      ],
                    },
                  ],
                  originalIndex: 0,
                },
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
                          children: [{ type: 'text', text: 'Try again.' }],
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
                          children: [{ type: 'text', text: 'Try again.' }],
                        },
                      ],
                    },
                  ],
                  originalIndex: 2,
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
                      text: 'Welche der abgebildeten Parabeln besitzen den Punkt ',
                    },
                    {
                      type: 'inline-math',
                      formula: 'S=(2|1)',
                      formulaSource: 'S=(2|1)',
                    },
                    { type: 'text', text: ' als Scheitel?' },
                  ],
                },
              ],
            },
            {
              type: 'img',
              src: 'https://assets.serlo.org/legacy/57e23fe82e5d4_fef5616d7fe877e3d4b62c2b6f48b107ed0a89d3.png',
              alt: '',
              caption: [
                {
                  type: 'slate-container',
                  children: [{ type: 'slate-p', children: [] }],
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
                              formula: 'f_1',
                              formulaSource: 'f_1',
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
                      children: [{ type: 'slate-p', children: [] }],
                    },
                  ],
                  originalIndex: 0,
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
                              formula: 'f_4',
                              formulaSource: 'f_4',
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
                              text: 'Weit gefehlt! Der Scheitel von ',
                            },
                            {
                              type: 'inline-math',
                              formula: 'f_4',
                              formulaSource: 'f_4',
                            },
                            { type: 'text', text: ' ist ' },
                            {
                              type: 'inline-math',
                              formula: '(-3|5)',
                              formulaSource: '(-3|5)',
                            },
                            { type: 'text', text: '.' },
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
                            {
                              type: 'inline-math',
                              formula: 'f_2',
                              formulaSource: 'f_2',
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
                      children: [{ type: 'slate-p', children: [] }],
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
                              formula: 'f_3',
                              formulaSource: 'f_3',
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
                              text: 'Falsch. Der Scheitelpunkt von ',
                            },
                            {
                              type: 'inline-math',
                              formula: 'f_3',
                              formulaSource: 'f_3',
                            },
                            { type: 'text', text: ' ist ' },
                            {
                              type: 'inline-math',
                              formula: '(1|1)',
                              formulaSource: '(1|1)',
                            },
                            { type: 'text', text: '.' },
                          ],
                        },
                      ],
                    },
                  ],
                  originalIndex: 2,
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
        edtrState: {
          prerequisite: {
            id: '1781',
            title: 'Scheitelpunkt',
            href: '/mathe/1781/scheitelpunkt-einer-parabel',
          },
          strategy: [],
          steps: [
            {
              type: 'slate-container',
              children: [{ type: 'slate-p', children: [] }],
            },
          ],
        },
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
      context: { id: 63771, solutionId: 201662 },
      href: '/mathe/63771/63771',
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
  <div className="max-h-96 overflow-scroll">
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
  </div>
)
