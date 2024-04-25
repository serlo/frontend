import * as confetti from 'canvas-confetti'

export function shootStars(e?: React.MouseEvent) {
  let x = 0.5
  let y = 0.5

  if (e) {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    x = (left + 15) / window.innerWidth
    y = (top + 15) / window.innerHeight
  }

  void confetti.default({
    spread: 60,
    gravity: 1.5,
    decay: 0.9,
    ticks: 35,
    angle: 60,
    startVelocity: 20,
    particleCount: 20,
    colors: ['FFBD00', 'E89400', 'FFCA6C'],
    origin: { x, y },
    disableForReducedMotion: true,
    scalar: 0.7,
    shapes: ['star'],
  })
}
