import { FrontendContentNode } from '@/frontend-node-types'
import { renderArticle } from '@/schema/article-renderer'

export default function Page() {
  return (
    <div className="">{renderArticle(testData as FrontendContentNode[])}</div>
  )
}

const testData = [
  {
    type: 'article',
    introduction: [
      {
        type: 'multimedia',
        mediaWidth: 50,
        float: 'right',
        media: [
          {
            type: 'img',
            src: 'https://assets.serlo.org/legacy/58ef269467e34_35c96883eb85496db4814393e6c1babd5e3987c1.png',
            alt: 'Kreis',
            caption: [
              {
                type: 'slate-container',
                children: [
                  {
                    type: 'slate-p',
                    children: [
                      {
                        type: 'text',
                        text: 'Kreis',
                      },
                    ],
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
                    text: 'Ein Kreis beschreibt die Menge aller Punkte, die denselben Abstand ',
                  },
                  {
                    type: 'inline-math',
                    formula: 'r',
                    formulaSource: 'r',
                  },
                  {
                    type: 'text',
                    text: ' zum Mittelpunkt ',
                  },
                  {
                    type: 'inline-math',
                    formula: 'M',
                    formulaSource: 'M',
                  },
                  {
                    type: 'text',
                    text: ' besitzen. In diesem Artikel lernst du die folgenden Formeln kennen:',
                  },
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
                            type: 'a',
                            href: '#umfang',
                            children: [
                              {
                                type: 'text',
                                text: 'Berechnung des Umfangs',
                              },
                            ],
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
                          {
                            type: 'a',
                            href: '#flaeche',
                            children: [
                              {
                                type: 'text',
                                text: 'Berechnung der Kreisfläche',
                              },
                            ],
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
                          {
                            type: 'a',
                            href: '#kreisbogenlaenge',
                            children: [
                              {
                                type: 'text',
                                text: 'Berechnung der Kreisbogenlänge',
                              },
                            ],
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
                          {
                            type: 'a',
                            href: '#sektorflaeche',
                            children: [
                              {
                                type: 'text',
                                text: 'Berechnung der Sektorfläche',
                              },
                            ],
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
                          {
                            type: 'a',
                            href: '#kreisring',
                            children: [
                              {
                                type: 'text',
                                text: 'Berechnung des Kreisrings',
                              },
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
        ],
      },
    ],
    content: [
      {
        type: 'slate-container',
        children: [
          {
            type: 'h',
            level: 2,
            children: [
              {
                type: 'text',
                text: 'Zusammenfassung',
              },
            ],
          },
        ],
      },
      {
        type: 'serlo-table',
        tableType: 'OnlyColumnHeader',
        children: [
          {
            type: 'serlo-tr',
            children: [
              {
                type: 'serlo-td',
                children: [
                  {
                    type: 'slate-container',
                    children: [
                      {
                        type: 'slate-p',
                        children: [
                          {
                            type: 'text',
                            text: 'Begriff',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'serlo-td',
                children: [
                  {
                    type: 'slate-container',
                    children: [
                      {
                        type: 'slate-p',
                        children: [
                          {
                            type: 'text',
                            text: 'Formel',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'serlo-tr',
            children: [
              {
                type: 'serlo-td',
                children: [
                  {
                    type: 'slate-container',
                    children: [
                      {
                        type: 'slate-p',
                        children: [
                          {
                            type: 'text',
                            text: 'Umfang',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'serlo-td',
                children: [
                  {
                    type: 'slate-container',
                    children: [
                      {
                        type: 'slate-p',
                        children: [
                          {
                            type: 'inline-math',
                            formula: 'U=2\\pi r',
                            formulaSource: 'U=2\\pi r',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'serlo-tr',
            children: [
              {
                type: 'serlo-td',
                children: [
                  {
                    type: 'slate-container',
                    children: [
                      {
                        type: 'slate-p',
                        children: [
                          {
                            type: 'text',
                            text: 'Kreisfläche',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'serlo-td',
                children: [
                  {
                    type: 'slate-container',
                    children: [
                      {
                        type: 'slate-p',
                        children: [
                          {
                            type: 'inline-math',
                            formula: 'A_{\\circ}=\\pi r^2',
                            formulaSource: 'A_{\\circ}=\\pi r^2',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'serlo-tr',
            children: [
              {
                type: 'serlo-td',
                children: [
                  {
                    type: 'slate-container',
                    children: [
                      {
                        type: 'slate-p',
                        children: [
                          {
                            type: 'text',
                            text: 'Kreisbogenlänge',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'serlo-td',
                children: [
                  {
                    type: 'slate-container',
                    children: [
                      {
                        type: 'slate-p',
                        children: [
                          {
                            type: 'inline-math',
                            formula: 'b=U\\cdot\\frac{\\alpha}{360^{\\circ}}',
                            formulaSource:
                              'b=U\\cdot\\frac{\\alpha}{360^{\\circ}}',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'serlo-tr',
            children: [
              {
                type: 'serlo-td',
                children: [
                  {
                    type: 'slate-container',
                    children: [
                      {
                        type: 'slate-p',
                        children: [
                          {
                            type: 'text',
                            text: 'Sektorfläche',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'serlo-td',
                children: [
                  {
                    type: 'slate-container',
                    children: [
                      {
                        type: 'slate-p',
                        children: [
                          {
                            type: 'inline-math',
                            formula:
                              'A_\\mathrm{s} = A_{\\circ} \\cdot \\dfrac{\\alpha}{360^{\\circ}}',
                            formulaSource:
                              'A_\\mathrm{s} = A_{\\circ} \\cdot \\dfrac{\\alpha}{360^{\\circ}}',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'serlo-tr',
            children: [
              {
                type: 'serlo-td',
                children: [
                  {
                    type: 'slate-container',
                    children: [
                      {
                        type: 'slate-p',
                        children: [
                          {
                            type: 'text',
                            text: 'Kreisring',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'serlo-td',
                children: [
                  {
                    type: 'slate-container',
                    children: [
                      {
                        type: 'slate-p',
                        children: [
                          {
                            type: 'inline-math',
                            formula:
                              'A_{\\mathrm{Kreisring}} = \\pi \\cdot ( r_2^2 \\; – \\; r_1^2)',
                            formulaSource:
                              'A_{\\mathrm{Kreisring}} = \\pi \\cdot ( r_2^2 \\; – \\; r_1^2)',
                          },
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
      {
        type: 'slate-container',
        children: [
          {
            type: 'h',
            level: 2,
            children: [
              {
                type: 'text',
                text: 'Bestimmung des Umfangs',
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
                text: 'Den ',
              },
              {
                type: 'a',
                href: '/mathe/36162/kreis',
                children: [
                  {
                    type: 'text',
                    text: 'Umfang',
                  },
                ],
              },
              {
                type: 'text',
                text: ' erhältst du durch Abrollen des ',
              },
              {
                type: 'a',
                href: '/mathe/36162/kreis',
                children: [
                  {
                    type: 'text',
                    text: 'Kreises',
                  },
                ],
              },
              {
                type: 'text',
                text: ' und messen der abgerollten ',
              },
              {
                type: 'a',
                href: 'https://de.serlo.org/mathe/geometrie/grundbegriffe/geraden-strecken-halbgeraden/strecke',
                children: [
                  {
                    type: 'text',
                    text: 'Strecke',
                  },
                ],
              },
              {
                type: 'text',
                text: '. Auf diese Weise kannst du die ',
              },
              {
                type: 'a',
                href: '/mathe/2107/kreiszahl-pi',
                children: [
                  {
                    type: 'text',
                    text: 'Kreiszahl',
                  },
                ],
              },
              {
                type: 'text',
                text: ' ',
              },
              {
                type: 'inline-math',
                formula: '\\pi',
                formulaSource: '\\pi',
              },
              {
                type: 'text',
                text: ' definieren.',
              },
            ],
          },
          {
            type: 'slate-p',
            children: [
              {
                type: 'text',
                text: 'In der Abbildung rechts siehst du, wie ein Kreis mit ',
              },
              {
                type: 'a',
                href: '/mathe/36162/kreis',
                children: [
                  {
                    type: 'text',
                    text: 'Durchmesser',
                  },
                ],
              },
              {
                type: 'text',
                text: ' ',
              },
              {
                type: 'inline-math',
                formula: 'd=1',
                formulaSource: 'd=1',
              },
              {
                type: 'text',
                text: ' abgerollt wird.',
              },
            ],
          },
          {
            type: 'slate-p',
            children: [
              {
                type: 'text',
                text: 'Sein Umfang beträgt ',
              },
              {
                type: 'inline-math',
                formula: '\\pi',
                formulaSource: '\\pi',
              },
              {
                type: 'text',
                text: ', also etwa ',
              },
              {
                type: 'inline-math',
                formula: '3{,}14',
                formulaSource: '3,14',
              },
              {
                type: 'text',
                text: '.    ',
              },
            ],
          },
          {
            type: 'slate-p',
            children: [
              {
                type: 'text',
                text: 'Für den Umfang findest du so den folgenden Zusammenhang: ',
              },
            ],
          },
        ],
      },
      {
        type: 'box',
        boxType: 'blank',
        anchorId: 'box34565',
        title: [
          {
            type: 'slate-p',
            children: [],
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
                    type: 'inline-math',
                    formula: 'U = 2 \\cdot r \\cdot \\pi = d\\cdot \\pi',
                    formulaSource: 'U = 2 \\cdot r \\cdot \\pi = d\\cdot \\pi',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'img',
        src: 'https://assets.serlo.org/legacy/58eb97b7e5376_7d4211710d8bab642798e39e07788e6f2912e86a.gif',
        alt: 'Abrollen von Pi',
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
      {
        type: 'slate-container',
        children: [
          {
            type: 'slate-p',
            children: [
              {
                type: 'text',
                text: 'Quelle:  ',
                em: true,
              },
              {
                type: 'a',
                href: 'https://en.wikipedia.org/wiki/User:John_Reid',
                children: [
                  {
                    type: 'text',
                    text: 'John Reid',
                    em: true,
                  },
                ],
              },
              {
                type: 'text',
                text: ', ',
                em: true,
              },
              {
                type: 'a',
                href: 'https://commons.wikimedia.org/wiki/File:Pi-unrolled-720.gif',
                children: [
                  {
                    type: 'text',
                    text: 'Wikimedia Commons',
                    em: true,
                  },
                ],
              },
              {
                type: 'text',
                text: ' ',
                em: true,
              },
              {
                type: 'a',
                href: 'https://creativecommons.org/licenses/by-sa/3.0/',
                children: [
                  {
                    type: 'text',
                    text: 'CCBY-SA 3.0',
                    em: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'slate-container',
        children: [
          {
            type: 'h',
            level: 2,
            children: [
              {
                type: 'text',
                text: 'Berechnung des Flächeninhalts',
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
            src: 'https://assets.serlo.org/5e8ada9d45a0e_8bef234ab2e50d85b470134ce655fcf10e6011b2.png',
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
                    text: 'Die Formel zur Berechnung des Flächeninhalts eines Kreises lautet: ',
                  },
                ],
              },
            ],
          },
          {
            type: 'box',
            boxType: 'blank',
            anchorId: 'box22934',
            title: [
              {
                type: 'slate-p',
                children: [],
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
                        type: 'inline-math',
                        formula: 'A_{\\circ}=\\pi r^2',
                        formulaSource: 'A_{\\circ}=\\pi r^2',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'box',
        boxType: 'proof',
        anchorId: 'box35263',
        title: [
          {
            type: 'slate-p',
            children: [
              {
                type: 'text',
                text: 'Warum ist das so?',
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
                    text: 'Um den Flächeninhalt eines Kreises zu berechnen, stellst du dir einen Kreis vor, der in viele ',
                  },
                  {
                    type: 'a',
                    href: '/mathe/36162/kreis',
                    children: [
                      {
                        type: 'text',
                        text: 'Kreissektoren',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    text: ' zerteilt ist. Dieser Kreis ähnelt einem Kuchen mit vielen Kuchenstücken.',
                  },
                ],
              },
            ],
          },
          {
            type: 'img',
            src: 'https://assets.serlo.org/legacy/58ebb829a7ad0_05044362cb188a9ccb433091ea8026e7d37928f7.png',
            alt: 'achtgeteilter Kreis',
            maxWidth: 275,
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
          {
            type: 'img',
            src: 'https://assets.serlo.org/5e858d983f407_ecfec1e476d21ffe21213a875243090a5243d154.jpg',
            alt: 'achtgeteilter Kuchen abgerollt',
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
          {
            type: 'multimedia',
            mediaWidth: 50,
            float: 'right',
            media: [
              {
                type: 'img',
                src: 'https://assets.serlo.org/legacy/58ec87ef6ed52_a0c7cab7e8e61ef7d5239cb5d9eec4ef45ee826d.png',
                alt: 'Nahaufnahme',
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
                        text: 'Ähnlich wie beim Umfang kannst du nun diese Kuchenstücke umplatzieren und nebeneinander legen. Die Kreissektoren sehen schon fast wie ',
                      },
                      {
                        type: 'a',
                        href: '/mathe/1949/dreieck',
                        children: [
                          {
                            type: 'text',
                            text: 'Dreiecke',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        text: ' aus. Aber nur fast.  ',
                      },
                    ],
                  },
                  {
                    type: 'slate-p',
                    children: [
                      {
                        type: 'text',
                        text: 'Die ',
                      },
                      {
                        type: 'a',
                        href: '/mathe/1921/h%C3%B6he-eines-dreiecks',
                        children: [
                          {
                            type: 'text',
                            text: 'Höhe des Dreiecks',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        text: ' ',
                      },
                      {
                        type: 'inline-math',
                        formula: '\\overline{AD}',
                        formulaSource: '\\overline{AD}',
                      },
                      {
                        type: 'text',
                        text: ' ist kleiner als der Radius ',
                      },
                      {
                        type: 'inline-math',
                        formula: 'r',
                        formulaSource: 'r',
                      },
                      {
                        type: 'text',
                        text: ', also die Länge ',
                      },
                      {
                        type: 'inline-math',
                        formula: '\\overline{AE}',
                        formulaSource: '\\overline{AE}',
                      },
                      {
                        type: 'text',
                        text: ' rechts im Bild.',
                      },
                    ],
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
                    text: 'Vergrößerst du jedoch die Anzahl der Kreissektoren, so kannst du den Flächeninhalt des Kreises immer besser durch den ',
                  },
                  {
                    type: 'a',
                    href: '/mathe/1949/dreieck',
                    children: [
                      {
                        type: 'text',
                        text: 'Flächeninhalt von Dreiecken',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    text: ' annähern.',
                  },
                ],
              },
              {
                type: 'slate-p',
                children: [],
              },
              {
                type: 'slate-p',
                children: [
                  {
                    type: 'text',
                    text: 'Die Länge der aneinandergelegten Kreissektoren gleicht bei vielen Unterteilungen nun näherungsweise dem Umfang.',
                  },
                ],
              },
            ],
          },
          {
            type: 'img',
            src: 'https://assets.serlo.org/legacy/58ec833faf5c4_72675f975ed09e3420ddc574a8c0ba8749783591.png',
            alt: 'Kreis 16-teilig',
            maxWidth: 275,
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
          {
            type: 'img',
            src: 'https://assets.serlo.org/5e858dbf1bdad_1fe43d21fdc111dfc6fb17ae4960bdee207557ee.jpg',
            alt: '16-teilig abgerollt',
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
          {
            type: 'multimedia',
            mediaWidth: 50,
            float: 'right',
            media: [
              {
                type: 'img',
                src: 'https://assets.serlo.org/legacy/58ec88e201264_0fb6aabd4decd42205b84eea49247de317fd277d.png',
                alt: 'Flächeninhalt eines Kreisteils',
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
                        text: 'Der Flächeninhalt des Dreiecks ',
                      },
                      {
                        type: 'inline-math',
                        formula: 'ABC',
                        formulaSource: 'ABC',
                      },
                      {
                        type: 'text',
                        text: ' entspricht nun fast dem Flächeninhalt eines Kreissektors und die Höhe des Dreiecks ist in etwa ',
                      },
                      {
                        type: 'inline-math',
                        formula: 'r',
                        formulaSource: 'r',
                      },
                      {
                        type: 'text',
                        text: ', also ',
                      },
                      {
                        type: 'inline-math',
                        formula: '\\overline{AE}',
                        formulaSource: '\\overline{AE}',
                      },
                      {
                        type: 'text',
                        text: '.',
                      },
                    ],
                  },
                  {
                    type: 'slate-p',
                    children: [
                      {
                        type: 'text',
                        text: 'Indem du die Kuchenstücke immer weiter unterteilst, erhöhst du die Anzahl der Kuchenstücke immer weiter. Dadurch erhältst du ganz viele Kreissektoren und kannst so den Flächeninhalt sehr genau bestimmen.',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'equations',
            steps: [
              {
                left: 'A_{\\Delta}',
                leftSource: 'A_{\\Delta}',
                sign: 'equals',
                right: '\\frac{1}{2}\\cdot\\overline{BC}\\cdot\\overline{AD}',
                rightSource:
                  '\\frac{1}{2}\\cdot\\overline{BC}\\cdot\\overline{AD}',
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
                            text: 'Bei sehr vielen Kreissektoren ist ',
                          },
                          {
                            type: 'inline-math',
                            formula: '\\overline{AD}',
                            formulaSource: '\\overline{AD}',
                          },
                          {
                            type: 'text',
                            text: ' in etwa so lang wie ',
                          },
                          {
                            type: 'inline-math',
                            formula: '\\overline{AE}',
                            formulaSource: '\\overline{AE}',
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
                sign: 'almost-equal-to',
                right: '\\frac{1}{2}\\cdot\\overline{BC}\\cdot\\overline{AE}',
                rightSource:
                  '\\frac{1}{2}\\cdot\\overline{BC}\\cdot\\overline{AE}',
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
                            type: 'inline-math',
                            formula: '\\overline{AE}',
                            formulaSource: '\\overline{AE}',
                          },
                          {
                            type: 'text',
                            text: ' entspricht dem Radius ',
                          },
                          {
                            type: 'inline-math',
                            formula: 'r',
                            formulaSource: 'r',
                          },
                          {
                            type: 'text',
                            text: ' des Kreises.',
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
                sign: 'almost-equal-to',
                right:
                  '\\frac{1}{2}\\cdot\\overline{BC}\\cdot\\overline{AE}=\\frac{1}{2}\\cdot\\overline{BC}\\cdot r',
                rightSource:
                  '\\frac{1}{2}\\cdot\\overline{BC}\\cdot\\overline{AE}=\\frac{1}{2}\\cdot\\overline{BC}\\cdot r',
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
                    children: [
                      {
                        type: 'text',
                        text: 'Stell dir hierfür eine ganz große natürliche Zahl ',
                      },
                      {
                        type: 'inline-math',
                        formula: 'n',
                        formulaSource: 'n',
                      },
                      {
                        type: 'text',
                        text: ' vor. Der Kreis soll in ',
                      },
                      {
                        type: 'inline-math',
                        formula: 'n',
                        formulaSource: 'n',
                      },
                      {
                        type: 'text',
                        text: ' Teile zerteilt werden. Ein Kuchenstück hat dann in etwa den Flächeninhalt eines Dreiecks:',
                      },
                    ],
                  },
                ],
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
                  {
                    type: 'text',
                    text: 'Nun nähern wir auch den Flächeninhalt des Dreiecks noch weiter an, um die Kreisfläche möglichst genau zu bestimmen.\nDie Länge ',
                  },
                  {
                    type: 'inline-math',
                    formula: '\\overline{BC}',
                    formulaSource: '\\overline{BC}',
                  },
                  {
                    type: 'text',
                    text: ' ist fast ein ',
                  },
                  {
                    type: 'inline-math',
                    formula: 'n',
                    formulaSource: 'n',
                  },
                  {
                    type: 'text',
                    text: '-tel des Umfangs. Durch addieren aller ',
                  },
                  {
                    type: 'inline-math',
                    formula: 'n',
                    formulaSource: 'n',
                  },
                  {
                    type: 'text',
                    text: ' Dreiecksflächen erhältst du näherungsweise die Formel für den Flächeninhalt des Kreises.',
                  },
                ],
              },
            ],
          },
          {
            type: 'equations',
            steps: [
              {
                left: 'A_{\\circ}',
                leftSource: 'A_{\\circ}',
                sign: 'almost-equal-to',
                right: 'n\\cdot A_{\\Delta}',
                rightSource: 'n\\cdot A_{\\Delta}',
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
                            text: 'Du ersetzt ',
                          },
                          {
                            type: 'inline-math',
                            formula: 'A_{\\Delta}',
                            formulaSource: 'A_{\\Delta}',
                          },
                          {
                            type: 'text',
                            text: ' durch die Formel zur Berechnung des Flächeninhalts des Dreiecks.',
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
                sign: 'almost-equal-to',
                right: 'n\\cdot(\\frac{1}{2}\\cdot\\overline{BC}\\cdot r)',
                rightSource:
                  'n\\cdot(\\frac{1}{2}\\cdot\\overline{BC}\\cdot r)',
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
                            text: 'Die Strecke ',
                          },
                          {
                            type: 'inline-math',
                            formula: '\\overline{BC}',
                            formulaSource: '\\overline{BC}',
                          },
                          {
                            type: 'text',
                            text: ' ist fast ein ',
                          },
                          {
                            type: 'inline-math',
                            formula: 'n',
                            formulaSource: 'n',
                          },
                          {
                            type: 'text',
                            text: '-tel des Umfangs. Der Umfang ',
                          },
                          {
                            type: 'inline-math',
                            formula: 'U',
                            formulaSource: 'U',
                          },
                          {
                            type: 'text',
                            text: ' ist ',
                          },
                          {
                            type: 'inline-math',
                            formula: '2\\pi r',
                            formulaSource: '2\\pi r',
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
                sign: 'almost-equal-to',
                right:
                  'n\\cdot(\\frac{1}{2}\\cdot(2\\pi r\\cdot\\frac{1}{n})\\cdot r)',
                rightSource:
                  'n\\cdot(\\frac{1}{2}\\cdot(2\\pi r\\cdot\\frac{1}{n})\\cdot r)',
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
                right: '\\pi\\cdot r^2',
                rightSource: '\\pi\\cdot r^2',
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
          },
          {
            type: 'slate-container',
            children: [
              {
                type: 'slate-p',
                children: [
                  {
                    type: 'text',
                    text: 'Durch Annähern der Kreissektoren an Dreiecke und näherungsweiser Berechnung des Flächeninhalts dieser Dreiecke erhältst du in diesem Fall glücklicherweise sogar exakt die Kreisfläche. ',
                  },
                ],
              },
              {
                type: 'slate-p',
                children: [
                  {
                    type: 'text',
                    text: 'Durch Unterteilung in unendlich viele Kreissektoren bestätigt sich, dass deine Näherung exakt ist: ',
                  },
                ],
              },
              {
                type: 'slate-p',
                children: [
                  {
                    type: 'inline-math',
                    formula: 'A_{\\circ} = \\pi r^2',
                    formulaSource: 'A_{\\circ} = \\pi r^2',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'slate-container',
        children: [
          {
            type: 'h',
            level: 2,
            children: [
              {
                type: 'text',
                text: 'Berechnung der Kreisbogenlänge',
              },
            ],
          },
        ],
      },
      {
        type: 'multimedia',
        mediaWidth: 50,
        float: 'right',
        media: [
          {
            type: 'img',
            src: 'https://assets.serlo.org/legacy/58ecbe6a58ce5_08c8e0a67329de398b57f2611d115762e72ecd08.png',
            alt: 'Bogenlänge',
            maxWidth: 300,
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
                    text: 'Die ',
                  },
                  {
                    type: 'a',
                    href: '/mathe/36162/kreis',
                    children: [
                      {
                        type: 'text',
                        text: 'Kreisbogenlänge',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    text: ' ',
                  },
                  {
                    type: 'inline-math',
                    formula: 'b',
                    formulaSource: 'b',
                  },
                  {
                    type: 'text',
                    text: ' kannst du über den vom Kreissektor eingeschlossenen ',
                  },
                  {
                    type: 'a',
                    href: 'https://de.serlo.org/mathe/geometrie/grundbegriffe/winkel/winkel',
                    children: [
                      {
                        type: 'text',
                        text: 'Winkel',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    text: ' ',
                  },
                  {
                    type: 'inline-math',
                    formula: '\\alpha',
                    formulaSource: '\\alpha',
                  },
                  {
                    type: 'text',
                    text: ' und den ',
                  },
                  {
                    type: 'a',
                    href: 'https://de.serlo.org/mathe/geometrie/dreiecke-vierecke-kreise-andere-ebene-figuren/kreise-kreisteile/radius',
                    children: [
                      {
                        type: 'text',
                        text: 'Radius',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    text: ' ',
                  },
                  {
                    type: 'inline-math',
                    formula: 'r',
                    formulaSource: 'r',
                  },
                  {
                    type: 'text',
                    text: ' bestimmen.  ',
                  },
                ],
              },
              {
                type: 'slate-p',
                children: [
                  {
                    type: 'text',
                    text: 'Der Kreis hat einen Innenwinkel von ',
                  },
                  {
                    type: 'inline-math',
                    formula: '360^{\\circ}.',
                    formulaSource: '360^{\\circ}.',
                  },
                  {
                    type: 'text',
                    text: '\nDas Verhältnis des ',
                  },
                  {
                    type: 'a',
                    href: 'https://de.serlo.org/mathe/geometrie/grundbegriffe/winkel/winkel',
                    children: [
                      {
                        type: 'text',
                        text: 'Winkel',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    text: ' ',
                  },
                  {
                    type: 'inline-math',
                    formula: '\\alpha',
                    formulaSource: '\\alpha',
                  },
                  {
                    type: 'text',
                    text: ' zu ',
                  },
                  {
                    type: 'inline-math',
                    formula: '360^{\\circ}',
                    formulaSource: '360^{\\circ}',
                  },
                  {
                    type: 'text',
                    text: ', gibt dir den Anteil der Kreisbogenlänge ',
                  },
                  {
                    type: 'inline-math',
                    formula: 'b',
                    formulaSource: 'b',
                  },
                  {
                    type: 'text',
                    text: ' vom Umfang ',
                  },
                  {
                    type: 'inline-math',
                    formula: 'U',
                    formulaSource: 'U',
                  },
                  {
                    type: 'text',
                    text: ' an.',
                  },
                ],
              },
              {
                type: 'slate-p',
                children: [],
              },
              {
                type: 'slate-p',
                children: [
                  {
                    type: 'text',
                    text: 'Du erhältst so die Formel:  ',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'box',
        boxType: 'blank',
        anchorId: 'box12995',
        title: [
          {
            type: 'slate-p',
            children: [],
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
                    type: 'inline-math',
                    formula:
                      'b = \\dfrac{\\alpha}{360^{\\circ}} \\cdot U = \\dfrac{\\alpha}{360^{\\circ}} \\cdot 2\\pi r',
                    formulaSource:
                      'b = \\dfrac{\\alpha}{360^{\\circ}} \\cdot U = \\dfrac{\\alpha}{360^{\\circ}} \\cdot 2\\pi r',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'slate-container',
        children: [
          {
            type: 'h',
            level: 2,
            children: [
              {
                type: 'text',
                text: 'Berechnung der Sektorfläche',
              },
            ],
          },
        ],
      },
      {
        type: 'multimedia',
        mediaWidth: 50,
        float: 'right',
        media: [
          {
            type: 'img',
            src: 'https://assets.serlo.org/legacy/58ecc07498855_aab2092f38932baf7fd9ada8de25a248af1f8fc2.png',
            alt: 'Sektorfläche',
            maxWidth: 300,
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
                    text: 'Die ',
                  },
                  {
                    type: 'a',
                    href: '/mathe/36162/kreis',
                    children: [
                      {
                        type: 'text',
                        text: 'Sektorfläche',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    text: ' bestimmst du auch über das Verhältnis des Winkels ',
                  },
                  {
                    type: 'inline-math',
                    formula: '\\alpha',
                    formulaSource: '\\alpha',
                  },
                  {
                    type: 'text',
                    text: ' zu ',
                  },
                  {
                    type: 'inline-math',
                    formula: '360^{\\circ}',
                    formulaSource: '360^{\\circ}',
                  },
                  {
                    type: 'text',
                    text: '. Dieses Verhältnis gibt dir an, welchen Anteil der Flächeninhalt vom Kreissektor zum Flächeninhalt des ganzen Kreises hat.  ',
                  },
                ],
              },
              {
                type: 'slate-p',
                children: [],
              },
              {
                type: 'slate-p',
                children: [
                  {
                    type: 'text',
                    text: 'Die Formel zur Berechnung der Sektorfläche lautet also:  ',
                  },
                ],
              },
              {
                type: 'slate-p',
                children: [],
              },
            ],
          },
        ],
      },
      {
        type: 'box',
        boxType: 'blank',
        anchorId: 'box36790',
        title: [
          {
            type: 'slate-p',
            children: [],
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
                    type: 'inline-math',
                    formula:
                      'A_\\mathrm{s} = \\dfrac{\\alpha}{360^{\\circ}} \\cdot A_{\\circ} = \\dfrac{\\alpha}{360^{\\circ}} \\cdot \\pi r^2',
                    formulaSource:
                      'A_\\mathrm{s} = \\dfrac{\\alpha}{360^{\\circ}} \\cdot A_{\\circ} = \\dfrac{\\alpha}{360^{\\circ}} \\cdot \\pi r^2',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'slate-container',
        children: [
          {
            type: 'h',
            level: 2,
            children: [
              {
                type: 'text',
                text: 'Berechnung des Kreisrings',
              },
            ],
          },
        ],
      },
      {
        type: 'multimedia',
        mediaWidth: 50,
        float: 'right',
        media: [
          {
            type: 'img',
            src: 'https://assets.serlo.org/5aafb73ee25f0_38c2b2b09b5da73ce914473b646494146e3cc5b5.PNG',
            alt: 'zwei Kreise mit gleichem Mittelpunkt und verschiedenen Radien',
            maxWidth: 300,
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
                    text: 'Ein Kreisring ist die Fläche zwischen zwei Kreisen mit demselben Mittelpunkt. ',
                  },
                ],
              },
              {
                type: 'slate-p',
                children: [
                  {
                    type: 'text',
                    text: 'Hier siehst du zwei Kreise mit dem Mittelpunkt M.',
                  },
                ],
              },
              {
                type: 'slate-p',
                children: [
                  {
                    type: 'text',
                    text: '\nDer kleine Kreis hat den ',
                  },
                  {
                    type: 'a',
                    href: 'https://de.serlo.org/mathe/geometrie/dreiecke-vierecke-kreise-andere-ebene-figuren/kreise-kreisteile/radius',
                    children: [
                      {
                        type: 'text',
                        text: 'Radius',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    text: ' ',
                  },
                  {
                    type: 'inline-math',
                    formula: 'r_1',
                    formulaSource: 'r_1',
                  },
                  {
                    type: 'text',
                    text: ', der große Kreis hat den Radius ',
                  },
                  {
                    type: 'inline-math',
                    formula: 'r_2',
                    formulaSource: 'r_2',
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
        type: 'multimedia',
        mediaWidth: 50,
        float: 'right',
        media: [
          {
            type: 'img',
            src: 'https://assets.serlo.org/5aafb746687f9_acefb1af01b1536a0c6cacb4318b7fa5fa386114.PNG',
            alt: 'Kreisring mit Radius r1 und r2 und Mittelpunkt M',
            maxWidth: 300,
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
                    text: 'Den Flächeninhalt des Kreisrings berechnest du dadurch, dass du die beiden Kreisflächen voneinander ',
                  },
                  {
                    type: 'a',
                    href: '/mathe/1507/subtraktion',
                    children: [
                      {
                        type: 'text',
                        text: 'subtrahierst',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    text: ':',
                  },
                ],
              },
            ],
          },
          {
            type: 'box',
            boxType: 'blank',
            anchorId: 'box99289',
            title: [
              {
                type: 'slate-p',
                children: [],
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
                        type: 'inline-math',
                        formula:
                          '\\def\\arraystretch{1.25} \\begin{aligned}A_\\text{Kreisring} &= A_\\text{Kreis groß} \\;–\\; A_\\text{Kreis klein}  \\\\&= \\pi \\cdot r_2^2 \\; – \\; \\pi \\cdot r_1^2 \\\\&= \\pi \\cdot ( r_2^2 \\; – \\; r_1^2) \\end{aligned}',
                        formulaSource:
                          '\\begin{aligned}A_\\text{Kreisring} &= A_\\text{Kreis groß} \\;–\\; A_\\text{Kreis klein}  \\\\&= \\pi \\cdot r_2^2 \\; – \\; \\pi \\cdot r_1^2 \\\\&= \\pi \\cdot ( r_2^2 \\; – \\; r_1^2) \\end{aligned}',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'slate-container',
        children: [
          {
            type: 'h',
            level: 2,
            children: [
              {
                type: 'text',
                text: 'Video zur Flächenberechnung',
              },
            ],
          },
        ],
      },
      {
        type: 'video',
        src: 'https://www.youtube.com/watch?v=B8eVrg1ki5g',
      },
    ],
    exercises: [
      {
        type: 'injection',
        href: '5273',
      },
    ],
    exerciseFolder: {
      id: '30560',
      title: 'Aufgaben zu Kreisen und Kreisteilen',
    },
    relatedContent: {
      articles: [
        {
          id: '1557',
          title: 'Radius',
        },
        {
          id: '2107',
          title: 'Kreiszahl Pi',
        },
        {
          id: '36264',
          title: 'Kreissektor',
        },
      ],
      courses: [],
      videos: [],
    },
    sources: [],
  },
]
