import { useEffect, useState } from 'react'

import { MemoryCard } from './memory-card'
import { ExerciseFeedback } from '../../feedback/execise-feedback'
import { cn } from '@/helper/cn'

interface MemoryGameProps {
  generator: () => { values: (number | string)[] }
  checkPair: (v0: number | string, v1: number | string) => boolean
  centAmount?: number
}

/* supports from 4 to 16 cards for now and only strings or numbers on the cards */
export function MemoryGame({
  generator,
  checkPair,
  centAmount,
}: MemoryGameProps) {
  const [data, setData] = useState(generator())
  const [isChecked, setIsChecked] = useState(false)
  const { values } = data
  const [triesAmount, setTruesAmount] = useState<number>(0)
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [[card0, card1], setOpenCards] = useState<
    [number | null, number | null]
  >([null, null])

  const bothCardsOpen = card0 !== null && card1 !== null

  function makeNewExercise() {
    setData(generator())
    setIsChecked(false)
    setOpenCards([null, null])
    setTruesAmount(0)
    setMatchedCards([])
  }

  useEffect(() => {
    const keyEventHandler = (e: KeyboardEvent) => {
      const down = e.key === 'ArrowDown'
      const up = e.key === 'ArrowUp'
      const left = e.key === 'ArrowLeft'
      const right = e.key === 'ArrowRight'

      if (up || down || left || right) {
        e.preventDefault()
        const cards = [
          ...document.querySelectorAll('#memory-game-cards button.memory-card'),
        ] as HTMLButtonElement[]

        const activeElement = document.activeElement as HTMLButtonElement

        if (!activeElement || !cards.includes(activeElement)) {
          cards[0]?.focus()
          return
        }
        const rowStep = cards.length <= 9 ? 3 : 4

        const delta = right ? 1 : left ? -1 : up ? -rowStep : rowStep

        const currentIndex = cards.findIndex((card) => card === activeElement)
        const checkIndex = currentIndex + delta

        const mod = checkIndex % rowStep
        if ((right && mod === 0) || (left && mod === rowStep - 1)) return

        const outOfBounds = checkIndex >= cards.length || checkIndex < 0
        if (outOfBounds) return
        cards[checkIndex]?.focus()
      }
    }

    document.addEventListener('keydown', keyEventHandler)
    return () => document.removeEventListener('keydown', keyEventHandler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked, values])

  function onCardSelect(index: number) {
    if (bothCardsOpen) return
    if (index === card0) return
    if (matchedCards.includes(index)) return

    if (card0 === null) {
      setOpenCards([index, null])
      return
    }

    const isMatch = checkPair(values[card0], values[index])
    setOpenCards([card0, index])

    if (isMatch) {
      setTimeout(() => {
        setOpenCards([null, null])
        setMatchedCards([...matchedCards, card0, index])
        setTruesAmount(triesAmount + 1)

        if (values.length === matchedCards.length + 2) {
          setIsChecked(true)
        }
      }, 400)
    } else {
      setTimeout(() => {
        setOpenCards([null, null])
        setTruesAmount(triesAmount + 1)
      }, 1300)
    }
  }

  const useSmallField = values.length <= 9

  return (
    <>
      <div id="memory-game-wrapper" className="">
        <h2 className="pb-8 text-left text-2xl font-bold text-almost-black">
          Finde die gleichen Werte:
        </h2>
        <nav
          className={cn(
            'grid max-w-[350px] gap-2 text-center text-3xl font-bold',
            useSmallField ? 'grid-cols-3' : 'grid-cols-4'
          )}
          id="memory-game-cards"
        >
          {values.map((title, index) => (
            <MemoryCard
              key={index}
              flipped={card0 === index || card1 === index}
              title={title}
              index={index}
              isMatched={matchedCards.includes(index)}
              onCardSelect={onCardSelect}
            />
          ))}
        </nav>
      </div>

      <ExerciseFeedback
        noUserInput={!isChecked}
        noUserInputText={triesAmount ? <>{triesAmount} Züge</> : undefined}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        isCorrect
        makeNewExercise={makeNewExercise}
        centAmount={centAmount}
        forceCheck={isChecked}
      />
    </>
  )
}

// origin-center
