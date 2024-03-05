import { NumberInputExercise } from '../../number-input-exercise/number-input-exercise'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function createTextToNumberExercise(expert: boolean) {
  return {
    title: 'Text in Zahl umwandeln',
    level: expert ? 'Profi' : 'Level 1',
    component: (
      <NumberInputExercise
        centAmount={35}
        widthForDigits={15}
        generator={() => textToNumberGenerator(expert)}
        getCorrectValue={({ value }) => {
          return value
        }}
        render={(input, { text }) => {
          return (
            <>
              <h2 className="mt-8 pb-4 text-left text-2xl text-almost-black">
                Schreibe als Zahl:
                <br />
                {/* Text is sometimes to long and will break here anyways. This prevents some jumping arounds.*/}
                <span className="inline-block font-bold text-newgreen">
                  {text}
                </span>
              </h2>
              <div id="number-input">{input}</div>
            </>
          )
        }}
      />
    ),
  }
}

function textToNumberGenerator(expert: boolean) {
  const mode = randomItemFromArray([
    'MTE',
    'ME',
    'MT',
    ...(expert
      ? ['AMT', 'ATE', 'AME', 'AM', 'AT', 'AE']
      : ['TE', 'TE', 'ME', 'MT', 'M', 'T']),
  ])
  let text = ''
  let value = 0
  if (mode.includes('A')) {
    const val = randomIntBetween(2, 29)
    value += val * 1000000000
    text += `${val} Milliarden `
  }
  if (mode.includes('M')) {
    const val = randomIntBetween(2, expert ? 999 : 29)
    value += val * 1000000
    text += `${val} Millionen `
  }
  if (mode.includes('T')) {
    const val = randomIntBetween(2, 999)
    value += val * 1000
    text += `${val} Tausend `
  }
  if (mode.includes('E')) {
    const val = randomIntBetween(2, 999)
    value += val
    text += `${val} `
  }
  return { text, value }
}
