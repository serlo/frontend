import clsx, { type ClassValue } from 'clsx'

/**
 * this tailwind utils wraps clsx and avoids the template literals
 * line breaks from spiling into the ouput
 */
export function cn(...inputs: ClassValue[]) {
  const replaced = inputs.map((input) =>
    typeof input === 'string' ? input.trim().replace(/\s+/gm, ' ') : input
  )
  return clsx(replaced)
}

// if you have problems with autocomplete or prettier sorting check
// https://github.com/serlo/frontend/wiki/Tailwind-Getting-Started-Guide
