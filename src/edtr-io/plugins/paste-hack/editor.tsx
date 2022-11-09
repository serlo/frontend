import { useScopedStore } from '@edtr-io/core'
import {
  getParent,
  insertChildBefore,
  serializeDocument,
  removeChild,
} from '@edtr-io/store'
import { either as E } from 'fp-ts'
import * as t from 'io-ts'

import { PasteHackPluginProps } from '.'
import { showToastNotice } from '@/helper/show-toast-notice'

const dummyContent =
  '{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{"text":"Das Fachgebiet "},{"text":"forensische","em":true,"color":2},{"text":" Physik","em":true},{"text":" und "},{"text":"Elektronik","em":true},{"text":" ist in der von uns verwendeten Systematik sehr eng begrenzt auf die beiden Aufgabenbereiche "}]},{"type":"unordered-list","children":[{"type":"list-item","children":[{"type":"list-item-child","children":[{"text":"Untersuchung elektrischer Apparaturen ","em":true},{"text":"und"},{"text":" ","em":true}]}]},{"type":"list-item","children":[{"type":"list-item-child","children":[{"text":"Elektronische Sicherungseinrichtungen","em":true},{"text":"."}]}]}]},{"type":"p","children":[{"text":"Dies macht dir einerseits einmal mehr deutlich, wie spezialisiert die wissenschaftlichen Aufgabenbereiche in der Forensik sind, andererseits aber auch, wie übergreifend die Aufgaben zu erledigen sind. Beispielsweise werden nach unserer Systematik die  Bereiche der "},{"text":"Ballistik","em":true},{"text":", "},{"text":"Werkstoff-","em":true},{"text":" und "},{"text":"Elektrotechnik","em":true},{"text":"  in den Sparten "},{"text":"forensische","em":true,"color":2},{"text":" Ingenieurswissenschaften","em":true},{"text":" und "},{"text":"forensische","em":true,"color":2},{"text":" Informatik","em":true},{"text":" "},{"text":"und Kommunikation","em":true},{"text":" in gesonderten Einführungskursen behandelt."}]}]},{"plugin":"image","state":{"src":"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Quark_structure_proton.svg/1920px-Quark_structure_proton.svg.png","alt":"Quark (Physik)","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},{"plugin":"text","state":[{"type":"p","children":[{"text":"Die hier aufgeführten Aufgabenbereiche dienen vor allem der Aufklärung von Kriminalfällen und Schadenvorgängen durch kriminaltechnische Spurenauswertungen an mechanischen und elektronischen Sicherungseinrichtungen an Objekten und Kraftfahrzeugen. Hierbei handelt es sich um eine hochspezialisierte Anwendung wissenschaftlicher Erkenntnisse und Methoden aus Physik und Elektronik.  "}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Du kannst dir jetzt sicherlich vorstellen, wie schwierig es ist, die vielfältigen, aber wiederum sich ergänzenden wissenschaftlichen Bereiche organisatorisch sinnvoll miteinander zu verknüpfen. Aus diesem Grunde besteht zum Beispiel im "},{"text":"Kriminaltechnischen Institut  des  Bundeskriminalamtes","em":true},{"text":"  (BKA) eine Arbeitsgruppe Chemie/Physik und nicht zwei getrennte Arbeitsgruppen."}]},{"type":"p","children":[{"text":""}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Quellen: "},{"type":"a","href":"https://www.cybersicherheit.fraunhofer.de/de/kursangebote/it-forensik.html","children":[{"text":"IT-Forensik (fraunhofer.de)"}]},{"text":"; "},{"type":"a","href":"https://de.wikipedia.org/wiki/Forensik","children":[{"text":"Forensik – Wikipedia"}]},{"text":"; "},{"type":"a","href":"https://www.cities-eu.org/sites/default/files/attachments/de/068_DE_Forensik_Theo_0.0.pdf","children":[{"text":"Microsoft Word - Template_For_Deu_Theo.doc (cities-eu.org)"}]},{"text":"; "},{"type":"a","href":"https://gifsa.ac.in/forensic-physics/","children":[{"text":"Forensic Physics – GOVERNMENT INSTITUTE OF FORENSIC SCIENCE (gifsa.ac.in)"}]},{"text":"; "},{"type":"a","href":"https://www.goeth.com/","children":[{"text":"Kriminaltechnisches Prüflabor - Sachverständigenbüro • GOETH GmbH"}]},{"text":"; "},{"type":"a","href":"https://de.wikipedia.org/wiki/Sicherungstechnik","children":[{"text":"Sicherungstechnik – Wikipedia"}]},{"text":"; "},{"type":"a","href":"https://www.bka.de/DE/UnsereAufgaben/Ermittlungsunterstuetzung/Kriminaltechnik/kriminaltechnik_node.html","children":[{"text":"BKA - Kriminaltechnik"}]},{"text":""}]}]}]}'

const StateDecoder = t.strict({
  plugin: t.literal('rows'),
  state: t.array(
    t.strict({
      plugin: t.union([
        t.literal('article'),
        t.literal('articleIntroduction'),
        t.literal('geogebra'),
        t.literal('anchor'),
        t.literal('video'),
        t.literal('table'),
        t.literal('serloTable'),
        t.literal('highlight'),
        t.literal('injection'),
        t.literal('layout'),
        t.literal('multimedia'),
        t.literal('spoiler'),
        t.literal('important'),
        t.literal('blockquote'),
        t.literal('box'),
        t.literal('image'),
        t.literal('text'),
        t.literal('equations'),
      ]),
      state: t.unknown,
    })
  ),
})

export const PasteHackEditor: React.FunctionComponent<PasteHackPluginProps> = (
  props
) => {
  const store = useScopedStore()

  function throwError(error?: unknown) {
    showToastNotice('⚠️ Sorry, something is wrong with the data.', 'warning')
    // eslint-disable-next-line no-console
    console.error(error)
    throw new Error(
      'JSON input data is not a valid edtr-state or contains unsupported plugins'
    )
  }

  function replaceWithStateString() {
    const decoded = StateDecoder.decode(JSON.parse(dummyContent))

    if (E.isLeft(decoded)) return throwError()

    const content = decoded.right

    try {
      const parentPlugin = getParent(props.id)(store.getState())

      if (
        parentPlugin == null ||
        serializeDocument(parentPlugin.id)(store.getState())?.plugin !== 'rows'
      ) {
        const msg = 'only use on rows plugin!'
        showToastNotice(msg)
        // eslint-disable-next-line no-console
        console.error(msg)
        return
      }

      const documents = content.plugin === 'rows' ? content.state : [content]

      for (const document of documents) {
        store.dispatch(
          insertChildBefore({
            parent: parentPlugin.id,
            sibling: props.id,
            document,
          })
        )
      }
      store.dispatch(removeChild({ parent: parentPlugin.id, child: props.id }))
    } catch (error) {
      throwError(error)
    }
  }

  return <div>{renderDataImport()}</div>

  function renderDataImport() {
    return (
      <div className="bg-amber-50 p-4">
        <b className="serlo-h4 block ml-0 mb-4">Experimental Import</b>
        <p className="mb-4">–</p>
        <button
          className="serlo-button bg-amber-200 hover:bg-amber-300 focus:bg-amber-300 mb-12 text-base"
          onClick={replaceWithStateString}
        >
          Import Edtr JSON
        </button>
      </div>
    )
  }
}
