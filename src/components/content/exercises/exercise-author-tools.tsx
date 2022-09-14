import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup'
import { faTools } from '@fortawesome/free-solid-svg-icons/faTools'
import Tippy from '@tippyjs/react'
import clsx from 'clsx'

import {
  AuthorToolsData,
  AuthorToolsHoverMenu,
} from '../../user-tools/more-author-tools/author-tools-hover-menu'
import { FaIcon } from '@/components/fa-icon'
import { ExerciseInlineType } from '@/data-types'

export interface ExerciseAuthorToolsProps {
  data: AuthorToolsData & {
    type: ExerciseInlineType
  }
}

export function ExerciseAuthorTools({ data }: ExerciseAuthorToolsProps) {
  return (
    <Tippy
      interactive
      placement="bottom-end"
      delay={[0, 300]}
      interactiveBorder={40}
      trigger="click mouseenter"
      content={<AuthorToolsHoverMenu data={data} />}
    >
      <a
        className={clsx(
          'hidden sm:inline-block serlo-button text-center text-truegray-800',
          'hover:bg-brand hover:text-white text-base leading-8',
          'w-8 h-8 ml-1 p-0'
        )}
      >
        <FaIcon
          icon={
            data.type == ExerciseInlineType.ExerciseGroup
              ? faLayerGroup
              : faTools
          }
        />
      </a>
    </Tippy>
  )
}
