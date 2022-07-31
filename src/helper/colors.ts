import {
  brandGreen,
  articleColors as _articleColors,
  brand,
} from 'tailwind.config'

export const colors = {
  brand: brand as string,
  brandGreen: brandGreen as string,
}

export const articleColors = _articleColors as Record<string, string>
