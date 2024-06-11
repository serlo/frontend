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
    return (
      <span
        data-qa="plugin-dropzone-image-answer-content-text"
        className={cn(
          'mx-0 block rounded-full border border-brand px-2',
          className
        )}
      >
        <StaticSlate element={text} />
      </span>
    )
  }

  return null
}
