import type { StateTypeReturnType } from '@editor/plugin'
import { entity } from '@editor/plugins/serlo-template-plugins/common/common'

import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getDefaultLicense } from '@/data/licenses/licenses-helpers'
import { LicenseData } from '@/data-types.js'

export interface LicenseChooserProps {
  licenseId?: StateTypeReturnType<(typeof entity)['licenseId']>
}

export function LicenseChooser({ licenseId }: LicenseChooserProps) {
  const { licenses } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null

  return (
    <label className="mb-4 block">
      <b>{loggedInData.strings.authorMenu.changeLicense}:</b>
      <br />
      <select
        value={
          licenseId?.defined ? licenseId.value : getDefaultLicense(licenses).id
        }
        className="serlo-button-light serlo-input-font-reset -ml-1 max-w-xl"
        onChange={(e) => {
          if (licenseId?.defined) {
            licenseId.set(parseInt(e.target.value))
          } else {
            licenseId?.create(parseInt(e.target.value))
          }
        }}
      >
        {licenses.map(renderOption)}
      </select>
    </label>
  )

  function renderOption(license: LicenseData) {
    return (
      <option
        className="bg-brand-200 text-brand"
        key={license.id}
        value={license.id}
      >
        {license.id} {license.title}
      </option>
    )
  }
}
