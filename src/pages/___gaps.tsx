import clsx from 'clsx'

import { ExerciseNumbering } from '@/components/content/exercises/exercise-numbering'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Content />
  </FrontendClientBase>
))

function Content() {
  return (
    <>
      <h1 className="serlo-h1 mt-16 mb-20">Lückentext</h1>
      <ExerciseNumbering index={0} href="" />
      <div className="">
        <p className="serlo-p mb-block">Ergänze folgende Lücke:</p>
        <p className="serlo-p mb-block">
          Im Jahr 2007 wurde die Umsatzsteuer von 16% auf 19% erhöht. Die Steuer
          stieg also um 3{' '}
          <span className="w-20 border-black border rounded bg-brand-100 inline-block h-6 mx-1 -mb-0.5 cursor-pointer"></span>
          .
        </p>
        <p className="serlo-p mb-block">
          <span className="border-black border rounded bg-brand-100 inline-block h-6 mx-1 -mb-0.5 px-2">
            Prozentpunkte
          </span>
          <span className="border-black border rounded bg-brand-100 inline-block h-6 mx-1 -mb-0.5 px-2">
            Prozent
          </span>
        </p>
        <button
          className={clsx(
            'serlo-button serlo-make-interactive-primary',
            'mt-4 mx-side',
            false &&
              'opacity-100 bg-transparent text-gray-400 pointer-events-none'
          )}
          onPointerUp={(e) => e.currentTarget.blur()}
        >
          Stimmt&apos;s?
        </button>
      </div>
    </>
  )
}
