// For new Tests: Prefer manually crafted data over long API answers for tests
// e.g. JSON.stringify([[{ col: 24, content: "## Hello World"}]])

import { UuidType } from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'

export const articleUuidMock = {
  __typename: UuidType.Article,
  id: 27801,
  alias:
    '/mathe/zahlen-groessen/bruchrechnen-dezimalzahlen/dezimalbrueche/addition-subtraktion-dezimalbruechen',
  instance: 'de',
  license: {
    id: 1,
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
    title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
  },
  taxonomyTerms: {
    nodes: [
      {
        navigation: {
          path: {
            nodes: [
              { label: 'Mathematics', url: '/math' },
              { label: 'All topics', url: '/math/1' },
            ],
          },
        },
      },
      {
        navigation: {
          path: {
            nodes: [
              { label: 'Mathematics', url: '/math' },
              { label: 'Class 6', url: '/math/class-6' },
            ],
          },
        },
      },
    ],
  },
  currentRevision: {
    title: 'Addition und Subtraktion von Dezimalbrüchen',
    content:
      '{"plugin":"article","state":{"introduction":{"plugin":"articleIntroduction","state":{"explanation":{"plugin":"text","state":[{"type":"p","children":[{"text":"Um "},{"type":"a","href":"/27823","children":[{"text":"Dezimalbrüche"}]},{"text":" zu "},{"type":"a","href":"/1495","children":[{"text":"addieren"}]},{"text":" oder zu "},{"type":"a","href":"/1507","children":[{"text":"subtrahieren"}]},{"text":", geht man ähnlich vor wie bei der "},{"type":"a","href":"/2153","children":[{"text":"schriftlichen Addition"}]},{"text":" bzw. "},{"type":"a","href":"/1507","children":[{"text":"Subtraktion"}]},{"text":"."}]}]},"multimedia":{"plugin":"image","state":{"src":"","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},"illustrating":true,"width":50}},"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Addition"}]},{"type":"p","children":[{"text":"Es gibt mehrere Methoden, "},{"type":"a","href":"/27823","children":[{"text":"Dezimalbrüche"}]},{"text":" zu addieren. Üblich ist es, "}]},{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"die Zahlen untereinander zu schreiben und "},{"type":"a","href":"/2153","children":[{"text":"schriftlich zu addieren"}]},{"text":""}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"oder sie in "},{"type":"a","href":"/27800","children":[{"text":"Brüche umzuwandeln"}]},{"text":" und anschließend zu "},{"type":"a","href":"/1619","children":[{"text":"addieren"}]},{"text":"."}]}]}]}]}]},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Vorgehensweise mit schriftlicher Addition"}]}]},{"plugin":"serloTable","state":{"tableType":"OnlyColumnHeader","rows":[{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Beschreibung","strong":true}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Rechnung","strong":true}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Schreibe die Zahlen so untereinander, dass die Kommas direkt untereinander sind."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"type":"math","src":"\\\\phantom{+}6,256 \\\\\\\\+2,73","inline":true,"children":[{"text":"\\\\phantom{+}6,256 \\\\\\\\+2,73"}]}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Falls die Zahlen unterschiedlich viele Stellen nach dem Komma haben, müssen fehlende Nachkommastellen mit Nullen aufgefüllt werden."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"type":"math","src":"\\\\begin{array}{l}\\\\hphantom{ +\\\\; } 6\\\\color{red}{,}256\\\\\\\\+\\\\;2\\\\color{red}{,}73\\\\\\\\\\\\\\\\\\\\end{array}","inline":true,"children":[{"text":"\\\\begin{array}{l}\\\\hphantom{ +\\\\; } 6\\\\color{red}{,}256\\\\\\\\+\\\\;2\\\\color{red}{,}73\\\\\\\\\\\\\\\\\\\\end{array}"}]}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Als Nächstes wird schriftlich addiert, ohne die Kommas zu beachten. Im nächsten Schritt werden diese wieder berücksichtigt."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"type":"math","src":"\\\\begin{array}{l}\\\\hphantom{ +\\\\; } 6,256\\\\\\\\+\\\\;2,73\\\\color{red}{0}\\\\\\\\\\\\\\\\\\\\end{array}","inline":true,"children":[{"text":"\\\\begin{array}{l}\\\\hphantom{ +\\\\; } 6,256\\\\\\\\+\\\\;2,73\\\\color{red}{0}\\\\\\\\\\\\\\\\\\\\end{array}"}]}]}]}}]},{"columns":[{"content":{"plugin":"text"}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"type":"math","src":"\\\\begin{array}{l}\\\\hphantom{ +\\\\; } 6,256\\\\\\\\\\\\underline{+\\\\;2,730}\\\\\\\\\\\\hphantom{ +\\\\; }8\\\\,\\\\ 986\\\\end{array}","inline":true,"children":[{"text":"\\\\begin{array}{l}\\\\hphantom{ +\\\\; } 6,256\\\\\\\\\\\\underline{+\\\\;2,730}\\\\\\\\\\\\hphantom{ +\\\\; }8\\\\,\\\\ 986\\\\end{array}"}]}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Setze im Ergebnis das Komma direkt unter die anderen Kommas."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"type":"math","src":"\\\\begin{array}{l}\\\\hphantom{ +\\\\; } 6,256\\\\\\\\\\\\underline{+\\\\;2,730}\\\\\\\\\\\\hphantom{ +\\\\; }8\\\\color{red}{,}986\\\\end{array}","inline":true,"children":[{"text":"\\\\begin{array}{l}\\\\hphantom{ +\\\\; } 6,256\\\\\\\\\\\\underline{+\\\\;2,730}\\\\\\\\\\\\hphantom{ +\\\\; }8\\\\color{red}{,}986\\\\end{array}"}]}]}]}}]}]}},{"plugin":"box","state":{"title":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"  "}]},{"type":"p","children":[{"text":"Merke","strong":true},{"text":": \\"Komma über Komma\\""}]}]}]},"type":"blank","anchorId":"box91434"}},{"plugin":"spoiler","state":{"title":"Vertiefung: Warum funktioniert dieses Verfahren?","content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Man sieht leicht wieso dieses Verfahren funktioniert, wenn man die Dezimalbrüche in "},{"type":"a","href":"/27800","children":[{"text":"Brüche umwandelt"}]},{"text":" und das "},{"type":"a","href":"/1679","children":[{"text":"Kommutativ-"}]},{"text":" und "},{"type":"a","href":"/1671","children":[{"text":"Assoziativgesetz"}]},{"text":"  nutzt."}]},{"type":"h","level":4,"children":[{"text":"Beispiel"}]},{"type":"p","children":[{"type":"math","src":"\\\\begin{array}{l}6,256+2,73=\\\\left(6+\\\\frac2{10}+\\\\frac5{100}+\\\\frac6{1000}\\\\right)+\\\\left(2+\\\\frac7{10}+\\\\frac3{100}\\\\right)\\\\\\\\=6+2+\\\\left(\\\\frac2{10}+\\\\frac7{10}\\\\right)+\\\\left(\\\\frac5{100}+\\\\frac3{100}\\\\right)+\\\\frac6{1000}\\\\\\\\=8+\\\\frac9{10}+\\\\frac8{100}+\\\\frac6{1000}\\\\\\\\=8,986\\\\end{array}","inline":false,"children":[{"text":"\\\\begin{array}{l}6,256+2,73=\\\\left(6+\\\\frac2{10}+\\\\frac5{100}+\\\\frac6{1000}\\\\right)+\\\\left(2+\\\\frac7{10}+\\\\frac3{100}\\\\right)\\\\\\\\=6+2+\\\\left(\\\\frac2{10}+\\\\frac7{10}\\\\right)+\\\\left(\\\\frac5{100}+\\\\frac3{100}\\\\right)+\\\\frac6{1000}\\\\\\\\=8+\\\\frac9{10}+\\\\frac8{100}+\\\\frac6{1000}\\\\\\\\=8,986\\\\end{array}"}]}]}]}]}}},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Video zur Addition von Dezimalbrüchen"}]}]},{"plugin":"injection","state":"101551"},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Vorgehensweise mithilfe von Umrechnung zu Brüchen"}]},{"type":"p","children":[{"text":"Statt direkt mit den Dezimalbrüchen zu rechnen, kann man diese auch "},{"type":"a","href":"/28296","children":[{"text":"in Brüche umwandeln"}]},{"text":" und anschließend "},{"type":"a","href":"/1619","children":[{"text":"addieren"}]},{"text":"."}]},{"type":"p","children":[{"text":"Dieses Verfahren verwendet man vor allem bei "},{"type":"a","href":"/2115","children":[{"text":"periodischen Brüchen"}]},{"text":"."}]}]},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Subtraktion"}]},{"type":"p","children":[{"text":"Wieder gibt es mehrere Methoden "},{"type":"a","href":"/27823","children":[{"text":"Dezimalbrüche"}]},{"text":" zu subtrahieren. Man kann sie "}]},{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"untereinander schreiben und "},{"type":"a","href":"/1507","children":[{"text":"schriftlich subtrahieren"}]},{"text":""}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"oder in "},{"type":"a","href":"/27800","children":[{"text":"Brüche umwandeln"}]},{"text":" und diese "},{"type":"a","href":"/1619","children":[{"text":"Brüche subtrahieren"}]},{"text":"."}]}]}]}]}]},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Vorgehensweise mit schriftlicher Subtraktion"}]}]},{"plugin":"serloTable","state":{"tableType":"OnlyColumnHeader","rows":[{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Beschreibung","strong":true}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Rechnung","strong":true}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Schreibe die Zahlen so untereinander, dass die Kommas direkt untereinander sind."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"type":"math","src":"\\\\phantom{-}6,623\\\\\\\\-4,71","inline":true,"children":[{"text":"\\\\phantom{-}6,623\\\\\\\\-4,71"}]}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Falls die Zahlen unterschiedlich viele Stellen nach dem Komma haben, müssen fehlende Nachkommastellen mit Nullen aufgefüllt werden."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"type":"math","src":"\\\\begin{array}{l}\\\\hphantom{ -\\\\; } 6\\\\color{red}{,}623\\\\\\\\-\\\\;4\\\\color{red}{,}71\\\\\\\\\\\\\\\\\\\\end{array}","inline":true,"children":[{"text":"\\\\begin{array}{l}\\\\hphantom{ -\\\\; } 6\\\\color{red}{,}623\\\\\\\\-\\\\;4\\\\color{red}{,}71\\\\\\\\\\\\\\\\\\\\end{array}"}]}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Als Nächstes wird schriftlich subtrahiert, ohne die Kommas zu beachten. Im nächsten Schritt werden diese wieder berücksichtigt."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"type":"math","src":"\\\\begin{array}{l}\\\\hphantom{ -\\\\; } 6,623\\\\\\\\-\\\\;4,71\\\\color{red}{0}\\\\\\\\\\\\\\\\\\\\end{array}","inline":true,"children":[{"text":"\\\\begin{array}{l}\\\\hphantom{ -\\\\; } 6,623\\\\\\\\-\\\\;4,71\\\\color{red}{0}\\\\\\\\\\\\\\\\\\\\end{array}"}]}]}]}}]},{"columns":[{"content":{"plugin":"text"}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"type":"math","src":"\\\\begin{array}{l}\\\\hphantom{ -\\\\; } \\\\overset{5}{\\\\not6},\\\\overset{16}{\\\\not6}\\\\;2\\\\;3\\\\\\\\\\\\underline{-\\\\;\\\\;4,\\\\;7\\\\;1\\\\;0}\\\\\\\\\\\\hphantom{-\\\\;}\\\\;1\\\\,\\\\ \\\\;9\\\\;1\\\\;3\\\\\\\\\\\\end{array}","inline":true,"children":[{"text":"\\\\begin{array}{l}\\\\hphantom{ -\\\\; } \\\\overset{5}{\\\\not6},\\\\overset{16}{\\\\not6}\\\\;2\\\\;3\\\\\\\\\\\\underline{-\\\\;\\\\;4,\\\\;7\\\\;1\\\\;0}\\\\\\\\\\\\hphantom{-\\\\;}\\\\;1\\\\,\\\\ \\\\;9\\\\;1\\\\;3\\\\\\\\\\\\end{array}"}]}]}]}}]},{"columns":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":"Im Ergebnis wird jetzt das Komma direkt unter die anderen gesetzt."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"type":"math","src":"\\\\begin{array}{l}\\\\hphantom{ -\\\\; } \\\\overset{5}{\\\\not6},\\\\overset{16}{\\\\not6}\\\\;2\\\\;3\\\\\\\\\\\\underline{-\\\\;\\\\;4,\\\\;7\\\\;1\\\\;0}\\\\\\\\\\\\hphantom{-\\\\;}\\\\;1\\\\color{red}{,}\\\\;9\\\\;1\\\\;3\\\\\\\\\\\\end{array}","inline":true,"children":[{"text":"\\\\begin{array}{l}\\\\hphantom{ -\\\\; } \\\\overset{5}{\\\\not6},\\\\overset{16}{\\\\not6}\\\\;2\\\\;3\\\\\\\\\\\\underline{-\\\\;\\\\;4,\\\\;7\\\\;1\\\\;0}\\\\\\\\\\\\hphantom{-\\\\;}\\\\;1\\\\color{red}{,}\\\\;9\\\\;1\\\\;3\\\\\\\\\\\\end{array}"}]}]}]}}]}]}},{"plugin":"spoiler","state":{"title":"Vertiefung: Warum funktioniert dieses Verfahren?","content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Man sieht leicht wieso dieses Verfahren funktioniert, wenn man die Dezimalbrüche in "},{"type":"a","href":"/27800","children":[{"text":"Brüche umwandelt"}]},{"text":" und das "},{"type":"a","href":"/1679","children":[{"text":"Kommutativ-"}]},{"text":" und "},{"type":"a","href":"/1671","children":[{"text":"Assoziativgesetz"}]},{"text":" nutzt."}]},{"type":"h","level":4,"children":[{"text":"Beispiel"}]},{"type":"p","children":[{"type":"math","src":"\\\\begin{array}{l}\\\\begin{array}{l}6,623-4,71=\\\\left(6+\\\\frac6{10}+\\\\frac2{100}+\\\\frac3{1000}\\\\right)-\\\\left(4+\\\\frac7{10}+\\\\frac1{100}\\\\right)\\\\\\\\=6-4+\\\\left(\\\\frac6{10}-\\\\frac7{10}\\\\right)+\\\\left(\\\\frac2{100}-\\\\frac1{100}\\\\right)+\\\\frac3{1000}\\\\end{array}\\\\\\\\=2-\\\\frac1{10}+\\\\frac1{100}+\\\\frac3{1000}\\\\\\\\=1,913\\\\\\\\\\\\end{array}","inline":false,"children":[{"text":"\\\\begin{array}{l}\\\\begin{array}{l}6,623-4,71=\\\\left(6+\\\\frac6{10}+\\\\frac2{100}+\\\\frac3{1000}\\\\right)-\\\\left(4+\\\\frac7{10}+\\\\frac1{100}\\\\right)\\\\\\\\=6-4+\\\\left(\\\\frac6{10}-\\\\frac7{10}\\\\right)+\\\\left(\\\\frac2{100}-\\\\frac1{100}\\\\right)+\\\\frac3{1000}\\\\end{array}\\\\\\\\=2-\\\\frac1{10}+\\\\frac1{100}+\\\\frac3{1000}\\\\\\\\=1,913\\\\\\\\\\\\end{array}"}]}]}]}]}}},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Video zur Subtraktion von Dezimalbrüchen"}]}]},{"plugin":"injection","state":"/51295"},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Vorgehensweise mithilfe von Umrechnung zu Brüchen"}]},{"type":"p","children":[{"text":"Statt direkt mit den Dezimalbrüchen zu rechnen, kann man diese auch "},{"type":"a","href":"/28296","children":[{"text":"in Brüche umwandeln"}]},{"text":"  und anschließend "},{"type":"a","href":"/1619","children":[{"text":"subtrahieren"}]},{"text":" ."}]},{"type":"p","children":[{"text":"Dieses Verfahren verwendet man vor allem bei "},{"type":"a","href":"/2115","children":[{"text":"periodischen Brüchen"}]},{"text":"."}]}]}]},"exercises":[{"plugin":"injection","state":"/20936"},{"plugin":"injection","state":"/20942"},{"plugin":"injection","state":"/20952"},{"plugin":"injection","state":"/21095"},{"plugin":"injection","state":"/21101"},{"plugin":"injection","state":"/21107"}],"exerciseFolder":{"id":"25111","title":"Aufgaben zur Addition und Subtraktion von Dezimalbrüchen"},"relatedContent":{"articles":[],"courses":[],"videos":[]},"sources":[]}}',
    metaTitle: '',
    metaDescription: '',
  },
}

export const taxonomyTermUuidMock = {
  __typename: UuidType.TaxonomyTerm,
  id: 5,
  type: TaxonomyTermType.Subject,
  name: 'Mathe',
  description: '',
  alias: '/mathe/5',
  instance: 'de',
  navigation: {
    path: {
      nodes: [
        {
          label: 'Mathematik',
          url: '/mathe',
          id: 19767,
        },
        {
          label: 'Alle Themen',
          url: '/mathe/5',
        },
      ],
    },
  },
  children: {
    nodes: [
      {
        trashed: true,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Universität alt',
        alias: '/mathe/universität-alt',
        id: 43972,
        description: '',
        children: {
          nodes: [
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/universität-alt/tu-münchen',
              type: TaxonomyTermType.Topic,
              name: 'TU München',
            },
          ],
        },
      },
      {
        trashed: true,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Analysis - neu',
        alias: '/mathe/analysis---neu',
        id: 22951,
        description: '',
        children: {
          nodes: [
            {
              trashed: false,
              __typename: UuidType.Article,
              alias: null,
              id: 23436,
              currentRevision: null,
            },
          ],
        },
      },
      {
        trashed: true,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Arithmetik und Rechnen Rechnen und Zahlen - neuer Themenbaum ',
        alias: '/mathe/arithmetik-rechnen-rechnen-zahlen---neuer-themenbaum',
        id: 22763,
        description: 'In diesem Ordner befinden sich:',
        children: {
          nodes: [],
        },
      },
      {
        trashed: false,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Zahlen und Größen',
        alias: '/mathe/zahlen-größen',
        id: 1385,
        description:
          '{"plugin":"rows","state":[{"plugin":"image","state":{"alt":"Zahlen und Größen, Zahlen, Plus, Gewicht, Akku, Kuchendiagramm","src":"https://assets.serlo.org/legacy/56fe2459b0d79_5575d451f8bdf35b3a137cea4fd7332d69a514d1.png","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]}',
        children: {
          nodes: [
            {
              trashed: false,
              __typename: UuidType.Exercise,
            },
            {
              trashed: false,
              __typename: UuidType.Article,
              alias: null,
              id: 26452,
              currentRevision: null,
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/zahlen-größen/Übersicht-aller-artikel-zahlen-größen',
              type: TaxonomyTermType.Topic,
              name: 'Übersicht aller Artikel zu Zahlen und Größen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/zahlen-größen/grundrechenarten',
              type: TaxonomyTermType.Topic,
              name: 'Grundrechenarten',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/zahlen-größen/zahlenmengen,-rechenausdrücke-allgemeine-rechengesetze',
              type: TaxonomyTermType.Topic,
              name: 'Zahlenmengen, Rechenausdrücke und allgemeine Rechengesetze',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/zahlen-größen/teiler-primzahlen',
              type: TaxonomyTermType.Topic,
              name: 'Teiler und Primzahlen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/zahlen-größen/quersumme,-durchschnitt-betrag',
              type: TaxonomyTermType.Topic,
              name: 'Quersumme, Durchschnitt und Betrag',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/zahlen-größen/bruchrechnen-dezimalzahlen',
              type: TaxonomyTermType.Topic,
              name: 'Bruchrechnen und Dezimalzahlen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/zahlen-größen/prozent--zinsrechnung',
              type: TaxonomyTermType.Topic,
              name: 'Prozent- und Zinsrechnung',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/zahlen-größen/proportionalität-dreisatz',
              type: TaxonomyTermType.Topic,
              name: 'Proportionalität und Dreisatz',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/zahlen-größen/größen-einheiten',
              type: TaxonomyTermType.Topic,
              name: 'Größen und Einheiten',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/zahlen-größen/sonstiges',
              type: TaxonomyTermType.Topic,
              name: 'Sonstiges',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/zahlen-größen/eiten-umrechnen',
              type: TaxonomyTermType.ExerciseFolder,
              name: 'eiten umrechnen',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/zahlen-größen/gelöschte-topics---recyclen',
              type: TaxonomyTermType.Topic,
              name: 'Gelöschte topics - zum Recyclen',
            },
          ],
        },
      },
      {
        trashed: false,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Terme und Gleichungen',
        alias: '/mathe/terme-gleichungen',
        id: 1390,
        description: null,
        children: {
          nodes: [
            {
              trashed: false,
              __typename: UuidType.Article,
              alias: null,
              id: 122193,
              currentRevision: null,
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/terme-gleichungen/Übersicht-aller-artikel-terme-gleichungen',
              type: TaxonomyTermType.Topic,
              name: 'Übersicht aller Artikel zu Terme und Gleichungen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/terme-gleichungen/potenzen,-wurzeln-logarithmen',
              type: TaxonomyTermType.Topic,
              name: 'Potenzen, Wurzeln und Logarithmen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/terme-gleichungen/terme-variablen',
              type: TaxonomyTermType.Topic,
              name: 'Terme und Variablen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/terme-gleichungen/gleichungen',
              type: TaxonomyTermType.Topic,
              name: 'Gleichungen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/terme-gleichungen/ungleichungen',
              type: TaxonomyTermType.Topic,
              name: 'Ungleichungen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/terme-gleichungen/gleichungssysteme',
              type: TaxonomyTermType.Topic,
              name: 'Gleichungssysteme',
            },
          ],
        },
      },
      {
        trashed: true,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Terme ausmultiplizieren t4',
        alias: '/mathe/terme-ausmultiplizieren-t4',
        id: 1334,
        description: '',
        children: {
          nodes: [
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/terme-ausmultiplizieren-t4/cramersche-regell',
              type: TaxonomyTermType.Topic,
              name: 'Cramersche Regell',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/terme-ausmultiplizieren-t4/terme-faktorisieren-t4',
              type: TaxonomyTermType.Topic,
              name: 'Terme faktorisieren t4',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/terme-ausmultiplizieren-t4/terme-zusammenfassen-t4',
              type: TaxonomyTermType.Topic,
              name: 'Terme zusammenfassen t4',
            },
          ],
        },
      },
      {
        trashed: false,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Geometrie',
        alias: '/mathe/geometrie',
        id: 1288,
        description:
          '{"plugin":"rows","state":[{"plugin":"image","state":{"alt":"Geometrie, Objekt, Zirkel, Geodreieck","src":"https://assets.serlo.org/legacy/56f2762a092dc_f1628674a763bc0c744b7272734bc0e026cef127.svg","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]}',
        children: {
          nodes: [
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/geometrie/Übersicht-aller-artikel,-videos-kurse-geometrie',
              type: TaxonomyTermType.Topic,
              name: 'Übersicht aller Artikel, Videos und Kurse zur Geometrie',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/geometrie/grundbegriffe',
              type: TaxonomyTermType.Topic,
              name: 'Grundbegriffe',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/geometrie/dreiecke,-vierecke,-kreise-andere-ebene-figuren',
              type: TaxonomyTermType.Topic,
              name: 'Dreiecke, Vierecke, Kreise und andere ebene Figuren',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/geometrie/räumliche-figuren',
              type: TaxonomyTermType.Topic,
              name: 'Räumliche Figuren',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/geometrie/tangenten-sekanten-kreis',
              type: TaxonomyTermType.Topic,
              name: 'Tangenten und Sekanten am Kreis',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/geometrie/konstruktion-geometrischen-objekten',
              type: TaxonomyTermType.Topic,
              name: 'Konstruktion von geometrischen Objekten',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/geometrie/spiegelung,-zentrische-streckung-andere-abbildungen-ebene',
              type: TaxonomyTermType.Topic,
              name: 'Spiegelung, zentrische Streckung und andere Abbildungen in der Ebene',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/geometrie/strahlensatz-vierstreckensatz,-Ähnlichkeit',
              type: TaxonomyTermType.Topic,
              name: 'Strahlensatz oder Vierstreckensatz, Ähnlichkeit',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/geometrie/satzgruppe-pythagoras',
              type: TaxonomyTermType.Topic,
              name: 'Satzgruppe des Pythagoras',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/geometrie/sinus,-kosinus-tangens',
              type: TaxonomyTermType.Topic,
              name: 'Sinus, Kosinus und Tangens',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/geometrie/analytische-geometrie',
              type: TaxonomyTermType.Topic,
              name: 'Analytische Geometrie',
            },
          ],
        },
      },
      {
        trashed: true,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 't4 Quader',
        alias: '/mathe/t4-quader',
        id: 1339,
        description: '',
        children: {
          nodes: [
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/t4-quader/geradengleichungen-raum--alt',
              type: TaxonomyTermType.Topic,
              name: 'Geradengleichungen im Raum -alt',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/t4-quader/t4-kugel',
              type: TaxonomyTermType.Topic,
              name: 't4 Kugel',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/t4-quader/t4-gemischte-aufgaben-volumen--massenberechnung',
              type: TaxonomyTermType.Topic,
              name: 't4 Gemischte Aufgaben zu Volumen- und Massenberechnung',
            },
          ],
        },
      },
      {
        trashed: false,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Funktionen',
        alias: '/mathe/funktionen',
        id: 1289,
        description:
          '{"plugin":"rows","state":[{"plugin":"image","state":{"alt":"Funktionen Graph","src":"https://assets.serlo.org/legacy/56fea7de3bd00_06b8dfb93b45b964a5f5a136129c9e4ecc04f46f.png","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]}',
        children: {
          nodes: [
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/funktionen/Übersicht-aller-artikel-funktionen',
              type: TaxonomyTermType.Topic,
              name: 'Übersicht aller Artikel zu Funktionen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/funktionen/funktionsbegriff',
              type: TaxonomyTermType.Topic,
              name: 'Funktionsbegriff',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften',
              type: TaxonomyTermType.Topic,
              name: 'Wichtige Funktionstypen und ihre Eigenschaften',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/funktionen/grenzwerte,-stetigkeit-differenzierbarkeit',
              type: TaxonomyTermType.Topic,
              name: 'Grenzwerte, Stetigkeit und Differenzierbarkeit',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/funktionen/ableitung-funktionen',
              type: TaxonomyTermType.Topic,
              name: 'Ableitung von Funktionen ',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/funktionen/stammfunktion,-integral-flächenberechnung',
              type: TaxonomyTermType.Topic,
              name: 'Stammfunktion, Integral und Flächenberechnung',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/funktionen/kurvendiskussion',
              type: TaxonomyTermType.Topic,
              name: 'Kurvendiskussion',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/funktionen/funktionsscharen',
              type: TaxonomyTermType.Topic,
              name: 'Funktionsscharen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/funktionen/anwendungszusammenhänge-anderes',
              type: TaxonomyTermType.Topic,
              name: 'Anwendungszusammenhänge und anderes',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/funktionen/gemischtes,-Überblick-vertiefung',
              type: TaxonomyTermType.Topic,
              name: 'Gemischtes, Überblick und Vertiefung',
            },
          ],
        },
      },
      {
        trashed: false,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Stochastik',
        alias: '/mathe/stochastik',
        id: 1290,
        description:
          '{"plugin":"rows","state":[{"plugin":"image","state":{"alt":"Stockastik, Würfel","src":"https://assets.serlo.org/legacy/570398392a5e3_63264b5739d4d199e4621c0174cf2546bf598cc5.png","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]}',
        children: {
          nodes: [
            {
              trashed: false,
              __typename: UuidType.Video,
              alias: null,
              id: 141895,
              currentRevision: null,
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/stochastik/Übersicht-aller-artikel-stochastik',
              type: TaxonomyTermType.Topic,
              name: 'Übersicht aller Artikel zur Stochastik',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/stochastik/grundbegriffe-methoden',
              type: TaxonomyTermType.Topic,
              name: 'Grundbegriffe und Methoden',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/stochastik/kombinatorik',
              type: TaxonomyTermType.Topic,
              name: 'Kombinatorik',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/stochastik/daten-datendarstellung',
              type: TaxonomyTermType.Topic,
              name: 'Daten und Datendarstellung',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/stochastik/relative-häufigkeit-wahrscheinlichkeit',
              type: TaxonomyTermType.Topic,
              name: 'Relative Häufigkeit und Wahrscheinlichkeit',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/stochastik/bedingte-wahrscheinlichkeit-unabhängigkeit',
              type: TaxonomyTermType.Topic,
              name: 'Bedingte Wahrscheinlichkeit und Unabhängigkeit',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/stochastik/zufallsgrößen',
              type: TaxonomyTermType.Topic,
              name: 'Zufallsgrößen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/stochastik/wichtige-modelle-verteilungen',
              type: TaxonomyTermType.Topic,
              name: 'Wichtige Modelle und Verteilungen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/stochastik/hypothesentests',
              type: TaxonomyTermType.Topic,
              name: 'Hypothesentests',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/stochastik/hypothesentest',
              type: TaxonomyTermType.Topic,
              name: 'Hypothesentest',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/stochastik/gemischte-aufgaben-grundbegriffen-stochastik',
              type: TaxonomyTermType.Topic,
              name: 'Gemischte Aufgaben zu den Grundbegriffen der Stochastik',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/stochastik/wahrscheinlichkeit',
              type: TaxonomyTermType.Topic,
              name: 'Wahrscheinlichkeit',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/stochastik/tafelwerk-stochastik',
              type: TaxonomyTermType.Topic,
              name: 'Tafelwerk der Stochastik',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/stochastik/aufgaben-w',
              type: TaxonomyTermType.ExerciseFolder,
              name: 'Aufgaben zur W',
            },
          ],
        },
      },
      {
        trashed: true,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Stochastik-neuer Themenbaum - später löschen',
        alias: '/mathe/stochastik-neuer-themenbaum---später-löschen',
        id: 22765,
        description: 'Stochastik-Beschreibung',
        children: {
          nodes: [
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/stochastik-neuer-themenbaum---später-löschen/grundbegriffe-methoden',
              type: TaxonomyTermType.Topic,
              name: 'Grundbegriffe und Methoden',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/stochastik-neuer-themenbaum---später-löschen/zufallsgrößen',
              type: TaxonomyTermType.Topic,
              name: 'Zufallsgrößen',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/stochastik-neuer-themenbaum---später-löschen/binomialverteilung',
              type: TaxonomyTermType.Topic,
              name: 'Binomialverteilung',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/stochastik-neuer-themenbaum---später-löschen/absolute-relative-häufigkeit--leer',
              type: TaxonomyTermType.Topic,
              name: 'Absolute und relative Häufigkeit -leer',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/stochastik-neuer-themenbaum---später-löschen/hypergeometrische-verteilung',
              type: TaxonomyTermType.Topic,
              name: 'Hypergeometrische Verteilung',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/stochastik-neuer-themenbaum---später-löschen/poisson-verteilung',
              type: TaxonomyTermType.Topic,
              name: 'Poisson-Verteilung',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/stochastik-neuer-themenbaum---später-löschen/laplace-wahrscheinlichkeiten---leer',
              type: TaxonomyTermType.Topic,
              name: 'Laplace-Wahrscheinlichkeiten - leer',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/stochastik-neuer-themenbaum---später-löschen/bedingte-wahrscheinlichkeit---leer',
              type: TaxonomyTermType.Topic,
              name: 'Bedingte Wahrscheinlichkeit - leer',
            },
          ],
        },
      },
      {
        trashed: false,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Sonstiges',
        alias: '/mathe/sonstiges',
        id: 1397,
        description: '',
        children: {
          nodes: [
            {
              trashed: false,
              __typename: UuidType.Article,
              alias: null,
              id: 27699,
              currentRevision: null,
            },
            {
              trashed: false,
              __typename: UuidType.Video,
              alias: null,
              id: 27746,
              currentRevision: null,
            },
            {
              trashed: true,
              __typename: UuidType.Article,
              alias: '/mathe/sonstiges/test',
              id: 28886,
              currentRevision: {
                title: 'test',
              },
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/lernstrategien',
              type: TaxonomyTermType.Topic,
              name: 'Lernstrategien',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/baustelle',
              type: TaxonomyTermType.ExerciseFolder,
              name: 'Baustelle',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/baustelle-mathematik',
              type: TaxonomyTermType.Topic,
              name: 'Baustelle Mathematik',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/vorkurs-mathematik-informatiker',
              type: TaxonomyTermType.Topic,
              name: 'Vorkurs Mathematik für Informatiker',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/test/-29465',
              type: TaxonomyTermType.Topic,
              name: 'Test',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/summer-academy',
              type: TaxonomyTermType.ExerciseFolder,
              name: 'Summer Academy',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/Übersicht-aller-artikel-sonstiges',
              type: TaxonomyTermType.Topic,
              name: 'Übersicht aller Artikel zu Sonstiges',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/mathematische-teilgebiete',
              type: TaxonomyTermType.Topic,
              name: 'Mathematische Teilgebiete',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/mengenlehre-logik',
              type: TaxonomyTermType.Topic,
              name: 'Mengenlehre und Logik',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/zahlensysteme',
              type: TaxonomyTermType.Topic,
              name: 'Zahlensysteme',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/weiterführendes',
              type: TaxonomyTermType.Topic,
              name: 'Weiterführendes',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/nachschlagen',
              type: TaxonomyTermType.Topic,
              name: 'Zum Nachschlagen ',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/interessantes/-1457',
              type: TaxonomyTermType.Topic,
              name: 'Interessantes',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/knobelaufgaben',
              type: TaxonomyTermType.Topic,
              name: 'Knobelaufgaben',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/seo',
              type: TaxonomyTermType.Topic,
              name: 'SEO',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/alte-richtlinien-naturwissenschaften',
              type: TaxonomyTermType.Topic,
              name: 'Alte Richtlinien Naturwissenschaften ',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/testen',
              type: TaxonomyTermType.Topic,
              name: 'Zum Testen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/artikel-videos-serlo-1',
              type: TaxonomyTermType.Topic,
              name: 'Artikel und Videos aus Serlo 1',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/berechnung-determinanten',
              type: TaxonomyTermType.Topic,
              name: 'Berechnung von Determinanten',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/formeln-berechen',
              type: TaxonomyTermType.Topic,
              name: 'Formeln berechen',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/statistik',
              type: TaxonomyTermType.Topic,
              name: 'Statistik',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/informatik',
              type: TaxonomyTermType.Topic,
              name: 'Informatik',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/serlo',
              type: TaxonomyTermType.Topic,
              name: 'Über Serlo',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/sonstiges/später-löschen',
              type: TaxonomyTermType.Topic,
              name: 'Später löschen',
            },
          ],
        },
      },
      {
        trashed: true,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Ordner für Lehrpläne - später löschen',
        alias: '/mathe/ordner-lehrpläne---später-löschen',
        id: 1421,
        description: '',
        children: {
          nodes: [
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/ordner-lehrpläne---später-löschen/vorbereitung-jahrgangsstufentest',
              type: TaxonomyTermType.Topic,
              name: 'Vorbereitung auf den Jahrgangsstufentest',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias:
                '/mathe/ordner-lehrpläne---später-löschen/lehrplan-beispiele',
              type: TaxonomyTermType.Topic,
              name: 'Lehrplan Beispiele',
            },
          ],
        },
      },
      {
        trashed: false,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Hochschule',
        alias: '/mathe/hochschule',
        id: 44323,
        description:
          '{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Willkommen in dem Bereich Hochschulmathematik von Serlo! Hier findest du Inhalte zu: "}]},{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"text":"Grundlagen der Hochschulmathematik"}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"text":"Analysis 1"}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"text":"Lineare Algebra (im Aufbau)"}]}]}]},{"type":"p","children":[{"text":"Wir vermitteln nicht nur Schemata und Formalien; vielmehr sollt ihr die Möglichkeit erhalten, mathematische Konzepte und Begriffe zu durchdringen und tiefgründig zu verstehen."}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Der Bereich Analysis 1 steht auch als PDF und als gedrucktes Buch zur Verfügung. Das Buch wurde von über 150 AutorInnen von Studierenden für Studierende geschrieben, ist frei lizenziert und kann kostenlos heruntergeladen werden:"}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"type":"a","href":"http://serlo.link/analysis1-pdf","children":[{"text":"→ Analysis 1 PDF herunterladen","strong":true}]}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"type":"a","href":"http://serlo.link/analysis1-buch","children":[{"text":"→ Analysis 1 gebundenes Buch kaufen","strong":true}]}]}]},{"plugin":"image","state":{"alt":"Serlo Analysis 1 Buch","src":"https://assets.serlo.org/5a37f813761c3_d8e0b386753e6b0f482722a6774f53de85a199e2.jpg","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]}',
        children: {
          nodes: [
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/hochschule/grundlagen-mathematik',
              type: TaxonomyTermType.Topic,
              name: 'Grundlagen der Mathematik',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/hochschule/analysis-1',
              type: TaxonomyTermType.Topic,
              name: 'Analysis 1',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/hochschule/tu-münchen',
              type: TaxonomyTermType.Topic,
              name: 'TU München',
            },
            {
              trashed: true,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/hochschule/grundlagen-mathematik_gelöscht',
              type: TaxonomyTermType.Topic,
              name: 'Grundlagen der Mathematik_gelöscht',
            },
          ],
        },
      },
      {
        trashed: false,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Deutschland',
        alias: '/mathe/deutschland',
        id: 16030,
        description: '',
        children: {
          nodes: [
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/baden-württemberg',
              type: TaxonomyTermType.Topic,
              name: 'Baden-Württemberg',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/bayern',
              type: TaxonomyTermType.Topic,
              name: 'Bayern',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/berlin',
              type: TaxonomyTermType.Topic,
              name: 'Berlin',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/brandenburg',
              type: TaxonomyTermType.Topic,
              name: 'Brandenburg',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/bremen',
              type: TaxonomyTermType.Topic,
              name: 'Bremen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/hamburg',
              type: TaxonomyTermType.Topic,
              name: 'Hamburg',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/hessen',
              type: TaxonomyTermType.Topic,
              name: 'Hessen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/mecklenburg-vorpommern',
              type: TaxonomyTermType.Topic,
              name: 'Mecklenburg-Vorpommern',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/niedersachsen',
              type: TaxonomyTermType.Topic,
              name: 'Niedersachsen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/nordrhein-westfalen',
              type: TaxonomyTermType.Topic,
              name: 'Nordrhein-Westfalen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/rheinland-pfalz',
              type: TaxonomyTermType.Topic,
              name: 'Rheinland-Pfalz',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/saarland',
              type: TaxonomyTermType.Topic,
              name: 'Saarland',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/sachsen',
              type: TaxonomyTermType.Topic,
              name: 'Sachsen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/sachsen-anhalt',
              type: TaxonomyTermType.Topic,
              name: 'Sachsen-Anhalt',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/schleswig-holstein',
              type: TaxonomyTermType.Topic,
              name: 'Schleswig-Holstein',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/thüringen',
              type: TaxonomyTermType.Topic,
              name: 'Thüringen',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/deutschland/serlo-lehrplan',
              type: TaxonomyTermType.Topic,
              name: 'Serlo-Lehrplan',
            },
          ],
        },
      },
      {
        trashed: false,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Österreich',
        alias: '/mathe/Österreich',
        id: 16063,
        description: '',
        children: {
          nodes: [
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/Österreich/hwb',
              type: TaxonomyTermType.Topic,
              name: 'HWB',
            },
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/Österreich/ausbildungen',
              type: TaxonomyTermType.Topic,
              name: 'Ausbildungen',
            },
          ],
        },
      },
      {
        trashed: false,
        __typename: UuidType.TaxonomyTerm,
        type: TaxonomyTermType.Topic,
        name: 'Partner',
        alias: '/mathe/partner',
        id: 146728,
        description:
          '{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Herzlich Willkommen im Partner-Bereich! Hier können Partnerorganisation von Serlo Education Inhalte nach ihren Bedarfen anordnen."}]}]}]}',
        children: {
          nodes: [
            {
              trashed: false,
              __typename: UuidType.TaxonomyTerm,
              alias: '/mathe/partner/schlau-werkstatt',
              type: TaxonomyTermType.Topic,
              name: 'Schlau-Werkstatt',
            },
          ],
        },
      },
    ],
  },
}

export const appletUuidMock = {
  __typename: UuidType.Applet,
  id: 138114,
  alias:
    '/mathe/zahlen-größen/bruchrechnen-dezimalzahlen/rechnen-brüchen/brüche-multiplizieren-138114',
  instance: 'de',
  license: {
    id: 1,
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
    title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
  },
  taxonomyTerms: {
    nodes: [
      {
        navigation: {
          path: {
            nodes: [
              {
                label: 'Mathematik',
                url: '/mathe',
              },
              {
                label: 'Alle Themen',
                url: '/mathe/5',
              },
              {
                label: 'Zahlen und Größen',
                url: '/mathe/zahlen-größen',
              },
              {
                label: 'Bruchrechnen und Dezimalzahlen',
                url: '/mathe/zahlen-größen/bruchrechnen-dezimalzahlen',
              },
              {
                label: 'Rechnen mit Brüchen',
                url: '/mathe/zahlen-größen/bruchrechnen-dezimalzahlen/rechnen-brüchen',
              },
            ],
          },
        },
      },
    ],
  },
  currentRevision: {
    title: 'Brüche Multiplizieren',
    content:
      '{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Stelle mit den Schiebereglern die Brüche ein, die du multiplizieren möchtest. Die Bruchteile werden dann in den Rechtecken farbig markiert. Mit dem Schieberegler \\"übereinanderlagern\\" kannst du die Brüche dann zusammenschieben und siehst das Ergebnis: Die Felder, die mit beiden Farben angemalt sind."}]},{"type":"p","children":[{"text":"Du kannst diese Lösung anzeigen lassen, indem du Haken in die Kästchen setzt."}]}]}]}',
    url: 'rtfv8qwt',
    metaTitle: '',
    metaDescription: '',
  },
}

export const videoUuidMock = {
  __typename: UuidType.Video,
  id: 40744,
  alias:
    '/mathe/geometrie/konstruktion-geometrischen-objekten/winkel-konstruieren',
  instance: 'de',
  license: {
    id: 1,
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
    title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
  },
  taxonomyTerms: {
    nodes: [
      {
        navigation: {
          path: {
            nodes: [
              {
                label: 'Mathematik',
                url: '/mathe',
              },
              {
                label: 'Alle Themen',
                url: '/mathe/5',
              },
              {
                label: 'Geometrie',
                url: '/mathe/geometrie',
              },
              {
                label: 'Konstruktion von geometrischen Objekten',
                url: '/mathe/geometrie/konstruktion-geometrischen-objekten',
              },
            ],
          },
        },
      },
    ],
  },
  currentRevision: {
    title: 'Winkel konstruieren',
    url: 'https://www.youtube.com/watch?v=bq_7eAWYDOA',
    content:
      '{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Inhalt:"}]},{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Konstruktion der Winkel "},{"type":"math","src":"360^\\\\circ","inline":true,"children":[{"text":"360^\\\\circ"}]},{"text":" und "},{"type":"math","src":"180^\\\\circ","inline":true,"children":[{"text":"180^\\\\circ"}]},{"text":"."}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Konstruktion der Winkel "},{"type":"math","src":"90^\\\\circ","inline":true,"children":[{"text":"90^\\\\circ"}]},{"text":" und "},{"type":"math","src":"60^\\\\circ","inline":true,"children":[{"text":"60^\\\\circ"}]},{"text":" mit detailliertem Konstruktionsplan."}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Konstruktion der Winkelhalbierenden eines beliebigen Winkels mit detailliertem Konstruktionsplan."}]}]}]}]}]}]}',
  },
}

export const coursePageUuidMock = {
  __typename: UuidType.CoursePage,
  id: 52020,
  alias:
    '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/uebersicht',
  instance: 'de',
  license: {
    id: 1,
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
    title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
  },
  currentRevision: {
    content:
      '{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Ziel dieses Kurses ist es, einen Überblick zur möglichen Vorgehensweise beim Finden von Nullstellen von Polynomfunktionen zu geben."}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"text":"Inhalte"}]},{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Erarbeitung der Linearfaktordarstellung"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Methoden der Nullstellenberechnung"}]},{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Termumformungen"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Ausklammern von Faktoren"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Lösen mithilfe der Polynomdivision"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Lösen durch Substitution"}]}]}]}]}]}]}]},{"type":"p","children":[{"text":"Vorwissen"}]},{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Funktionsbegriff"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Polynomfunktion"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Definition einer Nullstelle"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Berechnung von Nullstellen bei linearen und quadratischen Funktionen"}]}]}]}]}]}]}',
    title: 'Übersicht',
  },
  course: {
    id: 51979,
    currentRevision: {
      title: 'Berechnungsmethoden - Nullstellen von Polynomfunktionen',
    },
    pages: [
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/uebersicht',
        id: 52020,
        currentRevision: {
          title: 'Übersicht',
        },
      },
      {
        alias: '/51522/nullstellen',
        id: 51522,
        currentRevision: {
          title: 'Nullstellen',
        },
      },
      {
        alias: '/51551/aufgaben-nullstellen-evtl-geloescht',
        id: 51551,
        currentRevision: {
          title: 'Aufgaben zu Nullstellen (wird evtl. gelöscht)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/linearfaktordarstellung-1-3',
        id: 51553,
        currentRevision: {
          title: 'Linearfaktordarstellung (1|3)',
        },
      },
      {
        alias: '/52035/linearfaktordarstellung-2-3',
        id: 52035,
        currentRevision: {
          title: 'Linearfaktordarstellung (2|3)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/linearfaktordarstellung-3-3',
        id: 52365,
        currentRevision: {
          title: 'Linearfaktordarstellung (3|3)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/uebersicht-berechnungsmethoden',
        id: 51555,
        currentRevision: {
          title: 'Übersicht - Berechnungsmethoden',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/0-hilfestellungen',
        id: 52344,
        currentRevision: {
          title: '0. Hilfestellungen',
        },
      },
      {
        alias: '/52338/1-termumformungen',
        id: 52338,
        currentRevision: {
          title: '1. Termumformungen',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/2-ausklammern-faktoren-1-2',
        id: 52342,
        currentRevision: {
          title: '2. Ausklammern von Faktoren (1|2)',
        },
      },
      {
        alias: '/52448/2-ausklammern-faktoren-2-2',
        id: 52448,
        currentRevision: {
          title: '2. Ausklammern von Faktoren (2|2)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/3-loesen-mithilfe-polynomdivision-1-2',
        id: 123826,
        currentRevision: {
          title: '3. Lösen mithilfe der Polynomdivision (1|2)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/3-loesen-mithilfe-polynomdivision-2-2',
        id: 123982,
        currentRevision: {
          title: '3. Lösen mithilfe der Polynomdivision (2|2)',
        },
      },
      {
        alias: '/52032/3-loesen-substitution-1',
        id: 52032,
        currentRevision: {
          title: '3. Lösen durch Substitution (1| )',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/4-loesen-substitution-1-2',
        id: 52256,
        currentRevision: {
          title: '4. Lösen durch Substitution (1|2)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/4-loesen-substitution-2-2',
        id: 52411,
        currentRevision: {
          title: '4. Lösen durch Substitution (2|2)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/schema-nullstellenberechnung',
        id: 52340,
        currentRevision: {
          title: 'Schema zur Nullstellenberechnung',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/aufgaben-nullstellenberechnung',
        id: 51557,
        currentRevision: {
          title: 'Aufgaben zur Nullstellenberechnung',
        },
      },
      {
        alias: '/52336/zusammenfassung',
        id: 52336,
        currentRevision: {
          title: 'Zusammenfassung',
        },
      },
      {
        alias: null,
        id: 52371,
        currentRevision: null,
      },
      {
        alias: null,
        id: 123981,
        currentRevision: null,
      },
    ],
    taxonomyTerms: {
      nodes: [
        {
          navigation: {
            path: {
              nodes: [
                {
                  label: 'Mathematik',
                  url: '/mathe',
                },
                {
                  label: 'Alle Themen',
                  url: '/mathe/5',
                },
                {
                  label: 'Funktionen',
                  url: '/mathe/funktionen',
                },
                {
                  label: 'Wichtige Funktionstypen und ihre Eigenschaften',
                  url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften',
                },
                {
                  label: 'Polynomfunktionen beliebigen Grades',
                  url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/polynomfunktionen-beliebigen-grades',
                },
              ],
            },
          },
        },
        {
          navigation: {
            path: {
              nodes: [
                {
                  label: 'Mathematik',
                  url: '/mathe',
                },
                {
                  label: 'Gymnasium',
                  url: '/mathe/deutschland/bayern/gymnasium',
                },
                {
                  label: 'Klasse 10',
                  url: '/mathe/deutschland/bayern/gymnasium/klasse-10',
                },
                {
                  label: 'Graphen ganzrationaler Funktionen',
                  url: '/mathe/deutschland/bayern/gymnasium/klasse-10/graphen-ganzrationaler-funktionen',
                },
              ],
            },
          },
        },
        {
          navigation: {
            path: {
              nodes: [
                {
                  label: 'Mathematik',
                  url: '/mathe',
                },
                {
                  label: 'Alle Themen',
                  url: '/mathe/5',
                },
                {
                  label: 'Deutschland',
                  url: '/mathe/deutschland',
                },
                {
                  label: 'Bayern',
                  url: '/mathe/deutschland/bayern',
                },
                {
                  label: 'FOS Technik',
                  url: '/mathe/deutschland/bayern/fos-technik',
                },
                {
                  label: 'Klasse 11',
                  url: '/mathe/deutschland/bayern/fos-technik/klasse-11',
                },
                {
                  label: 'Ganzrationale Funktionen ',
                  url: '/mathe/deutschland/bayern/fos-technik/klasse-11/ganzrationale-funktionen',
                },
                {
                  label: 'Nullstellen ganzrationaler Funktionen berechnen',
                  url: '/mathe/deutschland/bayern/fos-technik/klasse-11/ganzrationale-funktionen/nullstellen-ganzrationaler-funktionen-berechnen',
                },
              ],
            },
          },
        },
        {
          navigation: {
            path: {
              nodes: [
                {
                  label: 'Mathematik',
                  url: '/mathe',
                },
                {
                  label: 'FOS & BOS',
                  url: '/mathe/deutschland/bayern/fos-bos---technisch',
                },
                {
                  label: 'Klasse 11',
                  url: '/mathe/deutschland/bayern/fos-bos---technisch/klasse-11',
                },
                {
                  label: 'Ganzrationale Funktionen ',
                  url: '/mathe/deutschland/bayern/fos-bos---technisch/klasse-11/ganzrationale-funktionen',
                },
                {
                  label: 'Nullstellen ganzrationaler Funktionen berechnen',
                  url: '/mathe/deutschland/bayern/fos-bos---technisch/klasse-11/ganzrationale-funktionen/nullstellen-ganzrationaler-funktionen-berechnen',
                },
              ],
            },
          },
        },
      ],
    },
  },
}

export const pageUuidMock = {
  __typename: UuidType.Page,
  id: 18922,
  alias: '/serlo',
  instance: 'de',
  license: {
    id: 1,
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
    title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
  },
  currentRevision: {
    id: 169463,
    title: 'Über Serlo',
    content:
      '{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Serlo.org bietet einfache Erklärungen, Kurse, Lernvideos, Übungen und Musterlösungen mit denen Schüler*innen und Studierende nach ihrem eigenen Bedarf und in ihrem eigenen Tempo lernen können. Die Lernplattform ist komplett kostenlos und werbefrei. "}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"text":"Serlo.org wird von dem gemeinnützigen Verein Serlo Education e.V. betrieben. Wir sind Autor*innen, Softwareentwickler*innen und Projektmanager*innen mit der Vision hochwertige Bildung weltweit frei verfügbar zu machen. Gemeinsam bauen wir eine "},{"text":"Wikipedia fürs Lernen","strong":true},{"text":"."}]}]},{"plugin":"image","state":{"alt":"Lernen mit Serlo","src":"https://assets.serlo.org/legacy/573a12d3a07fa_8279eaedfe19a52b5fa133962ea4902c4e0da24d.png","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Mit Serlo lernen"}]}]},{"plugin":"image","state":{"alt":"Schüler lernen mit serlo.org","src":"https://assets.serlo.org/legacy/58de620cc81f5_3a32032a78442ac70f769077482f4209378a3396.jpg","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Mit serlo.org helfen wir Dir, selbständig und im eigenen Tempo zu lernen ("},{"type":"a","href":"/81862","children":[{"text":"So funktioniert die Lernplattform"}]},{"text":").  Dafür findest Du 15.000 einfache Erklärungen, Aufgaben mit Musterlösungen, Lernvideos und Kurse für "},{"type":"a","href":"/19767","children":[{"text":"Mathematik"}]},{"text":" und "},{"type":"a","href":"/19863","children":[{"text":"weitere Schulfächer"}]},{"text":"."}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"text":"Alle Inhalte sind nach Themen sortiert, Lehrplänen zugeordnet und in unser "},{"type":"a","href":"/21423","children":[{"text":"pädagogisches Konzept"}]},{"text":" integriert."}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"text":"Aktuell lernen "},{"text":"eine Million Personen pro Monat","strong":true},{"text":" mit Serlo. ("},{"type":"a","href":"/21406","children":[{"text":"Details zur Nutzung"}]},{"text":")"}]}]},{"plugin":"image","state":{"alt":"Creative Commons","src":"https://assets.serlo.org/legacy/58e14d95c33e9_6b9472b330a800a91151aa15d565d8c37c9a4b2b.png","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Serlo.org ist komplett kostenlos und werbefrei. Unsere Inhalte stehen unter einer"},{"type":"a","href":"https://creativecommons.org/licenses/by-sa/4.0/","children":[{"text":"freien Lizenz"}]},{"text":" - sie dürfen kopiert, verändert und verbreitet werden."}]}]},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Serlo in der Schule"}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Seit 2016 sind wir mit den "},{"type":"a","href":"/labschool","children":[{"text":"Serlo Lab Schools"}]},{"text":" in das Nachmittagsangebot von Schulen integriert und begleiten Schüler*innen direkt vor Ort beim selbstständigen Lernen mit serlo.org."}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"text":"Wie Du als Lehrkraft serlo.org gewinnbringend für Deinen Unterricht einsetzen kannst, erfährst Du bei unseren "},{"type":"a","href":"/88061","children":[{"text":"Ressourcen für Pädagog*innen"}]},{"text":"."}]}]},{"plugin":"injection","state":"/120011"},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Inhalte erstellen"}]}]},{"plugin":"image","state":{"alt":"Serlo Editor","src":"https://assets.serlo.org/legacy/56d9f1fc85966_f629c642ea0cd1e1e7877f48f600d28222a3bd86.png","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Wir sind eine "},{"type":"a","href":"/19869","children":[{"text":"Autor*innen-Community"}]},{"text":" nach dem Vorbild der Wikipedia. Die Community erstellt, verlinkt, sortiert und übersetzt alle Inhalte auf serlo.org."}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"text":"Die Überprüfung durch erfahrene Mitglieder der Community und das Feedback der Nutzer*innen sorgen für die Qualitätssicherung."}]}]},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Weitere Projekte von Serlo"}]}]},{"plugin":"text","state":[{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"text":"Serlo Hochschulmathematik","strong":true},{"text":": Die freie "},{"type":"a","href":"https://de.wikibooks.org/wiki/Mathe_f%C3%BCr_Nicht-Freaks","children":[{"text":"Lehrbuchreihe für Hochschulmathematik"}]},{"text":" verzeichnet über 2 Million Seitenaufrufe pro Jahr. Das Projekt hat sich 2016 Serlo Education angeschlossen."}]}]}]}]},{"plugin":"text","state":[{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"text":"Serlo ABC:","strong":true},{"text":" Mit der neuen Sprach-Lernapplikation "},{"type":"a","href":"/abc","children":[{"text":"Serlo ABC"}]},{"text":" lernen Geflüchtete intuitiv und selbständig das lateinische Alphabet. Die Entwicklung von "},{"text":"Serlo ABC","em":true},{"text":" begann 2015."}]}]}]}]},{"plugin":"image","state":{"alt":"Serlo abc Logo","src":"https://assets.serlo.org/legacy/5836d099e4c37_ea9b78edb8bcab7acf6ea79509914cc6408a7d0a.png","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"text":"Serlo Nachhaltigkeit:","strong":true},{"text":" Ziel von "},{"type":"a","href":"/nachhaltigkeit","children":[{"text":"Serlo Nachhaltigkeit"}]},{"text":" ist es, ökologisches Bewusstsein sowie Wissen und Fähigkeiten rund um eine nachhaltige Lebensführung mithilfe digitaler Technologie in die Breite zu tragen. Serlo Nachhaltigkeit startete 2014."}]}]}]}]},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Auszeichnungen"}]}]},{"plugin":"text","state":[{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Bundesverdienstkreuz","strong":true},{"text":" für Serlo-Gründer Simon und Aeneas"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Gewinner des "},{"text":"SWM Bildungsstiftung Förderpreis 2019","strong":true}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Ashoka Fellowship","strong":true},{"text":" für Serlo-Gründer Simon ab 2018 "}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Gewinner des "},{"text":"Pädagogischen Medienpreis 2017","strong":true}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Gewinner des "},{"text":"OER Award 2016","strong":true},{"text":" in den Kategorien \\"Bestes Hochschulprojekt\\" und \\"Größter Impact\\""}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"LMU Forscherpreis für exzellente Studierende","strong":true},{"text":" an Serlo-Mitgründer Aeneas für seine Arbeit an der Software von Serlo"}]}]}]}]}]},{"plugin":"image","state":{"alt":"Simon Köhl, Aeneas Rekkas, Bundesverdienstkreuz","src":"https://assets.serlo.org/5e821f7496857_b3df4108c4c549f4e318d1433bfd30e4ccab08dc.JPG","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Die Geschichte"}]}]},{"plugin":"image","state":{"alt":"Klosterschüler in Serlo","src":"https://assets.serlo.org/legacy/56d9f598ebea2_1581a51d8fbbce8e4abac1cb6793c714febe5a48.png","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Serlo Education wurde von den Schülern Simon und Aeneas gegründet um Schule zu verändern und die Welt gerechter zu machen. Alles begann 2009 mit einem Besuch in Nepal. "},{"type":"a","href":"/21413","children":[{"text":"Lies unsere einzigartige Geschichte"}]},{"text":"."}]}]},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Das Team"}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Serlo Education wird von ehrenamtlichen "},{"type":"a","href":"/19882","children":[{"text":"Autor*innen"}]},{"text":" und dem haupt- und ehrenamtlichen "},{"type":"a","href":"/21439","children":[{"text":"Team"}]},{"text":" aufgebaut. Wir sind Studierende, Lehrer*innen, Softwareentwickler*innen und viele weitere Menschen, die einen Beitrag zu mehr Bildungsgerechtigkeit leisten wollen."}]}]},{"plugin":"image","state":{"alt":"Demokratische Organisation","src":"https://assets.serlo.org/legacy/58e14f0ab5075_a536c62f74b70c2f6a3cee393993037fb0e174d2.jpg","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Vortrag von Serlo-Gründer Simon"}]}]},{"plugin":"injection","state":"/94680"},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Finanzierung"}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Serlo Education wird durch die großzügige Unterstützung unserer "},{"type":"a","href":"/21456","children":[{"text":"Partner und Förderer"}]},{"text":" ermöglicht. Details zu unseren Einnahmen mit denen wir die Softwareentwicklung, die Betreuung der Ehrenamtlichen und den Aufbau der Organisation bezahlen, sind "},{"type":"a","href":"/transparenz#7angabenzurmittelherkunft","children":[{"text":"hier transparent dargestellt"}]},{"text":"."}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"text":"Wir freuen uns sehr, wenn Du uns mit einer "},{"type":"a","href":"/spenden","children":[{"text":"Spende"}]},{"text":" unterstützt."}]}]},{"plugin":"image","state":{"alt":"Serlo Partner","src":"https://assets.serlo.org/legacy/576bf8ebb9a1c_0d19b7c4804172fd6c8ac4c8a8eb178514aded40.PNG","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Presse"}]}]},{"plugin":"image","state":{"alt":"","src":"https://assets.serlo.org/legacy/5750330b9dc38_6b82d89481b0a7e1eb0ef2efb596c02198c9b724.png","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Norddeutscher Rundfunk:","strong":true},{"text":" "},{"type":"a","href":"https://soundcloud.com/serlo/ndr-radiointerview","children":[{"text":"Radiobeitrag anhören"}]}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"TheChanger:","strong":true},{"text":" "},{"type":"a","href":"http://www.thechanger.org/de/blog-de/lernplattform-serlo-interview-simon-kohl/","children":[{"text":"Interview mit Serlo-Gründer und Vorstand Simon Köhl"}]}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Bertelsmann Stiftung","strong":true},{"text":": "},{"type":"a","href":"http://blog.aus-und-weiterbildung.eu/mehr-bildungsgerechtigkeit-durch-freie-bildungsmaterialien-lernplattform-serlo-legt-in-ersten-wirkungsbericht-beeindruckenden-zahlen/","children":[{"text":"\\"Mehr Bildungsgerechtigkeit durch freie Bildungsmaterialien\\""}]}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Ashoka Deutschland und McKinsey Company","strong":true},{"text":": "},{"type":"a","href":"https://www.mckinsey.de/~/media/mckinsey/locations/europe%20and%20middle%20east/deutschland/news/presse/2019/2019-03-15%20ashoka-studie%20-%20wenn%20aus%20klein%20systemisch%20wird/2019_ashoka_mckinsey_studie_wenn%20aus%20klein%20systemisch%20wird.ashx","children":[{"text":"\\"Wenn aus klein systemisch wird. Das Milliardenpotenzial sozialer Innovationen\\""}]}]}]}]}]}]},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Mehr Infos"}]},{"type":"p","children":[{"type":"a","href":"http://serlo.us7.list-manage2.com/subscribe?u=23f4b04bf70ea485a766e532d&id=a7bb2bbc4f","children":[{"text":"Abonnieren Sie unseren Newsletter"}]}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"type":"a","href":"/wirkung","children":[{"text":"Detaillierte Information zu unseren Zielgruppen, was wir bewirken wollen und was wir bereits erreicht haben."}]}]}]}]}',
  },
  navigation: {
    path: {
      nodes: [
        {
          label: 'Über Serlo',
          url: '/serlo',
        },
      ],
    },
  },
}

export const exerciseUuidMock = {
  __typename: UuidType.Exercise,
  id: 54210,
  alias:
    '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen/aufgaben-verschieben-strecken-trigonometrischer-funktionen/54210',
  instance: 'de',
  license: {
    id: 1,
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
    title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
  },
  taxonomyTerms: {
    nodes: [
      {
        navigation: {
          path: {
            nodes: [
              {
                label: 'Mathematik',
                url: '/mathe',
              },
              {
                label: 'Alle Themen',
                url: '/mathe/5',
              },
              {
                label: 'Funktionen',
                url: '/mathe/funktionen',
              },
              {
                label: 'Wichtige Funktionstypen und ihre Eigenschaften',
                url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften',
              },
              {
                label: 'Trigonometrische Funktionen',
                url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen',
              },
              {
                label:
                  'Aufgaben zum Verschieben und Strecken trigonometrischer Funktionen',
                url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen/aufgaben-verschieben-strecken-trigonometrischer-funktionen',
              },
            ],
          },
        },
      },
      {
        navigation: {
          path: {
            nodes: [
              {
                label: 'Mathematik',
                url: '/mathe',
              },
              {
                label: 'Alle Themen',
                url: '/mathe/5',
              },
              {
                label: 'Deutschland',
                url: '/mathe/deutschland',
              },
              {
                label: 'Bayern',
                url: '/mathe/deutschland/bayern',
              },
              {
                label: 'FOS Technik',
                url: '/mathe/deutschland/bayern/fos-technik',
              },
              {
                label: 'Klasse 12',
                url: '/mathe/deutschland/bayern/fos-technik/klasse-12',
              },
              {
                label: 'Trigonometrische Funktionen',
                url: '/mathe/deutschland/bayern/fos-technik/klasse-12/trigonometrische-funktionen',
              },
              {
                label:
                  'Aufgaben zum Verschieben und Strecken trigonometrischer Funktionen',
                url: '/mathe/deutschland/bayern/fos-technik/klasse-12/trigonometrische-funktionen/aufgaben-verschieben-strecken-trigonometrischer-funktionen',
              },
            ],
          },
        },
      },
      {
        navigation: {
          path: {
            nodes: [
              {
                label: 'Mathematik',
                url: '/mathe',
              },
              {
                label: 'Gymnasium',
                url: '/mathe/deutschland/bayern/gymnasium',
              },
              {
                label: 'Klasse 10',
                url: '/mathe/deutschland/bayern/gymnasium/klasse-10',
              },
              {
                label: 'Trigonometrie',
                url: '/mathe/deutschland/bayern/gymnasium/klasse-10/trigonometrie',
              },
              {
                label: 'Aufgaben zur allgemeinen Sinusfunktion',
                url: '/mathe/deutschland/bayern/gymnasium/klasse-10/trigonometrie/aufgaben-allgemeinen-sinusfunktion',
              },
            ],
          },
        },
      },
    ],
  },
  currentRevision: {
    content:
      '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Ordne folgendem Graphen die richtige Funktionsgleichung zu:"}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e92eda3e891_00804a4cae5eaff522ae3b59cf859b06ca6a47b0.png","alt":"Graph","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]},"interactive":{"plugin":"scMcExercise","state":{"isSingleChoice":true,"answers":[{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"f(x)=4\\\\cdot\\\\sin(x)","inline":true,"children":[{"text":"f(x)=4\\\\cdot\\\\sin(x)"}]},{"text":""}]}]},"isCorrect":true,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Richtig! Der Nobelpreis ist ganz nah ;-)"}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"f(x)=4\\\\cdot\\\\cos(x)","inline":true,"children":[{"text":"f(x)=4\\\\cdot\\\\cos(x)"}]},{"text":""}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Leider falsch! Du denkst wahrscheinlich schon in die richtige Richtung, aber schaue dir noch einmal die Unterschiede der "},{"type":"a","href":"/1909","children":[{"text":"trigonometrischen Funktionen"}]},{"text":" an."}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"f(x)=5\\\\cdot\\\\cos(x)","inline":true,"children":[{"text":"f(x)=5\\\\cdot\\\\cos(x)"}]},{"text":""}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Da solltest du noch einmal nachdenken. Die Funktionsgleichung hat leider so gar nichts mit dem Graphen zu tun!"}]}]}},{"content":{"plugin":"text","state":[{"type":"p","children":[{"text":""},{"type":"math","src":"f(x)=12\\\\cdot\\\\sin(x)","inline":true,"children":[{"text":"f(x)=12\\\\cdot\\\\sin(x)"}]},{"text":""}]}]},"isCorrect":false,"feedback":{"plugin":"text","state":[{"type":"p","children":[{"text":"Leider falsch! Du hast mit der Sinus-Funktion schon den richtigen Riecher. Allerdings ist mal "},{"type":"math","src":"12","inline":true,"children":[{"text":"12"}]},{"text":" falsch. Schau mal, wie weit die Kurve auf der y-Achse ausschlägt."}]}]}}]}},"solution":{"plugin":"solution","state":{"prerequisite":{"id":"1450","title":"Sinus- und Kosinusfunktion"},"strategy":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"steps":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Betrachtest du den Graphen der Funktion, siehst du gleich, dass es sich nicht um eine Kosinus-Funktion handeln kann, da die Kosinus-Funktion achsensymmetrisch bezüglich der y-Achse ist und der Graph der gesuchten Funktion ist punktsymmetrisch bezüglich des Ursprungs. Deshalb kannst du direkt die Funktionen "},{"type":"math","src":"4\\\\cdot\\\\cos(x)","inline":true,"children":[{"text":"4\\\\cdot\\\\cos(x)"}]},{"text":" und "},{"type":"math","src":"5\\\\cdot\\\\cos(x)","inline":true,"children":[{"text":"5\\\\cdot\\\\cos(x)"}]},{"text":"ausschließen."}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e92a7c4bb94_0c7f36a564b59a1c9b6f796ab968c4075def3a16.png","alt":"Graph","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Bleiben also noch die beiden Sinus-Funktionen zur Auswahl. Betrachtest du die Funktion "},{"type":"math","src":"12\\\\cdot\\\\sin(x)","inline":true,"children":[{"text":"12\\\\cdot\\\\sin(x)"}]},{"text":", sollte dir auffallen, dass die Amplitude dieser Funktion sehr viel größer ist als die der gesuchten Funktion.Die Amplitude der Funktion "},{"type":"math","src":"12\\\\cdot\\\\sin(x)","inline":true,"children":[{"text":"12\\\\cdot\\\\sin(x)"}]},{"text":" beträgt 12, da sie "},{"type":"math","src":"12","inline":true,"children":[{"text":"12"}]},{"text":" mal so groß ist wie die der normalen Sinus-Funktion "},{"type":"math","src":"\\\\sin(x)","inline":true,"children":[{"text":"\\\\sin(x)"}]},{"text":"."}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Die Amplitude des Graphen der gesuchten Funktion, beträgt "},{"type":"math","src":"4","inline":true,"children":[{"text":"4"}]},{"text":", also "},{"type":"math","src":"4","inline":true,"children":[{"text":"4"}]},{"text":" mal so groß wie die der normalen Sinus-Funktion "},{"type":"math","src":"\\\\sin(x)","inline":true,"children":[{"text":"\\\\sin(x)"}]},{"text":". Deshalb ist die gesuchte Funktion "},{"type":"math","src":"4\\\\cdot\\\\sin(x)","inline":true,"children":[{"text":"4\\\\cdot\\\\sin(x)"}]},{"text":""}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e9301252d07_a7c78c78c1228a9912b93723ce39bfaf46b136ec.png","alt":"Graph","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]}}}}}',
  },
}

export const exerciseGroupUuidMock = {
  __typename: UuidType.ExerciseGroup,
  id: 53205,
  alias:
    '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen/aufgaben-verschieben-strecken-trigonometrischer-funktionen/53205',
  instance: 'de',
  license: {
    id: 1,
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
    title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
  },
  taxonomyTerms: {
    nodes: [
      {
        navigation: {
          path: {
            nodes: [
              {
                label: 'Mathematik',
                url: '/mathe',
              },
              {
                label: 'Alle Themen',
                url: '/mathe/5',
              },
              {
                label: 'Funktionen',
                url: '/mathe/funktionen',
              },
              {
                label: 'Wichtige Funktionstypen und ihre Eigenschaften',
                url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften',
              },
              {
                label: 'Trigonometrische Funktionen',
                url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen',
              },
              {
                label:
                  'Aufgaben zum Verschieben und Strecken trigonometrischer Funktionen',
                url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen/aufgaben-verschieben-strecken-trigonometrischer-funktionen',
              },
            ],
          },
        },
      },
      {
        navigation: {
          path: {
            nodes: [
              {
                label: 'Mathematik',
                url: '/mathe',
              },
              {
                label: 'Alle Themen',
                url: '/mathe/5',
              },
              {
                label: 'Deutschland',
                url: '/mathe/deutschland',
              },
              {
                label: 'Bayern',
                url: '/mathe/deutschland/bayern',
              },
              {
                label: 'FOS Technik',
                url: '/mathe/deutschland/bayern/fos-technik',
              },
              {
                label: 'Klasse 12',
                url: '/mathe/deutschland/bayern/fos-technik/klasse-12',
              },
              {
                label: 'Trigonometrische Funktionen',
                url: '/mathe/deutschland/bayern/fos-technik/klasse-12/trigonometrische-funktionen',
              },
              {
                label:
                  'Aufgaben zum Verschieben und Strecken trigonometrischer Funktionen',
                url: '/mathe/deutschland/bayern/fos-technik/klasse-12/trigonometrische-funktionen/aufgaben-verschieben-strecken-trigonometrischer-funktionen',
              },
            ],
          },
        },
      },
      {
        navigation: {
          path: {
            nodes: [
              {
                label: 'Mathematik',
                url: '/mathe',
              },
              {
                label: 'Gymnasium',
                url: '/mathe/deutschland/bayern/gymnasium',
              },
              {
                label: 'Klasse 10',
                url: '/mathe/deutschland/bayern/gymnasium/klasse-10',
              },
              {
                label: 'Trigonometrie',
                url: '/mathe/deutschland/bayern/gymnasium/klasse-10/trigonometrie',
              },
              {
                label: 'Aufgaben zur allgemeinen Sinusfunktion',
                url: '/mathe/deutschland/bayern/gymnasium/klasse-10/trigonometrie/aufgaben-allgemeinen-sinusfunktion',
              },
            ],
          },
        },
      },
    ],
  },
  currentRevision: {
    content:
      '{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Finde die passenden Gleichungen zu den Funktionsgraphen:"}]}]}]}',
  },
  revisions: {
    totalCount: 1,
  },
  exercises: [
    {
      id: 53209,
      currentRevision: {
        content:
          '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e021a8c95ce_de1b6de2a64aebbb6030e31fff0f5e353b784a48.png","alt":"Graph1","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]},"solution":{"plugin":"solution","state":{"prerequisite":{"id":"1450","title":"Sinus- und Kosinusfunktion"},"strategy":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"steps":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Die "},{"type":"a","href":"/1569","children":[{"text":"Ruhelage"}]},{"text":" der Funktion liegt auf der "},{"type":"math","src":"x","inline":true,"children":[{"text":"x"}]},{"text":"-Achse."}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e134ad11931_7a29c372db1fb46847913c95ea3e63c78d107366.png","alt":"Lösungsteil1","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Der Graph schneidet das Koordinatensystem im Nullpunkt, also handelt es sich um eine Sinusfunktion (beziehungsweise einen verschobenen Kosinus)."}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e1347fd9dc1_338b31d48a89340e131d3dd1edbdddafce1725fb.png","alt":"Lösungsteil2","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Da es leichter ist, verwendest du in den weiteren Schritten die Sinusfunktion."}]},{"type":"p","children":[{"text":"Im nächsten Schritt suchst du nach der "},{"type":"a","href":"/1569","children":[{"text":"Amplitude"}]},{"text":" der Funktion."}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Die Amplitude der Funktion ist "},{"type":"math","src":"3","inline":true,"children":[{"text":"3"}]},{"text":". Das heißt, dass die Funktion vorerst von der Form "},{"type":"math","src":"f(x)=3\\\\cdot\\\\sin(x)","inline":true,"children":[{"text":"f(x)=3\\\\cdot\\\\sin(x)"}]},{"text":" ist."}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e1346338a3e_542af962ee94cb2e532d473c629508001b2d6790.png","alt":"Lösungsteil3","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Jetzt fehlt dir nur noch die "},{"type":"a","href":"/2113","children":[{"text":"Periode"}]},{"text":" der Funktion. Am Graphen kannst du ablesen, dass diese "},{"type":"math","src":"2\\\\pi","inline":true,"children":[{"text":"2\\\\pi"}]},{"text":" beträgt. Das ist die normale Periode von der Sinusfunktion."}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Da die Periode der Sinusfunktion nicht verändert wurde, lautet die Funktion:"}]},{"type":"p","children":[{"type":"math","src":"f(x)=3\\\\cdot\\\\sin(x).","inline":false,"children":[{"text":"f(x)=3\\\\cdot\\\\sin(x)."}]}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e1345199b59_b5c08794fb0621d80c980488ebfc535883be0f8c.png","alt":"Lösungsteil4","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]}}}}}',
      },
      license: {
        id: 1,
        url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
        title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
      },
    },
    {
      id: 53216,
      currentRevision: {
        content:
          '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e6df0bc7338_33ac3a380268df5758d8eb63f9aa78e63eee4b9e.png","alt":"Graph2","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]},"solution":{"plugin":"solution","state":{"prerequisite":{"id":"1450","title":"Sinus- und Kosinusfunktion"},"strategy":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"steps":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Bestimme zunächst die Ruhelage der Funktion."}]}]},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Ruhelage bestimmen"}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Die "},{"type":"a","href":"/1569","children":[{"text":"Ruhelage"}]},{"text":" der Funktion liegt "},{"type":"math","src":"3","inline":true,"children":[{"text":"3"}]},{"text":" Einheiten über der "},{"type":"math","src":"x","inline":true,"children":[{"text":"x"}]},{"text":"-Achse."}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e13afaf39f9_7a29c372db1fb46847913c95ea3e63c78d107366.png","alt":"Lösungsteil1","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Der Graph hat ein "},{"type":"a","href":"/1579","children":[{"text":"Extremum"}]},{"text":" (E) auf der "},{"type":"math","src":"y","inline":true,"children":[{"text":"y"}]},{"text":"-Achse. Das heißt, es handelt sich um eine Kosinusfunktion (beziehungsweise eine verschobene Sinusfunktion). "}]},{"type":"p","children":[{"text":"Da es leichter ist, beschränken wir uns hier auf die Kosinusfunktion."}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Aufgrund der bisherigen Erkenntnisse gehen wir zunächst von folgender Form aus:"}]},{"type":"math","src":"g(x)=\\\\cos(x)+3","inline":false,"children":[{"text":"g(x)=\\\\cos(x)+3"}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e13b0f00356_338b31d48a89340e131d3dd1edbdddafce1725fb.png","alt":"Lösungsteil2","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Amplitude ermitteln"}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Als nächsten Schritt betrachten wir die "},{"type":"a","href":"/1569","children":[{"text":"Amplitude"}]},{"text":" der gegeben Kosinusfunktion. Dazu müssen wir den Abstand eines Extremums zu der Ruhelage herausfinden."}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Die Amplitude der Funktion hat den Wert "},{"type":"math","src":"2","inline":true,"children":[{"text":"2"}]},{"text":". Das heißt, sie ist doppelt so groß wie bei der normalen Sinusfunktion. Daraus ergibt sich die vorläufige Form der Funktion:"}]},{"type":"math","src":"g(x)=2\\\\cdot\\\\cos(x)+3","inline":false,"children":[{"text":"g(x)=2\\\\cdot\\\\cos(x)+3"}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e13d0b3f8e3_542af962ee94cb2e532d473c629508001b2d6790.png","alt":"Lösungsteil3","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Untersuchung der Periode"}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Als nächstes untersuchst du die "},{"type":"a","href":"/2113","children":[{"text":"Periode"}]},{"text":" der Funktion. Dazu untersuchst du, wie viele Perioden der gegebenen Funktion in dem "},{"type":"a","href":"/1947","children":[{"text":"Intervall"}]},{"text":" "},{"type":"math","src":"[0,2\\\\pi]","inline":true,"children":[{"text":"[0,2\\\\pi]"}]},{"text":" liegen. Bei der normalen Kosinusfunktion liegt in diesem Intervall genau eine Periode. Hier sind es genau zwei Perioden, da im halben Intervall "},{"type":"math","src":"[0,\\\\pi]","inline":true,"children":[{"text":"[0,\\\\pi]"}]},{"text":" eine Periode liegt. Also ist die Funktion um den Faktor "},{"type":"math","src":"2","inline":true,"children":[{"text":"2"}]},{"text":" gestaucht."}]}]},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Ergebnis"}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Da die Funktion um den "},{"type":"a","href":"/1639","children":[{"text":"Faktor"}]},{"text":" "},{"type":"math","src":"2","inline":true,"children":[{"text":"2"}]},{"text":" gestaucht ist, lautet die Funktion:"}]},{"type":"math","src":"g(x)=2\\\\cdot\\\\cos(2x)+3","inline":false,"children":[{"text":"g(x)=2\\\\cdot\\\\cos(2x)+3"}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e13b3362350_b5c08794fb0621d80c980488ebfc535883be0f8c.png","alt":"Lösungsteil4","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]}}}}}',
      },
      license: {
        id: 1,
        url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
        title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
      },
    },
    {
      id: 53221,
      currentRevision: {
        content:
          '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e022719985b_75abdcf67bb65527808fcc0afa8d5285ed02ca68.png","alt":"Graph3","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]},"solution":{"plugin":"solution","state":{"prerequisite":{"id":"1450","title":"Sinus- und Kosinusfunktion"},"strategy":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"steps":{"plugin":"rows","state":[{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Die "},{"type":"a","href":"/1569","children":[{"text":"Ruhelage"}]},{"text":" der Funktion liegt bei "},{"type":"math","src":"y=2","inline":true,"children":[{"text":"y=2"}]},{"text":"."}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e28fc697b40_7a29c372db1fb46847913c95ea3e63c78d107366.png","alt":"Lösungsteil1","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Als nächstes findest du die Art der Funktion heraus. Handelt es sich bei der Funktion um einen Kosinus oder um einen Sinus?"}]},{"type":"p","children":[{"text":"Da die Funktion die "},{"type":"math","src":"y","inline":true,"children":[{"text":"y"}]},{"text":"-Achse im selben Punkt schneidet wie die Ruhelage, also in "},{"type":"math","src":"S(0\\\\mid 2),","inline":true,"children":[{"text":"S(0\\\\mid 2),"}]},{"text":" handelt es sich um eine Sinusfunktion (beziehungsweise um eine verschobene Kosinusfunktion). Da es die folgenden Schritte erleichtert nehmen wir an, dass es sich um eine Sinusfunktion handelt."}]}]}]},{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Die Funktion ist fürs Erste von der Form:"}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e28fd6293cd_338b31d48a89340e131d3dd1edbdddafce1725fb.png","alt":"Lösungsteil2","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Der nächste Schritt, den du machst, ist die Bestimmung der "},{"type":"a","href":"/1569","children":[{"text":"Amplitude"}]},{"text":"."}]},{"type":"p","children":[{"text":"Da die "},{"type":"a","href":"/1579","children":[{"text":"Extrema"}]},{"text":" jeweils eine Einheit in "},{"type":"math","src":"y","inline":true,"children":[{"text":"y"}]},{"text":"-Richtung von der Ruhelage entfernt sind, handelt es sich um die Standard-Sinus-Amplitude."}]}]}]},{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Da die Amplitude der normalen Amplitude der Sinusfunktion entspricht, bleibt es zunächst bei der Form der Funktion:"}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e28f7de1bd2_542af962ee94cb2e532d473c629508001b2d6790.png","alt":"Lösungsteil3","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Jetzt fehlt dir nur noch die Periode der Funktion."}]},{"type":"p","children":[{"text":"Betrachte dazu zum Beispiel den "},{"type":"math","src":"x","inline":true,"children":[{"text":"x"}]},{"text":"-Achsenabschnitt von "},{"type":"math","src":"0","inline":true,"children":[{"text":"0"}]},{"text":" bis "},{"type":"math","src":"\\\\pi","inline":true,"children":[{"text":"\\\\pi"}]},{"text":". In diesem Abschnitt befinden sich "},{"type":"math","src":"2,5","inline":true,"children":[{"text":"2,5"}]},{"text":" Perioden der Funktion. Da eine Periode der Standard-Sinus-Funktion von "},{"type":"math","src":"0","inline":true,"children":[{"text":"0"}]},{"text":" bis "},{"type":"math","src":"2\\\\pi","inline":true,"children":[{"text":"2\\\\pi"}]},{"text":" geht, multiplizieren wir den Wert "},{"type":"math","src":"2,5","inline":true,"children":[{"text":"2,5"}]},{"text":" mit "},{"type":"math","src":"2","inline":true,"children":[{"text":"2"}]},{"text":". Damit kommen wir auf den Stauchungsfaktor "},{"type":"math","src":"5","inline":true,"children":[{"text":"5"}]},{"text":"."}]}]}]},{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Da die Funktion um den Faktor "},{"type":"math","src":"5","inline":true,"children":[{"text":"5"}]},{"text":" gestaucht ist, lautet die passende Funktion zu dem Bild:"}]},{"type":"p","children":[{"type":"math","src":"h(x)=\\\\sin(5x)+2.","inline":false,"children":[{"text":"h(x)=\\\\sin(5x)+2."}]}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e28f94bba72_b5c08794fb0621d80c980488ebfc535883be0f8c.png","alt":"Lösungsteil4","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]}]}}}}}',
      },
      license: {
        id: 1,
        url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
        title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
      },
    },
    {
      id: 53224,
      currentRevision: {
        content:
          '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e022ab6fcf2_e8d856c4f94af067b2dcbfd4545e68149d1e6a4c.png","alt":"Graph4","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]},"solution":{"plugin":"solution","state":{"prerequisite":{"id":"1450","title":"Sinus- und Kosinusfunktion"},"strategy":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"steps":{"plugin":"rows","state":[{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Die "},{"type":"a","href":"/1569","children":[{"text":"Ruhelage"}]},{"text":" der Funktion entspricht der "},{"type":"math","src":"x","inline":true,"children":[{"text":"x"}]},{"text":"-Achse."}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/6198dae2d124a_5d80f35a0f3044aaf05cf1ce11f72b47e0be0fea.svg","alt":"Lösungsteil1","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Als erstes findest du heraus, ob es sich um eine Sinusfunktion oder eine Kosinusfunktion handelt. "}]},{"type":"p","children":[{"text":"Die Funktion schneidet die "},{"type":"math","src":"y","inline":true,"children":[{"text":"y"}]},{"text":"-Achse weder in einem "},{"type":"a","href":"/1579","children":[{"text":"Extrempunkt"}]},{"text":", noch im Nullpunkt. Betrachtest du aber die "},{"type":"a","href":"/27781","children":[{"text":"Parallele"}]},{"text":" zur "},{"type":"math","src":"y","inline":true,"children":[{"text":"y"}]},{"text":"-Achse durch die Stelle "},{"type":"math","src":"-1","inline":true,"children":[{"text":"-1"}]},{"text":" auf der "},{"type":"math","src":"x","inline":true,"children":[{"text":"x"}]},{"text":"-Achse. Die Funktion schneidet in einem Maximum diese Parallele. Deshalb nehmen wir an, dass es sich um eine verschobene Kosinusfunktion handelt."}]}]}]},{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Da die Kosinusfunktion um eine Einheit nach links verschoben ist, lautet die vorläufige Funktion:"}]},{"type":"p","children":[{"type":"math","src":"i(x)=\\\\cos(x+1).","inline":false,"children":[{"text":"i(x)=\\\\cos(x+1)."}]}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e29907303e2_338b31d48a89340e131d3dd1edbdddafce1725fb.png","alt":"Lösungsteil2","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Jetzt ermittelst du die "},{"type":"a","href":"/1569","children":[{"text":"Amplitude"}]},{"text":" der Funktion."}]},{"type":"p","children":[{"text":"Der Abstand der Extrema zu der Ruhelage hat den Wert "},{"type":"math","src":"1","inline":true,"children":[{"text":"1"}]},{"text":", also wird an der Amplitude der Funktion nichts geändert."}]}]}]},{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Die Amplitude ist bei der Funktion nicht manipuliert."}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e299192a532_542af962ee94cb2e532d473c629508001b2d6790.png","alt":"Lösungsteil3","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Als letztes fehlt dir nur noch die Periode der Funktion."}]},{"type":"p","children":[{"text":"Dazu betrachten wir ein "},{"type":"a","href":"/1947","children":[{"text":"Intervall"}]},{"text":" der Länge "},{"type":"math","src":"\\\\pi","inline":true,"children":[{"text":"\\\\pi"}]},{"text":" das von "},{"type":"math","src":"-1","inline":true,"children":[{"text":"-1"}]},{"text":" nach rechts verläuft. In diesem Intervall befinden sich "},{"type":"math","src":"1,5","inline":true,"children":[{"text":"1,5"}]},{"text":" Perioden der Funktion, also "},{"type":"math","src":"3","inline":true,"children":[{"text":"3"}]},{"text":" in einem Intervall von "},{"type":"math","src":"2\\\\pi","inline":true,"children":[{"text":"2\\\\pi"}]},{"text":". Da "},{"type":"math","src":"2\\\\pi","inline":true,"children":[{"text":"2\\\\pi"}]},{"text":" die Periode der Standard-Kosinus-Funktion ist, ist die Funktion um den Faktor "},{"type":"math","src":"3","inline":true,"children":[{"text":"3"}]},{"text":" gestaucht."}]}]}]},{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Da die Funktion um den Faktor "},{"type":"math","src":"3","inline":true,"children":[{"text":"3"}]},{"text":" gestaucht ist, lautet sie: "}]},{"type":"math","src":"i\\\\left(x\\\\right)=\\\\cos\\\\left(3\\\\left(x+1\\\\right)\\\\right)","inline":false,"children":[{"text":""}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e29930b1d78_b5c08794fb0621d80c980488ebfc535883be0f8c.png","alt":"Lösungsteil4","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]}]}}}}}',
      },
      license: {
        id: 1,
        url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
        title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
      },
    },
  ],
}

export const groupedExerciseUuidMock = {
  __typename: UuidType.GroupedExercise,
  id: 53209,
  alias:
    '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen/aufgaben-verschieben-strecken-trigonometrischer-funktionen/53205/53209',
  instance: 'de',
  license: {
    id: 1,
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
    title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
  },
  currentRevision: {
    content:
      '{"plugin":"exercise","state":{"content":{"plugin":"rows","state":[{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e021a8c95ce_de1b6de2a64aebbb6030e31fff0f5e353b784a48.png","alt":"Graph1","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]},"solution":{"plugin":"solution","state":{"prerequisite":{"id":"1450","title":"Sinus- und Kosinusfunktion"},"strategy":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"steps":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Die "},{"type":"a","href":"/1569","children":[{"text":"Ruhelage"}]},{"text":" der Funktion liegt auf der "},{"type":"math","src":"x","inline":true,"children":[{"text":"x"}]},{"text":"-Achse."}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e134ad11931_7a29c372db1fb46847913c95ea3e63c78d107366.png","alt":"Lösungsteil1","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Der Graph schneidet das Koordinatensystem im Nullpunkt, also handelt es sich um eine Sinusfunktion (beziehungsweise einen verschobenen Kosinus)."}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e1347fd9dc1_338b31d48a89340e131d3dd1edbdddafce1725fb.png","alt":"Lösungsteil2","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Da es leichter ist, verwendest du in den weiteren Schritten die Sinusfunktion."}]},{"type":"p","children":[{"text":"Im nächsten Schritt suchst du nach der "},{"type":"a","href":"/1569","children":[{"text":"Amplitude"}]},{"text":" der Funktion."}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Die Amplitude der Funktion ist "},{"type":"math","src":"3","inline":true,"children":[{"text":"3"}]},{"text":". Das heißt, dass die Funktion vorerst von der Form "},{"type":"math","src":"f(x)=3\\\\cdot\\\\sin(x)","inline":true,"children":[{"text":"f(x)=3\\\\cdot\\\\sin(x)"}]},{"text":" ist."}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e1346338a3e_542af962ee94cb2e532d473c629508001b2d6790.png","alt":"Lösungsteil3","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Jetzt fehlt dir nur noch die "},{"type":"a","href":"/2113","children":[{"text":"Periode"}]},{"text":" der Funktion. Am Graphen kannst du ablesen, dass diese "},{"type":"math","src":"2\\\\pi","inline":true,"children":[{"text":"2\\\\pi"}]},{"text":" beträgt. Das ist die normale Periode von der Sinusfunktion."}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Da die Periode der Sinusfunktion nicht verändert wurde, lautet die Funktion:"}]},{"type":"p","children":[{"type":"math","src":"f(x)=3\\\\cdot\\\\sin(x).","inline":false,"children":[{"text":"f(x)=3\\\\cdot\\\\sin(x)."}]}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/56e1345199b59_b5c08794fb0621d80c980488ebfc535883be0f8c.png","alt":"Lösungsteil4","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}}]}}}}}',
  },
  exerciseGroup: {
    alias: '/mathe/12345/12345',
  },
}

export const courseUuidMock_id = {
  __typename: UuidType.Course,
  id: 51979,
  alias:
    '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen',
  instance: 'de',
  license: {
    id: 1,
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
    title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
  },
  taxonomyTerms: {
    nodes: [
      {
        navigation: {
          path: {
            nodes: [
              {
                label: 'Mathematik',
                url: '/mathe',
              },
              {
                label: 'Alle Themen',
                url: '/mathe/5',
              },
              {
                label: 'Funktionen',
                url: '/mathe/funktionen',
              },
              {
                label: 'Wichtige Funktionstypen und ihre Eigenschaften',
                url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften',
              },
              {
                label: 'Polynomfunktionen beliebigen Grades',
                url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/polynomfunktionen-beliebigen-grades',
              },
            ],
          },
        },
      },
      {
        navigation: {
          path: {
            nodes: [
              {
                label: 'Mathematik',
                url: '/mathe',
              },
              {
                label: 'Gymnasium',
                url: '/mathe/deutschland/bayern/gymnasium',
              },
              {
                label: 'Klasse 10',
                url: '/mathe/deutschland/bayern/gymnasium/klasse-10',
              },
              {
                label: 'Graphen ganzrationaler Funktionen',
                url: '/mathe/deutschland/bayern/gymnasium/klasse-10/graphen-ganzrationaler-funktionen',
              },
            ],
          },
        },
      },
      {
        navigation: {
          path: {
            nodes: [
              {
                label: 'Mathematik',
                url: '/mathe',
              },
              {
                label: 'Alle Themen',
                url: '/mathe/5',
              },
              {
                label: 'Deutschland',
                url: '/mathe/deutschland',
              },
              {
                label: 'Bayern',
                url: '/mathe/deutschland/bayern',
              },
              {
                label: 'FOS Technik',
                url: '/mathe/deutschland/bayern/fos-technik',
              },
              {
                label: 'Klasse 11',
                url: '/mathe/deutschland/bayern/fos-technik/klasse-11',
              },
              {
                label: 'Ganzrationale Funktionen ',
                url: '/mathe/deutschland/bayern/fos-technik/klasse-11/ganzrationale-funktionen',
              },
              {
                label: 'Nullstellen ganzrationaler Funktionen berechnen',
                url: '/mathe/deutschland/bayern/fos-technik/klasse-11/ganzrationale-funktionen/nullstellen-ganzrationaler-funktionen-berechnen',
              },
            ],
          },
        },
      },
      {
        navigation: {
          path: {
            nodes: [
              {
                label: 'Mathematik',
                url: '/mathe',
              },
              {
                label: 'FOS & BOS',
                url: '/mathe/deutschland/bayern/fos-bos---technisch',
              },
              {
                label: 'Klasse 11',
                url: '/mathe/deutschland/bayern/fos-bos---technisch/klasse-11',
              },
              {
                label: 'Ganzrationale Funktionen ',
                url: '/mathe/deutschland/bayern/fos-bos---technisch/klasse-11/ganzrationale-funktionen',
              },
              {
                label: 'Nullstellen ganzrationaler Funktionen berechnen',
                url: '/mathe/deutschland/bayern/fos-bos---technisch/klasse-11/ganzrationale-funktionen/nullstellen-ganzrationaler-funktionen-berechnen',
              },
            ],
          },
        },
      },
    ],
  },
  pages: [
    {
      alias:
        '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/uebersicht',
    },
    {
      alias: '/51522/nullstellen',
    },
    {
      alias: '/51551/aufgaben-nullstellen-evtl-geloescht',
    },
    {
      alias:
        '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/linearfaktordarstellung-1-3',
    },
    {
      alias: '/52035/linearfaktordarstellung-2-3',
    },
    {
      alias:
        '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/linearfaktordarstellung-3-3',
    },
    {
      alias:
        '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/uebersicht-berechnungsmethoden',
    },
    {
      alias:
        '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/0-hilfestellungen',
    },
    {
      alias: '/52338/1-termumformungen',
    },
    {
      alias:
        '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/2-ausklammern-faktoren-1-2',
    },
    {
      alias: '/52448/2-ausklammern-faktoren-2-2',
    },
    {
      alias:
        '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/3-loesen-mithilfe-polynomdivision-1-2',
    },
    {
      alias:
        '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/3-loesen-mithilfe-polynomdivision-2-2',
    },
    {
      alias: '/52032/3-loesen-substitution-1',
    },
    {
      alias:
        '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/4-loesen-substitution-1-2',
    },
    {
      alias:
        '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/4-loesen-substitution-2-2',
    },
    {
      alias:
        '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/schema-nullstellenberechnung',
    },
    {
      alias:
        '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/aufgaben-nullstellenberechnung',
    },
    {
      alias: '/52336/zusammenfassung',
    },
    {
      alias: null,
    },
    {
      alias: null,
    },
  ],
}

export const courseUuidMock_alias = {
  __typename: UuidType.CoursePage,
  id: 52020,
  alias:
    '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/uebersicht',
  instance: 'de',
  license: {
    id: 1,
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
    title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
  },
  currentRevision: {
    content:
      '{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Ziel dieses Kurses ist es, einen Überblick zur möglichen Vorgehensweise beim Finden von Nullstellen von Polynomfunktionen zu geben."}]},{"type":"p","children":[{"text":" "}]},{"type":"p","children":[{"text":"Inhalte"}]},{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Erarbeitung der Linearfaktordarstellung"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Methoden der Nullstellenberechnung"}]},{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Termumformungen"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Ausklammern von Faktoren"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Lösen mithilfe der Polynomdivision"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Lösen durch Substitution"}]}]}]}]}]}]}]},{"type":"p","children":[{"text":"Vorwissen"}]},{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Funktionsbegriff"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Polynomfunktion"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Definition einer Nullstelle"}]}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"type":"p","children":[{"text":"Berechnung von Nullstellen bei linearen und quadratischen Funktionen"}]}]}]}]}]}]}',
    title: 'Übersicht',
  },
  course: {
    id: 51979,
    currentRevision: {
      title: 'Berechnungsmethoden - Nullstellen von Polynomfunktionen',
    },
    pages: [
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/uebersicht',
        id: 52020,
        currentRevision: {
          title: 'Übersicht',
        },
      },
      {
        alias: '/51522/nullstellen',
        id: 51522,
        currentRevision: {
          title: 'Nullstellen',
        },
      },
      {
        alias: '/51551/aufgaben-nullstellen-evtl-geloescht',
        id: 51551,
        currentRevision: {
          title: 'Aufgaben zu Nullstellen (wird evtl. gelöscht)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/linearfaktordarstellung-1-3',
        id: 51553,
        currentRevision: {
          title: 'Linearfaktordarstellung (1|3)',
        },
      },
      {
        alias: '/52035/linearfaktordarstellung-2-3',
        id: 52035,
        currentRevision: {
          title: 'Linearfaktordarstellung (2|3)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/linearfaktordarstellung-3-3',
        id: 52365,
        currentRevision: {
          title: 'Linearfaktordarstellung (3|3)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/uebersicht-berechnungsmethoden',
        id: 51555,
        currentRevision: {
          title: 'Übersicht - Berechnungsmethoden',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/0-hilfestellungen',
        id: 52344,
        currentRevision: {
          title: '0. Hilfestellungen',
        },
      },
      {
        alias: '/52338/1-termumformungen',
        id: 52338,
        currentRevision: {
          title: '1. Termumformungen',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/2-ausklammern-faktoren-1-2',
        id: 52342,
        currentRevision: {
          title: '2. Ausklammern von Faktoren (1|2)',
        },
      },
      {
        alias: '/52448/2-ausklammern-faktoren-2-2',
        id: 52448,
        currentRevision: {
          title: '2. Ausklammern von Faktoren (2|2)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/3-loesen-mithilfe-polynomdivision-1-2',
        id: 123826,
        currentRevision: {
          title: '3. Lösen mithilfe der Polynomdivision (1|2)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/3-loesen-mithilfe-polynomdivision-2-2',
        id: 123982,
        currentRevision: {
          title: '3. Lösen mithilfe der Polynomdivision (2|2)',
        },
      },
      {
        alias: '/52032/3-loesen-substitution-1',
        id: 52032,
        currentRevision: {
          title: '3. Lösen durch Substitution (1| )',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/4-loesen-substitution-1-2',
        id: 52256,
        currentRevision: {
          title: '4. Lösen durch Substitution (1|2)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/4-loesen-substitution-2-2',
        id: 52411,
        currentRevision: {
          title: '4. Lösen durch Substitution (2|2)',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/schema-nullstellenberechnung',
        id: 52340,
        currentRevision: {
          title: 'Schema zur Nullstellenberechnung',
        },
      },
      {
        alias:
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/aufgaben-nullstellenberechnung',
        id: 51557,
        currentRevision: {
          title: 'Aufgaben zur Nullstellenberechnung',
        },
      },
      {
        alias: '/52336/zusammenfassung',
        id: 52336,
        currentRevision: {
          title: 'Zusammenfassung',
        },
      },
      {
        alias: null,
        id: 52371,
        currentRevision: null,
      },
      {
        alias: null,
        id: 123981,
        currentRevision: null,
      },
    ],
    taxonomyTerms: {
      nodes: [
        {
          navigation: {
            path: {
              nodes: [
                {
                  label: 'Mathematik',
                  url: '/mathe',
                },
                {
                  label: 'Alle Themen',
                  url: '/mathe/5',
                },
                {
                  label: 'Funktionen',
                  url: '/mathe/funktionen',
                },
                {
                  label: 'Wichtige Funktionstypen und ihre Eigenschaften',
                  url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften',
                },
                {
                  label: 'Polynomfunktionen beliebigen Grades',
                  url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/polynomfunktionen-beliebigen-grades',
                },
              ],
            },
          },
        },
        {
          navigation: {
            path: {
              nodes: [
                {
                  label: 'Mathematik',
                  url: '/mathe',
                },
                {
                  label: 'Gymnasium',
                  url: '/mathe/deutschland/bayern/gymnasium',
                },
                {
                  label: 'Klasse 10',
                  url: '/mathe/deutschland/bayern/gymnasium/klasse-10',
                },
                {
                  label: 'Graphen ganzrationaler Funktionen',
                  url: '/mathe/deutschland/bayern/gymnasium/klasse-10/graphen-ganzrationaler-funktionen',
                },
              ],
            },
          },
        },
        {
          navigation: {
            path: {
              nodes: [
                {
                  label: 'Mathematik',
                  url: '/mathe',
                },
                {
                  label: 'Alle Themen',
                  url: '/mathe/5',
                },
                {
                  label: 'Deutschland',
                  url: '/mathe/deutschland',
                },
                {
                  label: 'Bayern',
                  url: '/mathe/deutschland/bayern',
                },
                {
                  label: 'FOS Technik',
                  url: '/mathe/deutschland/bayern/fos-technik',
                },
                {
                  label: 'Klasse 11',
                  url: '/mathe/deutschland/bayern/fos-technik/klasse-11',
                },
                {
                  label: 'Ganzrationale Funktionen ',
                  url: '/mathe/deutschland/bayern/fos-technik/klasse-11/ganzrationale-funktionen',
                },
                {
                  label: 'Nullstellen ganzrationaler Funktionen berechnen',
                  url: '/mathe/deutschland/bayern/fos-technik/klasse-11/ganzrationale-funktionen/nullstellen-ganzrationaler-funktionen-berechnen',
                },
              ],
            },
          },
        },
        {
          navigation: {
            path: {
              nodes: [
                {
                  label: 'Mathematik',
                  url: '/mathe',
                },
                {
                  label: 'FOS & BOS',
                  url: '/mathe/deutschland/bayern/fos-bos---technisch',
                },
                {
                  label: 'Klasse 11',
                  url: '/mathe/deutschland/bayern/fos-bos---technisch/klasse-11',
                },
                {
                  label: 'Ganzrationale Funktionen ',
                  url: '/mathe/deutschland/bayern/fos-bos---technisch/klasse-11/ganzrationale-funktionen',
                },
                {
                  label: 'Nullstellen ganzrationaler Funktionen berechnen',
                  url: '/mathe/deutschland/bayern/fos-bos---technisch/klasse-11/ganzrationale-funktionen/nullstellen-ganzrationaler-funktionen-berechnen',
                },
              ],
            },
          },
        },
      ],
    },
  },
}

export const eventUuidMock = {
  __typename: UuidType.Event,
  id: 145590,
  alias: '/community/veranstaltungen/digital-learning-summer-academy-2020',
  instance: 'de',
  license: {
    id: 1,
    url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.de',
    title: 'Dieses Werk steht unter der freien Lizenz CC BY-SA 4.0',
  },
  taxonomyTerms: {
    nodes: [
      {
        navigation: {
          path: {
            nodes: [
              {
                label: 'Community',
                url: '/community',
              },
              {
                label: 'Community Übersicht',
                url: '/community/-87993',
              },
              {
                label: 'Veranstaltungen',
                url: '/community/veranstaltungen',
              },
            ],
          },
        },
      },
    ],
  },
  currentRevision: {
    content:
      '{"plugin":"rows","state":[{"plugin":"multimedia","state":{"explanation":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"31.08.20 - 25.09.2020, Mo-Fr ","strong":true}]},{"type":"h","level":3,"children":[{"text":"Digital Learning Academy in München"}]},{"type":"p","children":[{"text":"online"}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":"Gemeinsame Arbeit an Lerninhalten, Workshops zu verschiedenen Themen und viel Teambuilding"}]}]}]},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/5e1dd1af01cbb_3f55069f153bbb4d59cd357a0ed28bb6104638d7.jpg"}},"illustrating":true,"width":50}},{"plugin":"spoiler","state":{"title":"Mehr Infos","content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Während der Academy kommen Autor*innen zusammen, um gemeinsam Lerninhalte zu erstellen, neue Leute kennenzulernen und die Plattform weiterzuentwickeln."}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":"Als Teilnehmer*in hast du die Möglichkeit, an einer Vielzahl von Weiterbildungsmöglichkeiten teilzunehmen, beispielsweise zu Lizenzen & Urheberrecht, LaTeX oder Bildbearbeitung."}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":"In Aktivitäten wie Energizern und gemeinsamen Spieleabenden machen wir den Kopf frei für neue Ideen."}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":"Aber nicht nur ehrenamtliche Autor*innen können an der Academy teilnehmen, sondern auch (Lehramts-)Studierende auf der Suche nach einem Praktikum. Genauere Infos zum Praktikum findest du auf unserer"},{"type":"a","href":"/jobs","children":[{"text":" Jobseite"}]},{"text":"."}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/5dfb4b0660834_e4712fccb288acb775300cfbf32ced90d41a8799.jpg"}},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Programm"}]},{"type":"p","children":[{"text":"In den ersten beiden Wochen bekommst du einen umfassenden Einstieg als Autor*in auf "},{"type":"a","href":"https://serlo.org.","children":[{"text":"serlo.org."}]},{"text":" Basierend auf diesen Erfahrungen kannst du anschließend im Projektmanagement der Redaktion mitwirken."}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":"Da Workshops und Vorträge je nach Bedarf der Teilnehmer*innen organisiert werden, werden entsprechende Termine im "},{"type":"a","href":"https://community.serlo.org","children":[{"text":"Communitychat"}]},{"text":" in #general angekündigt. So können auch spontane Besucher*innen via Videokonferenz teilnehmen."}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":"Das Programm findet von "},{"text":"Montag bis Freitag von 9 Uhr bis 17 Uhr","strong":true},{"text":" statt. "}]}]},{"plugin":"table","state":"|||\\n|||\\n|Woche 1|Einstieg in die redaktionelle Arbeit|\\n|Woche 2|Vertiefung der redaktionellen Arbeit|\\n|Woche 3|Mitarbeit im Projektmanagement der Redaktion|\\n|Woche 4|vertiefte Mitarbeit im Projektmanagement der Redaktion|"},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Ort"}]},{"type":"p","children":[{"text":"Aufgrund der aktuellen Pandemie planen wir eine online Teilnahme. Unsere Erfahrungen mit intensiven Online Meetings machen dies möglich."}]}]},{"plugin":"image","state":{"src":"https://assets.serlo.org/5ee086fe2a24f_74cbf8c83d2725943c75b41ab64148f7e7dce752.jpg"}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Sollte sich die aktuelle Situation bessern, sind vereinzelte Aktivitäten im Münchner Serlo Büro (Daiserstr. 15) denkbar. Deren Teilnahme ist jedoch nicht verpflichtend und die Integration der online Teilnehmenden steht an erster Stelle. "}]}]},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Anmeldung"}]},{"type":"p","children":[{"text":"Eine Anmeldung ist im Vorfeld nicht nötig. "}]},{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":"Als Praktikant*in muss zuvor eine Bewerbung via Mail an "},{"type":"a","href":"mailto:kathi@serlo.org","children":[{"text":"kathi@serlo.org"}]},{"text":" erfolgen."}]}]},{"plugin":"text","state":[{"type":"h","level":3,"children":[{"text":"Ansprechpartnerin"}]},{"type":"p","children":[{"text":"Katharina Radstorfer"}]},{"type":"p","children":[{"text":""},{"type":"a","href":"mailto:kathi@serlo.org","children":[{"text":"kathi@serlo.org"}]},{"text":""}]}]},{"plugin":"important","state":{"plugin":"text","state":[{"type":"p","children":[{"text":"","strong":true},{"type":"a","href":"https://calendar.google.com/event?action=TEMPLATE&tmeid=MGY4OXBmdjM2MmNqZGxnc2MxYXR1aHNlZHQgc2VybG8ub3JnX2I0bmE3bnU2OW50cDRqZWpwN2o3ZGJpOGVvQGc&tmsrc=serlo.org_b4na7nu69ntp4jejp7j7dbi8eo%40group.calendar.google.com","children":[{"text":"Termin zum Kalender hinzufügen","strong":true}]},{"text":"","strong":true}]}]}}]}}}]}',
  },
}
