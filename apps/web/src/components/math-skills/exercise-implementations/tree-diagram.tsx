import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac, buildOverline } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

const deutscheFlughäfen = [
  'Albrecht Dürer Airport Nürnberg',
  'Berlin-Tegel "Otto Lilienthal"',
  'Berlin-Schönefeld',
  'Flughafen Düsseldorf "Heinrich Heine"',
  'Flughafen Frankfurt am Main',
  'Flughafen München "Franz Josef Strauß"',
  'Flughafen Hamburg "Helmut Schmidt"',
  'Flughafen Köln/Bonn "Konrad Adenauer"',
  'Flughafen Stuttgart "Manfred Rommel"',
  'Flughafen Hannover "Langenhagen"',
  'Flughafen Leipzig/Halle',
  'Flughafen Bremen "Hans Koschnick"',
  'Flughafen Dortmund',
  'Flughafen Dresden "Klotzsche"',
  'Flughafen Memmingen "Allgäu"',
  'Flughafen Karlsruhe/Baden-Baden "Söllingen"',
  'Flughafen Friedrichshafen',
  'Flughafen Erfurt-Weimar',
  'Flughafen Münster/Osnabrück',
  'Flughafen Paderborn/Lippstadt "Haxterberg"',
]

export function TreeDiagram() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const name = randomItemFromArray(deutscheFlughäfen)
        const pass = randomIntBetween(3, 15)
        const zoll = randomIntBetween(3, 15)
        return { name, pass, zoll }
      }}
      renderTask={(data) => (
        <>
          <p className="serlo-main-task">
            Auf dem {data.name} werden bei Reisen innerhalb des Schengenraumes
            stichprobenartig Pass- und Zollkontrollen unabhängig voneinander
            durchgeführt.
          </p>
          {data.pass === data.zoll ? (
            <p className="serlo-main-task">
              Pass- und Zollkontrollen finden bei durchschnittlich jeder{' '}
              {data.pass}. Person statt.
            </p>
          ) : (
            <p className="serlo-main-task">
              Passkontrollen finden bei durchschnittlich jeder {data.pass}.
              Person statt und Zollkontrollen bei jeder {data.zoll}. Person.
            </p>
          )}
          <p className="serlo-main-task">
            Zeichnen Sie ein Baumdiagramm für diesen Sachverhalt, in dem die
            Wahrscheinlichkeiten ersichtlich sind.
          </p>
        </>
      )}
      renderSolution={(data) => (
        <>
          <p>P: Passkontrolle, {buildOverline('P')}: keine Passkontrolle</p>
          <p>Z: Zollkontrolle, {buildOverline('Z')}: keine Zollkontrolle</p>
          <div className="relative h-[400px] w-[400px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 400"
              className="absolute inset-0"
            >
              <line
                x1={20}
                y1={200}
                x2={100}
                y2={100}
                strokeWidth="2"
                stroke="black"
              />
              <line
                x1={20}
                y1={200}
                x2={100}
                y2={300}
                strokeWidth="2"
                stroke="black"
              />
              <line
                x1={130}
                y1={100}
                x2={260}
                y2={50}
                strokeWidth="2"
                stroke="black"
              />
              <line
                x1={130}
                y1={100}
                x2={260}
                y2={150}
                strokeWidth="2"
                stroke="black"
              />
              <line
                x1={130}
                y1={300}
                x2={260}
                y2={250}
                strokeWidth="2"
                stroke="black"
              />
              <line
                x1={130}
                y1={300}
                x2={260}
                y2={350}
                strokeWidth="2"
                stroke="black"
              />
            </svg>
            <span className="absolute text-2xl" style={{ left: 110, top: 80 }}>
              P
            </span>
            <span className="absolute text-2xl" style={{ left: 110, top: 290 }}>
              {buildOverline('P')}
            </span>
            <span className="absolute text-2xl" style={{ left: 270, top: 30 }}>
              Z
            </span>
            <span className="absolute text-2xl" style={{ left: 270, top: 140 }}>
              {buildOverline('Z')}
            </span>{' '}
            <span className="absolute text-2xl" style={{ left: 270, top: 230 }}>
              Z
            </span>
            <span className="absolute text-xl" style={{ left: 270, top: 340 }}>
              {buildOverline('Z')}
            </span>
            <span className="absolute text-xl" style={{ left: 40, top: 70 }}>
              {buildFrac(1, data.pass)}
            </span>
            <span className="absolute text-xl" style={{ left: 40, top: 260 }}>
              {buildFrac(data.pass - 1, data.pass)}
            </span>
            <span className="absolute text-xl" style={{ left: 180, top: 10 }}>
              {buildFrac(1, data.zoll)}
            </span>
            <span className="absolute text-xl" style={{ left: 180, top: 130 }}>
              {buildFrac(data.zoll - 1, data.zoll)}
            </span>
            <span className="absolute text-xl" style={{ left: 180, top: 210 }}>
              {buildFrac(1, data.zoll)}
            </span>
            <span className="absolute text-xl" style={{ left: 180, top: 330 }}>
              {buildFrac(data.zoll - 1, data.zoll)}
            </span>
          </div>
        </>
      )}
    />
  )
}
