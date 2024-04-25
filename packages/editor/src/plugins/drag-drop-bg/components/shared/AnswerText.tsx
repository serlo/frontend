interface AnswerTextProps {
  text?: string
  height?: number
  width?: number
}

export function AnswerText(props: AnswerTextProps) {
  const { text, height, width } = props
  if (!text) return null

  return (
    <div
      style={{
        display: 'flex',
        height: `${height}px`,
        width: `${width}px`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span>{text}</span>
    </div>
  )
}
