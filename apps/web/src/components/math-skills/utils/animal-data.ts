export const animalsData = {
  lion: { emoji: '🦁', color: '122 149 246' },
  crocodile: { emoji: '🐊', color: '127 193 240' },
  leopard: { emoji: '🐆', color: '149 131 240' },
  monkey: { emoji: '🐵', color: '158 214 124' },
  penguin: { emoji: '🐧', color: '145 220 243' },
  zebra: { emoji: '🦓', color: '124 175 236' },
} as const

export type Animal = keyof typeof animalsData

export const animals = Object.keys(animalsData) as Animal[]
