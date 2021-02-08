import { License } from './query-types'
import { LicenseData } from '@/data-types'

// 4, 5, 6, 7, 10, 16, 19

const shortTitles: { [key: number]: string } = {
  4: '123mathe.de',
  5: 'BOS Intranet',
  6: 'strobl-f.de',
  7: 'raschweb.de',
  10: 'Standard-Youtube-Lizenz',
  19: 'schule-bw.de',
}

export function createInlineLicense(license: License): LicenseData {
  const output: LicenseData = license
  output.shortTitle = shortTitles[output.id]
  return output
}
