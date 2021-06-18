import { Fragment } from 'react'

const messages = {
  early: ['Yeah, Schule geht los', ''], //😬
  default: ['Schön, dass Du da bist', ''], //🙂
  late: ['Oha! Um diese Zeit noch fleißig?', '🦉'],
}

export function WelcomeMessage() {
  const hours = new Date().getHours()
  const phase =
    hours >= 4 && hours < 9
      ? 'early'
      : hours > 22 || hours < 4
      ? 'late'
      : 'default'

  return (
    <>
      <span className="italic">{messages[phase][0]}</span> {messages[phase][1]}
    </>
  )
}
