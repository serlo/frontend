interface AnswerImageProps {
  url?: string
  height?: number
  width?: number
  isPreview?: boolean
}

export function AnswerImage({ url, isPreview }: AnswerImageProps) {
  if (!url) return null

  return (
    <img
      src={url}
      className={
        isPreview
          ? 'border-lightblue h-16 border-2 object-contain'
          : 'h-full w-full object-contain'
      }
    />
  )
}
