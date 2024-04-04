import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildVec, buildVec2 } from '../utils/math-builder'

// Flexibilisierungen

// - Austausch von T und R (also abhängiger Punkt)
// - sin/cos, Quadrat machen, Zahlen
// VariablenameSätze ABC, RST, PQR, EFG

// Frage: Wie gehe ich mit Positionierungen um? Negative Zahlen? Auch nicht so wichtig
export function Parallelogram3() {
  const phi = <span className="font-mono">ϕ</span>
  return (
    <SelfEvaluationExercise
      generator={() => null}
      renderTask={() => (
        <>
          <p className="serlo-main-task">
            Seien die Pfeile {buildVec('OT')} = {buildVec2(-2, 4)} und{' '}
            {buildVec(
              <>
                OR<sub>n</sub>
              </>
            )}{' '}
            ={' '}
            {buildVec2(
              <>5 + 5 · sin {phi}</>,
              <>
                6 · cos<sup>2</sup> {phi}
              </>
            )}{' '}
            gegeben.
          </p>
          <p className="serlo-main-task">
            Diese spannen mit dem Ursprung O ( 0 | 0 ) für {phi} ∈ [0°; 90°]
            Parallelogramme OR<sub>n</sub>S<sub>n</sub>T auf.
          </p>
          <p className="serlo-main-task">
            Weisen Sie durch Rechnung nach, dass sich die Koordinaten der Punkte
            S<sub>n</sub> in Abhängigkeit von {phi} wie folgt darstellen lassen:
          </p>
          <p className="serlo-highlight-gray">
            S<sub>n</sub> ( 3 + 5 · sin {phi} | 6 · cos<sup>2</sup>
            {phi} + 4)
          </p>
        </>
      )}
      renderSolution={() => (
        <>
          <p>
            Die Punkte S<sub>n</sub> lassen sich durch eine Vektoraddition
            darstellen. Nutze{' '}
            {buildVec(
              <>
                R<sub>n</sub>S<sub>n</sub>
              </>
            )}{' '}
            = {buildVec(<>OT</>)}. Das ist möglich, weil im Parallelogramm
            gegenüberliegende Seiten parallel und gleich lang sind:
          </p>
          <p className="serlo-highlight-gray">
            {buildVec(
              <>
                OS<sub>n</sub>
              </>
            )}{' '}
            ={' '}
            {buildVec(
              <>
                OR<sub>n</sub>
              </>
            )}{' '}
            ⊕{' '}
            {buildVec(
              <>
                R<sub>n</sub>S<sub>n</sub>
              </>
            )}{' '}
            ={' '}
            {buildVec(
              <>
                OR<sub>n</sub>
              </>
            )}{' '}
            ⊕ {buildVec(<>OT</>)}
          </p>
          <p>Setze die passenen Terme ein und berechne:</p>
          <p className="serlo-highlight-gray">
            {buildVec(
              <>
                OS<sub>n</sub>
              </>
            )}{' '}
            ={' '}
            {buildVec2(
              <>5 + 5 · sin {phi}</>,
              <>
                6 · cos<sup>2</sup> {phi}
              </>
            )}{' '}
            ⊕ {buildVec2(-2, 4)} ={' '}
            {buildVec2(
              <>3 + 5 · sin {phi}</>,
              <>
                6 · cos<sup>2</sup>
                {phi} + 4
              </>
            )}
          </p>
          <p>Schreibe den Ortsvektor schließlich in Koordinaten:</p>
          <p className="serlo-highlight-green">
            S<sub>n</sub> ( 3 + 5 · sin {phi} | 6 · cos<sup>2</sup>
            {phi} + 4)
          </p>
        </>
      )}
      centAmount={35}
    />
  )
}
