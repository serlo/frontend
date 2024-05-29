import React from 'react'

interface AnswerContentProps {
  url?: string
  text?: string
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
  ) : (
    <div
      className="h-100 w-100 flex items-center justify-center"
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <span>{text}</span>
    </div>
  )
}
