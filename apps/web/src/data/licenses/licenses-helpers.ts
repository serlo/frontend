import { defaultLicense } from '../en/license-data-short'
import { LicenseData } from '@/data-types'

export function getDefaultLicense(licenses: LicenseData[]) {
  // fallback to english default license
  return licenses.find((license) => license.isDefault) ?? defaultLicense
}

export function getLicense(licenses: LicenseData[], id?: number) {
  if (!id) return getDefaultLicense(licenses)
  // fallback to default license
  return (
    licenses.find((license) => license.id === id) ?? getDefaultLicense(licenses)
  )
}
