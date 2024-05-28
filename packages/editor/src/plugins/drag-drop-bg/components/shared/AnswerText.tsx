interface AnswerTextProps {
  text?: string
  height?: number
  width?: number
}

export function AnswerText({ text }: AnswerTextProps) {
  if (!text) return null

  return (
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
