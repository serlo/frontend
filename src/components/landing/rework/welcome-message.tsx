export function WelcomeMessage() {
  const hours = new Date().getHours()
  const { message, icon } =
    hours >= 4 && hours < 9
      ? { message: 'Yeah, Schule geht los', icon: '' }
      : hours > 22 || hours < 4
      ? { message: 'Oha! Um diese Zeit noch fleißig?', icon: '🦉' }
      : { message: 'Schön, dass Du da bist', icon: '' }

  return (
    <>
      <span className="italic">{message}</span> {icon}
    </>
  )
}
