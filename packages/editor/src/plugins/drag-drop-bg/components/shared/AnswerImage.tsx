interface AnswerImageProps {
  url?: string
  height?: number
  width?: number
  isPreview?: boolean
}

export function AnswerImage({ url, isPreview }: AnswerImageProps) {
  if (!url) return null

  const commonStyles: React.CSSProperties = {
    objectFit: 'contain',
  }

  return (
    <img
      src={url}
      style={
        isPreview
          ? { height: '70px', border: '2px solid lightblue', ...commonStyles }
          : { height: '100%', width: '100%', ...commonStyles }
      }
    />
  )
}
