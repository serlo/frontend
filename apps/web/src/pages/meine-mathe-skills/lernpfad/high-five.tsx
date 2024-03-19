import { NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { MathSkillsWrapper } from '@/components/math-skills/math-skills-wrapper/math-skills-wrapper'
import { useMathSkillsStorage } from '@/components/math-skills/utils/math-skills-data-context'
import { cn } from '@/helper/cn'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      showNav={false}
      authorization={{}}
    >
      <HeadTags
        data={{
          title: `Lernpfad High Five - meine Mathe-Skills`,
          metaDescription: 'Zeige deine mathematischen Skills',
        }}
      />
      <MathSkillsWrapper>
        <Content />
      </MathSkillsWrapper>
    </FrontendClientBase>
  )
}

function Content() {
  const [selected, setSelected] = useState(-1)
  const [renderCounter, setRenderCounter] = useState(1)
  const [showAll, setShowAll] = useState(false)

  const { updateData, data } = useMathSkillsStorage()

  return (
    <div className="mx-auto w-fit px-4">
      {selected === -1 ? (
        <>
          <h2 className="mb-3 mt-8 text-2xl font-bold">High Five</h2>
          <p>Eine entspannte Tour durch die Highlights der 5. Klasse</p>
          <p className="mb-7 mt-4">
            <Link href="/meine-mathe-skills">zurück zur Lernpfad-Auswahl</Link>
          </p>
          <div
            className="relative h-[668px] w-[800px]"
            style={{
              backgroundImage: "url('/_assets/mathe-skills/high-five.jpg')",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 668"
              className="relative"
            >
              {Object.entries(levels).map(([id, levelData]) => {
                const lid = parseInt(id)
                if (
                  data.highFiveSolved.includes(lid) ||
                  levels[lid].deps.length === 0 ||
                  levels[lid].deps.some((dep) =>
                    data.highFiveSolved.includes(dep)
                  ) ||
                  showAll
                )
                  return (
                    <Fragment key={id}>
                      {levelData.deps.map((dep) => {
                        if (data.highFiveSolved.includes(dep) || showAll) {
                          return (
                            <line
                              key={`connect-${id}-${dep}`}
                              x1={levelData.x}
                              y1={levelData.y}
                              x2={levels[dep].x}
                              y2={levels[dep].y}
                              strokeWidth="10"
                              stroke="rgba(148, 163, 184, 0.8)"
                            />
                          )
                        } else {
                          return null
                        }
                      })}
                    </Fragment>
                  )

                return null
              })}
            </svg>
            {Object.entries(levels).map(([id, levelData]) => {
              const lid = parseInt(id)
              if (
                data.highFiveSolved.includes(lid) ||
                levels[lid].deps.length === 0 ||
                levels[lid].deps.some((dep) =>
                  data.highFiveSolved.includes(dep)
                ) ||
                showAll
              )
                return (
                  <div
                    className="absolute flex w-0 items-center justify-center"
                    style={{
                      left: `${levelData.x}px`,
                      top: `${levelData.y}px`,
                    }}
                    key={id}
                  >
                    <button
                      className={cn(
                        'absolute whitespace-nowrap  rounded px-2 py-0.5 font-bold',
                        data.highFiveSolved.includes(parseInt(id))
                          ? 'bg-gray-200 hover:bg-gray-300'
                          : 'bg-newgreen hover:bg-newgreen-600'
                      )}
                      onClick={() => {
                        setSelected(parseInt(id))
                      }}
                    >
                      {levelData.title}
                    </button>
                  </div>
                )
            })}
          </div>
          <div className="mb-4 mt-3 text-right text-sm">
            <label>
              <input
                type="checkbox"
                onChange={(e) => {
                  setShowAll(e.target.checked)
                }}
              />{' '}
              Karte aufklappen
            </label>
          </div>
        </>
      ) : (
        <div className="w-[800px]">
          <h2 className="mb-3 mt-8 text-2xl font-bold">
            High Five - {levels[selected].title}
          </h2>
          <p>
            <button
              onClick={() => {
                setSelected(-1)
                setRenderCounter((counter) => counter + 1)
              }}
              className="serlo-link"
            >
              zurück
            </button>
          </p>
          <main className="mt-8 text-base [&>p]:my-4 [&>p]:text-lg">
            {levels[selected].component(renderCounter, () => {
              updateData((data) => {
                if (!data.highFiveSolved.includes(selected)) {
                  data.highFiveSolved.push(selected)
                }
                setSelected(-1)
              })
            })}
          </main>
        </div>
      )}
    </div>
  )
}

export default ContentPage

function RealmathInjection({
  url,
  height,
  onClose,
  target,
}: {
  url: string
  height?: number
  onClose: () => void
  target: number
}) {
  const [score, setScore] = useState(-1)

  function handler(e: MessageEvent) {
    if (typeof e.data === 'string') {
      const str = e.data
      if (str.startsWith('score')) {
        const score = parseInt(str.slice(5))
        if (!isNaN(score) && score > 0) {
          setScore(score)
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('message', handler)
    return () => {
      window.removeEventListener('message', handler)
    }
  }, [])
  return (
    <>
      <div className="mb-4 mt-12 w-full rounded bg-gray-100 p-3">
        {score < target ? (
          <>
            Erreiche {target} Punkte. Aktueller Stand:{' '}
            <strong>{Math.max(score, 0)} Punkte</strong>
          </>
        ) : (
          <div className="text-center">
            <button
              className=" rounded bg-newgreen px-2 py-0.5 font-bold hover:bg-newgreen-600"
              onClick={onClose}
            >
              Super, Aufgabe abschließen
            </button>
          </div>
        )}
      </div>
      <iframe
        src={`/api/frontend/realmath/embed?url=${encodeURIComponent(url)}`}
        className={cn(
          'mb-8 w-full rounded-xl border-3',
          score >= target && 'opacity-35'
        )}
        style={{ height: `${height ?? 450}px` }}
      ></iframe>
    </>
  )
}

const levels: {
  [key: number]: {
    title: string
    x: number
    y: number
    component: (counter: number, onClose: () => void) => JSX.Element
    deps: number[]
  }
} = {
  0: {
    title: 'Start',
    x: 60,
    y: 50,
    deps: [],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Herzlich Willkommen bei der Tour durch die Highlights der 5. Klasse.
            Diese Tour wird entspannt, aber trotzdem (hoffentlich) nicht
            langweilig.
          </p>
          <p>
            Die 5. Klasse bietet einige abwechslungsreiche Themen. Gleichzeitig
            ist das eine gute Gelegenheit, deine Mathe-Skills etwas
            aufzufrischen.
          </p>
          <p>
            Die erste Aufgabe ist unten eingeblendet. Erreiche 40 Punkte, um die
            Aufgabe abzuschließen.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/geld/euro.php"
            height={420}
            target={40}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  1: {
    title: 'Umfang',
    x: 57,
    y: 130,
    deps: [0],
    component: (c, onClose) => {
      return (
        <>
          <p>
            In der 5. Klasse werden auch viele Themen aus der Grundschule
            wiederholt. Dazu gehören auch Begriffe aus der Geometrie, wie
            Rechteck oder Umfang.
          </p>
          <p>Zeige, dass von einem Rechteck den Umfang berechnen kannst.</p>
          <RealmathInjection
            url="/Neues/Klasse5/umfang/rechtecksumfang.php"
            height={500}
            target={50}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  2: {
    title: 'Quadratzahlen',
    x: 190,
    y: 35,
    deps: [0],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Hier findest du einen sanften Einstieg ins Kopfrechnen. Berechne die
            Quadratzahlen.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/basis/quadrat10a.php"
            height={500}
            target={30}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  3: {
    title: 'Zeit',
    x: 160,
    y: 130,
    deps: [0],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Um Zeiten umzurechnen, braucht es auf einmal so schräge Faktor wie
            24 oder 60. Doch das hält dich nicht davon ab, diese Aufgabe zu
            lösen.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/zeit/zeit.php"
            height={450}
            target={40}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  4: {
    title: 'KoSi',
    x: 45,
    y: 250,
    deps: [1],
    component: (c, onClose) => {
      return (
        <>
          <p>
            KoSi ist eine freundliche Abkürzung für das lange Wort
            &quot;Koordinatensystem&quot;. Dahinter verbirgt sich die schlichte
            Idee, Punkte mit Zahlen darzustellen.
          </p>
          <p>
            Wichtig zu merken: Starte mit der x-Achse. Mache dann mit der
            y-Achse weiter. Schreibe auch die Koordinaten in dieser Reihenfolge.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/geometrie/gittternetzlesen.php"
            height={500}
            target={60}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  5: {
    title: 'Winkel',
    x: 130,
    y: 230,
    deps: [1],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Verschiedene Winkel haben verschiedene Namen. Wähle den passenden
            Namen aus.
          </p>
          <RealmathInjection
            url="/Neues/Klasse6/winkel/winkelart02.php"
            height={500}
            target={60}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  6: {
    title: 'Einzeichnen',
    x: 70,
    y: 370,
    deps: [4],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Jetzt kommt die umgekehrte Aufgabe. Schiebe die Punkte an die
            richtige Stelle.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/geometrie/gittternetzzeichnen.php"
            height={500}
            target={45}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  7: {
    title: 'Fläche',
    x: 160,
    y: 420,
    deps: [4, 5],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Der Flächeninhalt des Rechtsecks hängt sehr eng mit der
            Multiplikation zusammen - auch sehr anschaulich.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/umfang/rechtecksflaeche.php"
            height={500}
            target={75}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  8: {
    title: 'Sektoren',
    x: 230,
    y: 340,
    deps: [5],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Ein Kreis hat immer 360°. In je mehr Sektoren man den Kreis teilt,
            umso kleiner werden die Winkel.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/winkel/winkelkreis.php"
            height={500}
            target={60}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  9: {
    title: 'Verschiebung',
    x: 65,
    y: 635,
    deps: [6],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Zeichne wieder Punkte ein. Orientiere dich diesmal an einen anderen
            Punkt.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/geometrie/gittternetzvar.php"
            height={470}
            target={60}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  10: {
    title: 'Quadrate zeichnen',
    x: 130,
    y: 550,
    deps: [6],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Quadrate haben einen engen Zusammenhang mit Quadratzahlen! Die
            Brücke ist der Flächeninhalt.
          </p>
          <p>
            Mache dich mit diesem Zusammenhang vertraut und zeichne passende
            Quadrate. Ein bisschen Um-die-Ecke-Denken ist gefragt!
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/umfang/quadratflaeche2.php"
            height={500}
            target={45}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  11: {
    title: 'Rechteck-Profi',
    x: 210,
    y: 620,
    deps: [7],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Du kannst Fläche und Umfang berechnen und kannst auch nicht mit den
            Begriffen durcheinander!
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/rechteck/rechteckuebung.php"
            height={500}
            target={70}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  12: {
    title: 'Kreuzung',
    x: 240,
    y: 490,
    deps: [7, 8],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Wenn sich zwei Geraden kreuzen, entstehen vier Winkel. Wenn du einen
            der Winkel kennst, kannst du alle anderen drei bereits ausrechnen.
          </p>
          <RealmathInjection
            url="/Neues/Klasse6/nebenwinkel/nebenwink00.php"
            height={500}
            target={60}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  13: {
    title: 'Winkelnamen',
    x: 330,
    y: 560,
    deps: [8],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Jedem Winkel kann mit drei Punkten ein Name gegeben werden. Starte
            mit dem ersten Schenkel, mache dann mit dem Scheitel weiter und
            schließe ab mit dem zweiten Schenkel gegen dem Uhrzeigersinn.
          </p>
          <RealmathInjection
            url="/Neues/Klasse6/winkel/winkelaufg1b.php"
            height={500}
            target={60}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  14: {
    title: 'Ordnung',
    x: 250,
    y: 270,
    deps: [3],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Wenn man viele Zahlen hat, kann eine Ordnung Wunder wirken um
            Übersicht reinzubringen.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/zahlenausn/zahlenordnen.php"
            height={500}
            target={240}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  15: {
    title: 'Römer',
    x: 340,
    y: 220,
    deps: [3],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Die römischen Zahlen nutzen ein ganz anderes System als unser
            Zahlensystem und zeigt, welche Vielfalt in der Mathematik möglich
            ist
          </p>
          <p>
            Aber es zeigt auch, dass sich die besten Systeme durchsetzen und
            weniger optimale Systeme aus dem Alltag verdrängt werden.
          </p>
          <p>
            Aber was die römischen Zahlen immer haben werden: ihren ganz
            besonderen Stil.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/dual/roemischmemory1.php"
            height={500}
            target={100}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  16: {
    title: 'Diagramm',
    x: 340,
    y: 420,
    deps: [14],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Mit einem guten Diagramm kannst du schnell wichtige Informationen
            darstellen - wie zum Beispiel das Ergebnis der Umfrage zum
            Wandertag.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/diagramm/balkendiagramm.php"
            height={470}
            target={80}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  17: {
    title: 'Runden',
    x: 480,
    y: 400,
    deps: [14, 15],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Manchmal sind zu viele Details auch nicht gut. Das Runden hilft,
            unsere Aufmerksamkeit auf die wesentlichen Dinge zu lenken.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/zahlenausn/zahlenrunden.php"
            height={500}
            target={50}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  18: {
    title: 'Große Zahlen',
    x: 520,
    y: 340,
    deps: [15],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Es wird immer Berührpunkte zwischen Mathematik und Sprache geben.
            Zahlen wollen in Worte geschrieben werden - und Worte wieder in
            Zahlen.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/zahlenausn/textinzahl01.php"
            height={440}
            target={60}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  19: {
    title: 'Längenmaße',
    x: 460,
    y: 620,
    deps: [16],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Dank des metrischen Systems muss man beim Umrechnen von
            Längeneinheiten nur das Komma an die richtige Stelle verschieben.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/laengen/laengen00.php"
            height={500}
            target={45}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  20: {
    title: 'Entfernungen',
    x: 620,
    y: 600,
    deps: [16],
    component: (c, onClose) => {
      return (
        <>
          <p>
            In der Tabelle siehst du alle Entfernungen zwischen den vier
            Städten. Zeige, dass du den richtigen Blick hast und die Tabelle
            auslesen kannst.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/laengen/entfernungen01.php"
            height={500}
            target={40}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  21: {
    title: 'Quersumme',
    x: 580,
    y: 500,
    deps: [17],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Die Ziffern einer Zahl du addieren, fühlt sich im ersten Moment
            etwas schräg an. Doch man kann daraus etwas ganz nützliches machen.
          </p>
          <p>Die Mathematik bietet manchmal kleine Überraschungen.</p>
          <RealmathInjection
            url="/Neues/Klasse5/teiler/teildurch3.php"
            height={500}
            target={80}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  22: {
    title: 'Zahlenstrahl',
    x: 730,
    y: 540,
    deps: [17, 18],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Das erste Mal wurde vor etwa 400 Jahren der Zahlenstrahl verwendet,
            um Zahlen darzustellen und mit ihnen zu rechnen.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/zahlenausn/zahlenanordnen.php"
            height={500}
            target={60}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  23: {
    title: 'Münzen',
    x: 730,
    y: 420,
    deps: [18],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Unsere Münzen sind so gewählt, dass man viele Beträge mit wenigen
            Münzen darstellen kann. Trotzdem gibt es beträgt, die man mit
            wenigen Münzen darstellen kann, und andere Beträge, die mehr Münzen
            brauchen.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/geld/eurobetrag.php"
            height={500}
            target={80}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  24: {
    title: 'Potenzen',
    x: 310,
    y: 140,
    deps: [2],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Potenz ist das lateinische Wort für Macht. Und wahrlich mächtig,
            wenn man eine Zahl wiederholt mit sich selbst multipliziert. Dabei
            entstehen schnell große Zahlen.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/basis/begriff.php"
            height={500}
            target={60}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  25: {
    title: 'Kopfrechnen',
    x: 340,
    y: 45,
    deps: [2],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Hier sind ein paar Aufgaben um deine grauen Zellen in Schwung zu
            bringen.
          </p>
          <p>Ein Schritt nach unten in der Tabelle erhöht die Zahl um 10.</p>
          <RealmathInjection
            url="/Neues/Klasse5/addieren/addimkopf.php"
            height={500}
            target={80}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  26: {
    title: 'Einmaleins',
    x: 520,
    y: 260,
    deps: [24],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Sobald du das kleine Einmaleins sicher beherrscht, kannst du mit der
            schriftlichen Rechnung mit beliebig großen Zahlen umgehen.{' '}
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/multiplizieren/memory1x1-a.php"
            height={500}
            target={100}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  27: {
    title: 'Zahlenstern',
    x: 510,
    y: 160,
    deps: [24, 25],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Es gibt verschiedene Möglichkeiten, vier Zahlen zu multiplizieren.
            Einige davon sind elegant und sparen dir Arbeit.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/addieren/sternaddnat.php"
            height={500}
            target={75}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  28: {
    title: 'Rechenbaum',
    x: 550,
    y: 35,
    deps: [25],
    component: (c, onClose) => {
      return (
        <>
          <p>
            In diesem Rechenbaum sind die Blätter die Zahlen und diese laufen
            zum Stamm zusammen.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/subtrahieren/rechenbaummult05.php"
            height={500}
            target={50}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  29: {
    title: 'Termometer',
    x: 720,
    y: 320,
    deps: [26],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Negative Zahlen begegnen dir schon früh bei Temperatur-Angaben.
            Nutze dieses intuitive Wissen, um das Thermometer abzulesen.
          </p>
          <RealmathInjection
            url="/Neues/Klasse6/gegenzahl/negativeinf3.php"
            height={500}
            target={75}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  30: {
    title: 'Pfeile',
    x: 660,
    y: 240,
    deps: [26, 27],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Zahlen und Rechenoperationen lassen sich mit Pfeilen darstellen.
            Hier kannst du das ausprobieren.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/addieren/additionspfeile00.php"
            height={500}
            target={90}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  31: {
    title: 'Zahlenpyramide',
    x: 710,
    y: 180,
    deps: [27],
    component: (c, onClose) => {
      return (
        <>
          <p>
            Ein bisschen Geduld ist gefragt! Fülle alle Felder der Pyramide aus.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/addieren/pyramide.php"
            height={500}
            target={105}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  32: {
    title: 'Division',
    x: 660,
    y: 110,
    deps: [28],
    component: (c, onClose) => {
      return (
        <>
          <p>
            In der 5. Klasse ist die Division stark eingegrenzt: Es kommen nur
            Rechnungen vor, die aufgehen. Wie auch bei diesen
            Kopfrechenaufgaben.
          </p>
          <RealmathInjection
            url="/Neues/Klasse5/multiplizieren/divimkopf.php"
            height={500}
            target={50}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
  33: {
    title: 'Profi-Baum',
    x: 730,
    y: 50,
    deps: [28],
    component: (c, onClose) => {
      return (
        <>
          <p>Und zeige jetzt, dass du auch rückwärts denken kannst.</p>
          <RealmathInjection
            url="/Neues/Klasse5/subtrahieren/rechenbaummult5.php"
            height={500}
            target={75}
            onClose={onClose}
            key={c}
          />
        </>
      )
    },
  },
}
