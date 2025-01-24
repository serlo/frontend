import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { GraphQLClient, gql } from 'graphql-request'
import { NextPage } from 'next'
import { useState } from 'react'

import { endpoint } from '@/api/endpoint'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { useInstanceData } from '@/contexts/instance-context'
import { GetAllEntityIdsInTaxonomyQuery } from '@/fetcher/graphql-types/operations'
import { cn } from '@/helper/cn'
import { useMutationFetchAuthed } from '@/mutations/helper/use-mutation-fetch'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase noHeaderFooter noContainers noIndex showNav={false}>
      <BatchLicenseTool />
    </FrontendClientBase>
  )
}
export default ContentPage

const query = gql`
  query getAllEntityIdsInTaxonomy($id: Int!) {
    uuid(id: $id) {
      ... on TaxonomyTerm {
        children {
          nodes {
            ...entity
            ... on TaxonomyTerm {
              children {
                nodes {
                  ...entity
                  ... on TaxonomyTerm {
                    children {
                      nodes {
                        ...entity
                        ... on TaxonomyTerm {
                          children {
                            nodes {
                              ...entity
                              ... on TaxonomyTerm {
                                children {
                                  nodes {
                                    ...entity
                                    ... on TaxonomyTerm {
                                      children {
                                        nodes {
                                          ...entity
                                          ... on TaxonomyTerm {
                                            children {
                                              nodes {
                                                ...entity
                                                ... on TaxonomyTerm {
                                                  children {
                                                    nodes {
                                                      ...entity
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fragment entity on AbstractEntity {
    id
    __typename
  }
`

interface EntityData {
  id: number
  type: string
}

function BatchLicenseTool() {
  const { licenses } = useInstanceData()
  const [allEntities, setAllEntities] = useState<EntityData[]>([])
  const [licenseId, setLicenseId] = useState<number>(licenses[0].id)
  const client = new GraphQLClient(endpoint)

  const mutationFetch = useMutationFetchAuthed()

  async function handleIdInput(value: string) {
    const parentId = parseInt(value)
    if (isNaN(parentId)) return

    const result: GetAllEntityIdsInTaxonomyQuery = await client.request(query, {
      id: parentId,
    })

    const allIds: EntityData[] = []

    // reduce the nested result.uuid to a flat array of ids in place
    function extractIds(node: GetAllEntityIdsInTaxonomyQuery['uuid']) {
      if (!node) return
      if (Object.hasOwn(node, 'id')) {
        // @ts-expect-error just checked…
        allIds.push({ id: node.id as number, type: node.__typename })
        return
      }
      if (!Object.hasOwn(node, 'children') || !node.children) return

      node.children.nodes.forEach((node) =>
        extractIds(node as GetAllEntityIdsInTaxonomyQuery['uuid'])
      )
    }

    extractIds(result.uuid)

    setAllEntities(allIds)
  }

  async function handleApplyClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const success = await mutationFetch(buildMutation(), {
      licenseId,
      entityId: 314953,
    })
    if (success) {
      showToastNotice('Successfully applied license to all entities', 'success')
      return
    }
    showToastNotice('Failed to apply!', 'warning')
  }

  return (
    <div className="bg-brand-100 p-4">
      <div className="flex max-w-md flex-col gap-3 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <label htmlFor="parent-taxonomy-uuid">
          Get all entities inside a TaxonomyTerm and it&apos;s children:
        </label>
        <input
          id="parent-taxonomy-uuid"
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          type="text"
          placeholder="uuid of parent taxonomy"
          onKeyDown={(e) => {
            if (e.key === 'Enter') void handleIdInput(e.currentTarget.value)
          }}
          onPaste={(e) => handleIdInput(e.clipboardData.getData('text'))}
        />

        <label htmlFor="entities-list">Looks about right?</label>
        <textarea
          id="entities-list"
          readOnly
          className="focus:shadow-outline mt-3 min-h-56 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          value={allEntities
            .map((node) => {
              return `${node.id} (${node.type}) \n`
            })
            .join('')}
        />
        <label htmlFor="license-id" className="mt-8">
          Choose a license to apply to all listed entities
        </label>
        <select
          id="license-id"
          className="serlo-button-learner-secondary serlo-input-font-reset max-w-md"
          onChange={(e) => setLicenseId(parseInt(e.target.value))}
          value={licenseId}
        >
          {licenses.map(({ id, title }) => {
            return (
              <option className="bg-brand-200 text-brand" key={id} value={id}>
                {id} {title}
              </option>
            )
          })}
        </select>

        <button
          className={cn(
            'serlo-button-learner-primary mt-8 w-fit px-3 text-left text-base',
            !allEntities.length ? 'cursor-not-allowed opacity-20' : ''
          )}
          onClick={handleApplyClick}
          disabled={!allEntities.length}
        >
          Apply license to all entities ✔
        </button>
      </div>
    </div>
  )

  function buildMutation() {
    const entitiyMutations = allEntities.map(({ id }) => {
      return `id${id}: entity {updateLicense(input: {entityId: ${id}, licenseId: ${licenseId}}) {success}}`
    })
    return `mutation {${entitiyMutations.join(',\n')}}`
  }
}
