export function feedbackAnimation(
  isCorrect: boolean,
  element?: HTMLElement | null
) {
  const animationClass = isCorrect
    ? 'motion-safe:animate-jump'
    : 'motion-safe:animate-shake'
  element?.classList.add(animationClass)
  setTimeout(() => element?.classList.remove(animationClass), 1000)
}
