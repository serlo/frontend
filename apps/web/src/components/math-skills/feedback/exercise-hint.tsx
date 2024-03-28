import { useState } from 'react'

import { LandingAnimal } from '../landing-animal'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { cn } from '@/helper/cn'

interface ExerciseHintProps<DATA> {
  data: DATA
  renderHint: (data: DATA) => JSX.Element
}

export function ExerciseHint<T>({ data, renderHint }: ExerciseHintProps<T>) {
  const [showHint, setShowHint] = useState(false)

  return (
    <>
      <a
        className="group fixed bottom-28 right-0 z-50 hidden cursor-pointer outline-none sm:block"
        tabIndex={0}
        onClick={() => setShowHint(!showHint)}
      >
        <span className="bg-opacity-15 -mr-12 block aspect-square w-24 rounded-full bg-animal text-right text-lg group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-brand">
          <span className="-ml-8 block rotate-90 pr-1.5">Tipps</span>
        </span>
        <div
          className={cn(
            'absolute -right-48 -top-24 z-50 h-48 w-48 opacity-0',
            'origin-bottom-left -rotate-[15deg] transition-all ease-out [transition-duration:0.4s]',
            'opacity-0 transition-all group-hover:-right-48 group-hover:-rotate-[45deg] group-hover:opacity-100',
            'group-focus-visible:-right-48 group-focus-visible:-rotate-[45deg] group-focus-visible:opacity-100',
            showHint && '-right-48 -rotate-[45deg] opacity-100'
          )}
        >
          <p className="absolute z-[51] -mr-4 -mt-10 text-center font-handwritten text-xl">
            Einfach einmal Klicken <br /> für einen Tipp :)
          </p>
          <LandingAnimal noChangeButton />
        </div>
      </a>
      <button
        className="serlo-button-light mb-6 block sm:hidden"
        onClick={() => setShowHint(!showHint)}
      >
        Tipps
      </button>
      <ModalWithCloseButton
        isOpen={showHint}
        onCloseClick={() => setShowHint(false)}
      >
        <div className="mt-2 p-side">{renderHint(data)}</div>
      </ModalWithCloseButton>{' '}
    </>
  )
}
