import { Instance } from '@serlo/api'
import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'

import { endpoint } from '@/api/endpoint'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  LicensesForInstaceQuery,
  LicensesForInstaceQueryVariables,
} from '@/fetcher/graphql-types/operations'
import { useEntityUpdateLicenseMutation } from '@/helper/mutations/use-entity-update-license-mutation'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface UpdateLicenseProps {
  id: number
  licenses: LicensesForInstaceQuery['license']['licenses']
}

export default renderedPageNoHooks<UpdateLicenseProps>((props) => (
  <FrontendClientBase>
    <Content {...props} />
  </FrontendClientBase>
))

function Content({ id, licenses }: UpdateLicenseProps) {
  const updateLicense = useEntityUpdateLicenseMutation()
  const [licenseId, setLicenseId] = useState<number>(licenses[0].id)
  const loggedInData = useLoggedInData()
  const { strings } = useInstanceData()
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
          className="serlo-button serlo-make-interactive-light serlo-input-font-reset max-w-xl"
          onChange={(e) => setLicenseId(parseInt(e.target.value))}
        >
          {licenses.map(renderOption)}
        </select>
        <button
          className="ml-4 serlo-button serlo-make-interactive-primary"
          onClick={() => void updateLicense({ entityId: id, licenseId })}
        >
          Update
        </button>
      </div>
    </>
  )

  function renderOption(license: UpdateLicenseProps['licenses'][number]) {
    return (
      <option
        className="bg-brand-150 text-brand"
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

export const getStaticProps: GetStaticProps<UpdateLicenseProps> = async (
  context
) => {
  const id = parseInt(context.params?.id as string)

  if (isNaN(id)) return { notFound: true }

  const instance = context.locale! as Instance

  const result = await request<
    LicensesForInstaceQuery,
    LicensesForInstaceQueryVariables
  >(endpoint, licensesQuery, {
    instance,
  })

  const { licenses } = result.license

  return {
    props: {
      id,
      licenses,
    },
    revalidate: 60 * 60 * 24, //one day in seconds
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const licensesQuery = gql`
  query licensesForInstace($instance: Instance!) {
    license {
      licenses(instance: $instance) {
        id
        default
        title
      }
    }
  }
`
