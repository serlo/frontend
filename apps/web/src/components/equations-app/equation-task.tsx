import { LinearEquationTask } from '@/data/de/gleichungs-app'
import { cn } from '@/helper/cn'

interface EquationTaskProps {
  data: LinearEquationTask
}

export function EquationTask({ data }: EquationTaskProps) {
  return (
    <div>
      <h2 className={cn('mt-6 text-xl')}>
        <span
          className={cn(
            data.isGolden && 'rounded bg-yellow-400 px-2 py-1 font-bold'
          )}
        >
          Aufgabe {data.number}
        </span>
      </h2>
      <div className="mt-4">
        Löse die Gleichung und bestimme die Lösungsmenge.
      </div>
    </div>
  )
}
