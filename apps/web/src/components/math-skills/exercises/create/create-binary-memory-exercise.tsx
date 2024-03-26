import { MemoryGame } from '../../exercise-implementations/memory/memory-game'
import { shuffleArray } from '@/helper/shuffle-array'

export function createBinaryMemoryExercise(
  level: string,
  from: number,
  to: number
) {
  return {
    title: 'Dualzahlen Memory',
    level,
    component: (
      <MemoryGame
        centAmount={145}
        checkPair={(v0: number | string, v1: number | string) => {
          return (
            (Number.isInteger(v0) ? (v0 as number).toString(2) : v0) ===
            (Number.isInteger(v1) ? (v1 as number).toString(2) : v1)
          )
        }}
        render={(title: string | number) => {
          if (typeof title === 'string') {
            // binary
            return <span className="font-mono text-red-800">{title}</span>
          }
          return <>{title}</>
        }}
        generator={() => {
          const candidates = []
          for (let i = from; i <= to; i++) {
            candidates.push(i)
          }

          const arabic = shuffleArray(candidates).slice(0, 8)
          const binary = arabic.map((val) => val.toString(2))
          const values = shuffleArray([...arabic, ...binary])
          return { values }
        }}
      />
    ),
    smallprint: (
      <>
        Binärzahlen sind in rot dargestellt, Dezimalzahlen in schwarz. Die
        Zahlen gehen von {from} bis {to}.
      </>
    ),
  }
}
