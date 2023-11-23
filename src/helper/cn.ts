// this tailwind utils wraps clsx and avoids the template literals
// line breaks from spiling into the ouput

import clsx, { type ClassValue } from 'clsx'

// to get reliable auto-complete (even out of className={…}) in vs code apply this config:
//   "tailwindCSS.experimental.classRegex": ["cn\\(([^)]*)\\)"]

export function cn(...inputs: ClassValue[]) {
  return inputs
    .map((input) =>
      clsx(typeof input === 'string' ? input.trim().replace(/\s+/, '') : input)
    )
    .join(' ')
}
