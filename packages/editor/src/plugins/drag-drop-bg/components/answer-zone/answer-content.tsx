import { StaticSlate } from '@editor/plugins/text/static-components/static-slate'
import React from 'react'
import { Descendant } from 'slate'

interface AnswerContentProps {
  url?: string
  text?: Descendant[]
  isPreview?: boolean
}

export const AnswerContent = ({
  url,
  text,
  isPreview = false,
}: AnswerContentProps) => {
  if (!url && !text) return null

  return url ? (
    <img
      src={url}
      className={
        isPreview
          ? 'border-lightblue h-16 border-2 object-contain'
          : 'h-full w-full object-contain'
      }
    />
  ) : text ? (
    <StaticSlate element={text} />
  ) : null
}
