import { NumberInputExercise } from '../number-input-exercise/number-input-exercise'
import { ActualRangeInput } from '../number-line-exercise/actual-range-input'
import { NumberLabels } from '../number-line-exercise/number-labels'
import { RangeInputOverlay } from '../number-line-exercise/range-input-overlay'

interface NumberLineInputExerciseProps {
  generator: () => [number, number, number]
}

// input supports ~ up to 7 digits without clipping

export function NumberLineInputExercise({
  generator,
}: NumberLineInputExerciseProps) {
  return (
    <NumberInputExercise
      generator={generator}
      getCorrectValue={(data) => data[0]}
      render={(input, data) => (
        <>
          <div
            className="relative -left-2 -mr-2 mb-6 ml-2 mt-12 [overscroll-behaviour-x:none]"
            id="number-line-wrapper"
          >
            <ActualRangeInput
              selectedValue={data[0]}
              setSelectedValue={() => {}}
              maxValue={data[2]}
              searchedValue={data[0]}
              disabled
            />
            <NumberLabels
              maxValue={data[2]}
              labeledValue={data[1] * data[2]}
              isChecked={false}
            />
            <div className="pointer-events-none absolute top-6 w-full px-4">
              <RangeInputOverlay
                maxValue={data[2]}
                selectedValue={data[0]}
                searchedValue={data[0]}
                isChecked
                isCorrect={false}
              />
            </div>
          </div>
          <div className="ml-0.5 text-xl font-bold" id="number-input">
            <span className="mr-3">Die gesuchte Zahl lautet: {input}</span>
          </div>
        </>
      )}
    />
  )
}
