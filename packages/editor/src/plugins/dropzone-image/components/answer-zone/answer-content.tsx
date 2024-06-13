import { StaticSlate } from '@editor/plugins/text/static-components/static-slate'
import React from 'react'
import { Descendant } from 'slate'

import { cn } from '@/helper/cn'

interface AnswerContentProps {
  url?: string
  text?: Descendant[]
  className?: string
}

export function AnswerContent(props: AnswerContentProps) {
  const { url, text, className } = props
  const isSmallScreen = () => window.innerWidth < 1024

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const el = text[0] as any
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const content = isSmallScreen() ? (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      el?.children?.[0]?.text
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
