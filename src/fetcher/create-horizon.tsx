import { HorizonData } from '@/data-types'
import { horizonData } from '@/data/horizon_de'

export function createHorizon(): HorizonData {
  const entries = Object.keys(horizonData)
  const selected = []

  while (selected.length < 3) {
    const index = parseInt(entries[Math.floor(Math.random() * entries.length)])
    if (Math.random() > horizonData[index].frequency) continue
    if (selected.indexOf(horizonData[index]) === -1)
      selected.push(horizonData[index])
  }
  return selected
}
