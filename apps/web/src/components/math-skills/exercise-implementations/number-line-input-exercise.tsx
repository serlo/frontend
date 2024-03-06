import { NumberInputExercise } from '../number-input-exercise/number-input-exercise'
import { ActualRangeInput } from '../number-line-exercise/actual-range-input'
import { NumberLabels } from '../number-line-exercise/number-labels'
import { RangeInputOverlay } from '../number-line-exercise/range-input-overlay'

interface NumberLineInputExerciseProps {
  generator: () => [number, number, number]
  centAmount?: number
}

// input supports ~ up to 7 digits without clipping

export function NumberLineInputExercise({
  generator,
  centAmount,
}: NumberLineInputExerciseProps) {
  return (
    <NumberInputExercise
      centAmount={centAmount}
      generator={generator}
      getCorrectValue={(data) => data[0]}
      render={(input, data) => (
        <>
          <div
            className="relative mb-6 mt-12 touch-pinch-zoom"
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
                exStatus="fresh" //deactivates user input
                useQuestionIcon
              />
            </div>
          </div>
          <div className="text-xl" id="number-input">
            Die gesuchte Zahl lautet:&nbsp; <b>{input}</b>
          </div>
        </>
      )}
    />
  )
}
