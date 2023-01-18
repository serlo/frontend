import { Entity } from '@/components/content/entity'
import { EntityBase } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Instance } from '@/fetcher/graphql-types/operations'
import { requestPage } from '@/fetcher/request-page'
import { getInstanceDataByLang } from '@/helper/feature-i18n'

export default async function Page({
  params: { slug },
}: {
  params: { slug: string[] }
}) {
  const alias = slug.join('/')
  const pageData = await requestPage('/' + alias, Instance.De)

  if (pageData.kind !== 'single-entity') throw 'bad'

  const entityId = pageData.entityData.id

  return (
    <FrontendClientBase
      noContainers
      entityId={entityId}
      authorization={pageData.authorization}
      instanceData={getInstanceDataByLang(Instance.De)}
    >
      <EntityBase page={pageData} entityId={entityId}>
        <Entity data={pageData.entityData} />
      </EntityBase>
    </FrontendClientBase>
  )
}
