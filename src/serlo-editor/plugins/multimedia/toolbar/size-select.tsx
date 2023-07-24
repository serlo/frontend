import { SizeSelectButton } from './size-select-button'
import { MultimediaProps } from '..'

interface Props {
  state: MultimediaProps['state']['width']
  title: string
}

const mediaColumsSizes = [50, 25]

export const SizeSelect = ({ state, title }: Props) => (
  <div className="mt-8">
    <b className="mb-4 ml-0 mt-6 block text-lg font-bold">{title}</b>
    <ul className="flex pb-8">
      {mediaColumsSizes.map((percent: number) => (
        <li key={percent}>
          <SizeSelectButton state={state} percent={percent} />
        </li>
      ))}
    </ul>
  </div>
)
