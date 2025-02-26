import { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'

import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LicenseData } from '@/data-types'
import { GetMetaAndLicenseQuery } from '@/fetcher/graphql-types/operations'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { useEntityUpdateLicenseMutation } from '@/mutations/use-entity-update-license-mutation'

interface UpdateLicenseProps {
  id: number
}

export default renderedPageNoHooks<UpdateLicenseProps>((props) => (
  <FrontendClientBase noIndex>
    <Content {...props} />
  </FrontendClientBase>
))

function Content({ id }: UpdateLicenseProps) {
  const updateLicense = useEntityUpdateLicenseMutation()

  const { strings, licenses } = useInstanceData()
  const [licenseId, setLicenseId] = useState<number>(licenses[0].id)
  const loggedInData = useLoggedInData()

  const { data, error } = useFetch(id)

  if (!loggedInData)
    return (
      <div className="mt-12">
        <PleaseLogIn />
      </div>
    )
  const loggendInStrings = loggedInData.strings

  if (!data && !error) return <LoadingSpinner noText />

  if (!data || !data.uuid) {
    return (
      <>
        {renderBackButton()}
        <h3 className="serlo-h3">{strings.errors.defaultMessage}</h3>
      </>
    )
  }

  const { uuid } = data

  return (
    <>
      {renderBackButton()}
      <PageTitle title={loggendInStrings.authorMenu.changeLicense} headTitle />

      <div className="mx-side flex">
        <select
          className="serlo-button-learner-secondary serlo-input-font-reset max-w-xl"
          onChange={(e) => setLicenseId(parseInt(e.target.value))}
          defaultValue={uuid.licenseId}
        >
          {licenses.map(renderOption)}
        </select>
        <button
          className="serlo-button-learner-primary ml-4"
          onClick={() => void updateLicense({ entityId: id, licenseId })}
        >
          Update
        </button>
      </div>
    </>
  )

  function renderBackButton() {
    return (
      <Breadcrumbs
        data={[{ label: strings.revisions.toContent, url: `/${id}` }]}
        asBackButton
      />
    )
  }

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

export const getStaticProps: GetStaticProps<UpdateLicenseProps> = (context) => {
  const id = parseInt(context.params?.id as string)

  if (isNaN(id)) return { notFound: true }

  return {
    props: { id },
    revalidate: 60 * 60 * 24, // 1 day
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

type MetaAndLicenseResult = Extract<
  GetMetaAndLicenseQuery['uuid'],
  { licenseId: any }
>

function useFetch(id: number) {
  return useGraphqlSwr<{ uuid: MetaAndLicenseResult }>({
    query: metaAndLicenseQuery,
    variables: { id },
    config: {
      refreshInterval: 10 * 60 * 1000, //10min
    },
  })
}

export const metaAndLicenseQuery = gql`
  query getMetaAndLicense($id: Int!) {
    uuid(id: $id) {
      ... on AbstractEntity {
        __typename
        licenseId
        currentRevision {
          metaTitle
          metaDescription
        }
      }
    }
  }
`
