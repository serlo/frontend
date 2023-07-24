import clsx from 'clsx'

import { MultimediaProps } from '..'
import { tw } from '@/helper/tw'

interface Props {
  state: MultimediaProps['state']['width']
  percent: number
}

const childClassName =
  'm-1 bg-editor-primary-200 group-hover:bg-editor-primary group-focus:bg-editor-primary rounded-sm h-20'

export const SizeSelectButton = ({ state, percent }: Props) => (
  <button
    onClick={(event) => {
      event.preventDefault()
      state.set(percent)
    }}
    className={clsx(
      tw`
        group mr-2 flex h-24 w-24 flex-row rounded-lg bg-editor-primary-100 p-1
        opacity-75 hover:bg-editor-primary-200 focus:bg-editor-primary-200
      `,
      percent === state.value && 'bg-editor-primary-300'
    )}
  >
    <div className={childClassName} style={{ width: `${100 - percent}%` }}>
      &nbsp;
    </div>
    <div className={childClassName} style={{ width: `${percent}%` }}>
      &nbsp;
    </div>
  </button>
)
