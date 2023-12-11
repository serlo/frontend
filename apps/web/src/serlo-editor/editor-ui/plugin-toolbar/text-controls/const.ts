import { articleColors } from '@/helper/colors'

export const textColors = Object.entries(articleColors).map(([key, value]) => ({
  value,
  name: key.charAt(0).toUpperCase() + key.slice(1),
}))
