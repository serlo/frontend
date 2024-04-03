import { NextPage } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase>
      <HeadTags
        data={{
          title: 'Meine Mathe-Skills (alpha)',
          metaDescription:
            'Werde fit in Mathematik mit dynamischen Aufgaben. Diese generieren sich für dich jedes Mal neu. So entscheidest du, wie viel Übung du brauchst, bis du dich sicher fühlst.',
        }}
      />
      <h1 className="serlo-h1">Meine Mathe-Skills (alpha)</h1>
      <p className="serlo-p">
        Werde fit in Mathematik mit dynamischen Aufgaben. Diese generieren sich
        für dich jedes Mal neu. So entscheidest du, wie viel Übung du brauchst,
        bis du dich sicher fühlst.
      </p>
      <p className="serlo-p">Aktuell verfügbare Inhalte:</p>
      <ul className="serlo-ul">
        <li className="serlo-p">
          Realschule Bayern: Training für die Abschlussprüfung Zweig I und Zweig
          II/III
        </li>
      </ul>
      <div className="mb-24 mt-12 text-center">
        <a
          href="https://frontend-git-meine-mathe-skills-serlo.vercel.app/meine-mathe-skills"
          target="_blank"
          rel="noreferrer"
          className="serlo-button-green"
        >
          Meine Mathe-Skills öffnen
        </a>
      </div>
      <p className="border-t pt-2">
        Dieser Prototyp wird im Rahmen von Serlo entwickelt, um selbstbestimmtes
        Lernen im Kontext Schule zu ermöglichen und zu erleichtern. Im Fach
        Mathematik ist dabei die große Voraussetzung, dass jederzeit Aufgaben
        auf dem optimalen Anforderungsniveau verfügbar sind. Leider ist das mit
        &quot;klassischen&quot; Inhalten, wo jede einzelne Aufgabe per Hand
        angelegt wird, nur schwer zu leisten. Hier kommen digitale Technologien
        zur Hilfe: Die Aufgabe wird durch einen dynamischen Generator
        aufgeschlaut und kann bei jedem Besuch eine neue Aufgabe erzeugen. Die
        Generatoren sind so variantenreich, dass sich die Aufgaben fast nie
        wiederholen - aber trotzdem sind die Aufgaben von der Struktur sehr
        ähnlich. Damit hat man nicht nur viel Übung, sondern begreift auch mehr,
        dass es in der Mathematik nicht ums Auswendiglernen geht, sondern um die
        dahinterliegenden Strukturen.
      </p>
      <div className="h-12"></div>
    </FrontendClientBase>
  )
}

export default ContentPage
