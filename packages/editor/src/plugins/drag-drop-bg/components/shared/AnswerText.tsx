interface AnswerTextProps {
  text?: string
  height?: number
  width?: number
}

export function AnswerText({ text, height, width }: AnswerTextProps) {
  if (!text) return null

  return (
    <div
      className="flex items-center justify-center"
      style={{
        height: height ? `${height}px` : 'auto',
        width: width ? `${width}px` : 'auto',
      }}
    >
      <span>{text}</span>
    </div>
  )
}
