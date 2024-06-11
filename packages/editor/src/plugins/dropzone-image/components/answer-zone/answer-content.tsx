import { StaticSlate } from '@editor/plugins/text/static-components/static-slate'
import React from 'react'
import { Descendant } from 'slate'

import { cn } from '@/helper/cn'

interface AnswerContentProps {
  url?: string
  text?: Descendant[]
  isPreview?: boolean
  className?: string
  // TODO: This prop is a temporary solution for text border visual bug
  display?: 'inline' | 'block'
}

export const AnswerContent = ({
  url,
  text,
  className,
  isPreview = false,
  display = 'inline',
}: AnswerContentProps) => {
  if (!url && !text) return null

  return url ? (
    <img
      data-qa="plugin-dropzone-image-answer-content-image"
      src={url}
      className={cn(
        className,
        isPreview
          ? 'border-lightblue h-16 border-2 object-contain'
          : 'h-full w-full object-contain'
      )}
    />
  ) : text ? (
    <span
      data-qa="plugin-dropzone-image-answer-content-text"
      className={`mx-0 rounded-full border border-brand px-2 ${className}`}
      style={{ display }}
    >
      <StaticSlate element={text} />
    </span>
  ) : null
}
