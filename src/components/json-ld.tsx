import Head from 'next/head'

import { useInstanceData } from '@/contexts/instance-context'
import { EntityPageBase, SingleEntityPage } from '@/data-types'

interface JsonLdProps {
  data: SingleEntityPage & EntityPageBase //EntityBaseProps['page']
  id: number
}

export function JsonLd({ data, id }: JsonLdProps) {
  const { lang } = useInstanceData()

  // if (!hasOwnPropertyTs(data, 'entityData')) return null //no tax for now

  return (
    <Head>
      <script type="application/ls+json">{JSON.stringify(getData())}</script>
    </Head>
  )

  function getData() {
    return {
      '@context': [
        'https://w3id.org/kim/lrmi-profile/draft/context.jsonld',
        { '@language': lang },
      ],
      id: getIRI(id),
      type: ['LearningResource', 'Article'], // will be different for other types
      learningResourceType: 'Article', // will be different for other types
      name: data.metaData?.title,
      description: data.metaData?.metaDescription,
      //dateCreated: data.entityData date…,
      //dateModified: article.currentRevision.date,
      version: data.entityData.revisionId
        ? getIRI(data.entityData.revisionId)
        : null,
      license: { id: data.entityData.licenseData?.url },
      isAccessibleForFree: true,
      isFamilyFriendly: true,
      publisher: 'https://serlo.org/',
      inLanguage: lang,
      audience: [
        {
          id: 'http://purl.org/dcx/lrmi-vocabs/educationalAudienceRole/student',
          prefLabel: {
            en: 'student',
            de: 'Schüler*in',
          },
          type: 'Concept',
          inScheme: {
            id: 'http://purl.org/dcx/lrmi-vocabs/educationalAudienceRole/',
          },
        },
      ],
      isPartOf: data.breadcrumbsData
        ?.map((node) => (node.id ? getIRI(node.id) : null))
        .filter(Boolean), // will be different for CoursePage
    }
  }
  // about: [
  //   {
  //     id: getIRI(article.subject.taxonomyTerm.id),
  //     prefLabel: {
  //       [article.instance]: article.subject.taxonomyTerm.name,
  //       '@none': article.subject.taxonomyTerm.name
  //     },
  //     type: "Concept",
  //   }
  // ],

  function getIRI(id: number) {
    return `https://serlo.org/${id}`
  }
}
