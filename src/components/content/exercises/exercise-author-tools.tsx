import { faTools } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import clsx from 'clsx'

import {
  AuthorToolsData,
  AuthorToolsHoverMenu,
} from '../../user-tools/author-tools-hover-menu'

export interface ExerciseAuthorToolsProps {
  data: AuthorToolsData
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
          'hidden sm:inline serlo-button text-center text-truegray-800',
          'hover:bg-brand hover:text-white text-base leading-8',
          'w-8 h-8 ml-1 p-0'
        )}
      >
        <FontAwesomeIcon icon={faTools} />
      </a>
    </Tippy>
  )
}
