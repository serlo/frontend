import { StaticSlate } from '@editor/plugins/text/static-components/static-slate'
import React from 'react'
import { Descendant, Node } from 'slate'

import { isSmallScreen } from '../../utils/is-small-screen'
import { cn } from '@/helper/cn'

interface AnswerContentProps {
  url?: string
  text?: Descendant[] | string
  className?: string
}

export function AnswerContent(props: AnswerContentProps) {
  const { url, text, className } = props

  if (url) {
    return (
      <img
        data-qa="plugin-dropzone-image-answer-content-image"
        src={url}
        className={cn('h-full w-full object-contain', className)}
      />
    )
  }

  if (text) {
    const textString =
      typeof text === 'string'
        ? text
        : text.map((node) => Node.string(node)).join('\n')

    const content = isSmallScreen() ? (
      textString
    ) : typeof text === 'string' ? (
      textString
    ) : (
      <StaticSlate element={text} />
    )

    const classNames = cn(
      'block rounded-full border border-brand',
      isSmallScreen() ? 'object-contain px-1 text-xs' : 'mx-0 px-2',
      className
    )

    return (
      <span
        data-qa="plugin-dropzone-image-answer-content-text"
        className={classNames}
      >
        {content}
      </span>
    )
  }

  return null
}
