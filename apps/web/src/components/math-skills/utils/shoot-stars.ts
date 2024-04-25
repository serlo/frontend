import * as confetti from 'canvas-confetti'

export function shootStars(e?: React.MouseEvent) {
  let x = 0.5
  let y = 0.5

  let dim = 0

  if (e) {
    const { left, top, width } = e.currentTarget.getBoundingClientRect()
    x = (left + 15) / window.innerWidth
    y = (top + 15) / window.innerHeight

    dim = width / window.innerWidth / 5
  }

  for (let i = 0; i < 5; i++) {
    void confetti.default({
      spread: 360,
      gravity: 0,
      decay: 0.8,
      ticks: 35,
      startVelocity: 5,
      particleCount: 6,
      colors: ['FFBD00', 'E89400', 'FFCA6C'],
      origin: { x: x + i * dim, y },
      disableForReducedMotion: true,
      scalar: 0.6,
      shapes: ['star'],
    })
  }
}
