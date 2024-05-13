import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'

import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LicenseData } from '@/data-types'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { useEntityUpdateLicenseMutation } from '@/mutations/use-entity-update-license-mutation'

interface UpdateLicenseProps {
  id: number
}

export default renderedPageNoHooks<UpdateLicenseProps>((props) => (
  <FrontendClientBase>
    <Content {...props} />
  </FrontendClientBase>
))

function Content({ id }: UpdateLicenseProps) {
  const updateLicense = useEntityUpdateLicenseMutation()
  const { strings, licenses } = useInstanceData()
  const [licenseId, setLicenseId] = useState<number>(licenses[0].id)
  const loggedInData = useLoggedInData()
  if (!loggedInData)
    return (
      <div className="mt-12">
        <PleaseLogIn />
      </div>
    )
  const loggendInStrings = loggedInData.strings

  return (
    <>
      {renderBackButton()}
      <PageTitle title={loggendInStrings.authorMenu.changeLicense} headTitle />

      <div className="mx-side flex">
        <select
          className="serlo-button-light serlo-input-font-reset max-w-xl"
          onChange={(e) => setLicenseId(parseInt(e.target.value))}
        >
          {licenses.map(renderOption)}
        </select>
        <button
          className="serlo-button-blue ml-4"
          onClick={() => void updateLicense({ entityId: id, licenseId })}
        >
          Update
        </button>
      </div>
    </>
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

  function renderBackButton() {
    return (
      <Breadcrumbs
        data={[{ label: strings.revisions.toContent, url: `/${id}` }]}
        asBackButton
      />
    )
  }
}

export const getStaticProps: GetStaticProps<UpdateLicenseProps> = (context) => {
  const id = parseInt(context.params?.id as string)

  // get current license ID here maybe?

  if (isNaN(id)) return { notFound: true }

  return {
    props: {
      id,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
