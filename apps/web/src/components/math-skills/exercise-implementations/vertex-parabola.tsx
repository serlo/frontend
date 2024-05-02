import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { MainTask, HighlightGreen } from '../components/content-components'
import { buildFrac } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

export function VertexParabola() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          b: randomIntBetween(1, 4) * 2,
          c: randomIntBetween(2, 9),
          isPlus: randomItemFromArray([true, false]),
          isPlus_2: randomItemFromArray([true, false]),
        }
      }}
      renderTask={({ b, isPlus, isPlus_2, c }) => {
        return (
          <>
            <MainTask>Bestimmen Sie die Scheitelform der Parabel:</MainTask>
            <HighlightGreen>
              y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x {isPlus_2 ? '+' : '-'}{' '}
              {c}
            </HighlightGreen>
          </>
        )
      }}
      renderSolution={({ b, isPlus, isPlus_2, c }) => {
        const plusminusTerm = (b / 2) * (b / 2)
        const cAlsZahl = c * (isPlus_2 ? 1 : -1)
        const bAlsZahl = b * (isPlus ? 1 : -1)
        const d = cAlsZahl - plusminusTerm

        const dAlsJsx = (
          <>
            {d > 0 ? '+' : '-'} {Math.abs(d)}
          </>
        )

        return (
          <>
            <p>Für den Scheitelpunkt gilt diese Formel:</p>
            <p className="serlo-highlight-gray">
              S <span className="inline-block scale-y-[2.5]">(</span>{' '}
              {buildFrac(<>-b</>, <>2a</>)}{' '}
              <span className="inline-block scale-y-[2.5]">|</span> c -{' '}
              {buildFrac(<>b²</>, <>4a</>)}{' '}
              <span className="inline-block scale-y-[2.5]">)</span>
            </p>
            <p>
              Setze a = 1, b = {b} und c = {c} ein:
            </p>{' '}
            <p className="serlo-highlight-gray">
              S <span className="inline-block scale-y-[2.5]">(</span>{' '}
              {buildFrac(
                <>-{bAlsZahl > 0 ? bAlsZahl : <>({bAlsZahl})</>}</>,
                <>2</>
              )}{' '}
              <span className="inline-block scale-y-[2.5]">|</span> {cAlsZahl} -{' '}
              {buildFrac(
                <>{bAlsZahl > 0 ? bAlsZahl : <>({bAlsZahl})</>}²</>,
                <>4</>
              )}{' '}
              <span className="inline-block scale-y-[2.5]">)</span> = S ({' '}
              {pp(-bAlsZahl / 2)} | {dAlsJsx})
            </p>
            <p>
              Damit lautet die Scheitelform{' '}
              <span className="text-xl">
                y = a · (x - x<sub>s</sub>)² + y<sub>s</sub>
              </span>{' '}
              für diese Parabel:
            </p>
            <HighlightGreen>
              y = <span className="inline-block scale-y-[1.5]">(</span>x{' '}
              {isPlus ? '+' : '-'} {pp(b / 2)}
              <span className="inline-block scale-y-[1.5]">)</span>
              <sup>2</sup> {dAlsJsx}
            </HighlightGreen>
          </>
        )
      }}
    />
  )
}
