export function feedbackAnimation(
  isCorrect: boolean,
  shakeElementQuery?: string
) {
  const animationClass = isCorrect
    ? 'motion-safe:animate-jump'
    : 'motion-safe:animate-shake'

  const target = shakeElementQuery
    ? document.querySelector(shakeElementQuery)
    : null
  if (!target) return

  target.classList.add(animationClass)
  setTimeout(() => target.classList.remove(animationClass), 1000)
}
