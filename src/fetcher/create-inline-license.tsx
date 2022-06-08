import { License } from './query-types'
import { LicenseData } from '@/data-types'

export function createInlineLicense(
  license?: License
): LicenseData | undefined {
  return license ? { ...license, isDefault: license.default } : undefined
}
