import { MultimediaSizeSelectButton } from './size-select-button'
import type { MultimediaProps } from '..'

interface MultimediaSizeSelectProps {
  state: MultimediaProps['state']['width']
  title: string
}

const mediaColumsSizes = [50, 25]

export const MultimediaSizeSelect = ({
  state,
  title,
}: MultimediaSizeSelectProps) => (
  <div className="mt-8">
    <b className="mb-4 ml-0 mt-6 block text-lg font-bold">{title}</b>
    <ul className="flex pb-8" role="listbox">
      {mediaColumsSizes.map((percent: number) => (
        <li key={percent}>
          <MultimediaSizeSelectButton state={state} percent={percent} />
        </li>
      ))}
    </ul>
  </div>
)
