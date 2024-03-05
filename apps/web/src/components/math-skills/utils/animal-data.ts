export const animalsData = {
  lion: { emoji: '🦁', color: '#7A95F6' },
  crocodile: { emoji: '🐊', color: '#7FC1F0' },
  leopard: { emoji: '🐆', color: '#9983F0' },
  monkey: { emoji: '🐵', color: '#9ED67C' },
  penguin: { emoji: '🐧', color: '#91DCF3' },
  zebra: { emoji: '🦓', color: '#7CAFEC' },
} as const

export type Animal = keyof typeof animalsData

export const animals = Object.keys(animalsData) as Animal[]
