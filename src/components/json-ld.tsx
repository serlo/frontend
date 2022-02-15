import Head from 'next/head'

import { EntityBaseProps } from './entity-base'
import { useInstanceData } from '@/contexts/instance-context'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'

interface JsonLdProps {
  data: EntityBaseProps['page']
  id: number
}

// courses are not supported since we redirect them to first course page anyway
const typeStrings = {
  Article: 'Article',
  Applet: 'WebApplication',
  Course: 'Article',
  CoursePage: 'Article',
  Exercise: 'Quiz',
  ExerciseGroup: 'Quiz',
  TaxonomyTerm: 'Collection',
  Video: 'VideoObject',
}

export function JsonLd({ data, id }: JsonLdProps) {
  const { lang } = useInstanceData()

  const isEntity = data.kind === 'single-entity'
  const isTaxonomy = data.kind === 'taxonomy'
  const entityType = isEntity ? data.entityData.typename : 'TaxonomyTerm'

  if (!hasOwnPropertyTs(typeStrings, entityType)) return null
  const typeString = typeStrings[entityType]

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getData()) }}
      ></script>
    </Head>
  )

  function getData() {
    const type = ['LearningResource', typeString]
    const learningResourceType = typeString

    const version =
      isEntity && data.entityData.revisionId
        ? getIRI(data.entityData.revisionId)
        : undefined

    const license =
      isEntity && data.entityData.licenseData
        ? { id: data.entityData.licenseData?.url }
        : undefined

    const isPartOf =
      entityType === 'CoursePage' && isEntity
        ? data.entityData?.courseData?.id
          ? getIRI(data.entityData.courseData.id)
          : undefined
        : data.breadcrumbsData
            ?.map((node) => (node.id ? getIRI(node.id) : null))
            .filter(Boolean)

    const taxonomyDataChildren = isTaxonomy
      ? [
          ...data.taxonomyData.subterms,
          ...data.taxonomyData.applets,
          ...data.taxonomyData.articles,
          ...data.taxonomyData.courses,
          ...data.taxonomyData.events,
          ...data.taxonomyData.exercises,
          ...data.taxonomyData.videos,
        ]
      : undefined

    const hasPart = isTaxonomy
      ? taxonomyDataChildren?.map((node) => getIRI(node.id))
      : undefined

    const collectionSize = isTaxonomy ? taxonomyDataChildren?.length : undefined

    const about = data.breadcrumbsData?.[0].id
      ? [
          {
            id: getIRI(data.breadcrumbsData[0].id),
            prefLabel: {
              [lang]: data.breadcrumbsData[0].label,
              '@none': data.breadcrumbsData[0].label,
            },
            type: 'Concept',
          },
        ]
      : undefined

    return {
      '@context': [
        'https://w3id.org/kim/lrmi-profile/draft/context.jsonld',
        {
          '@language': lang,
          '@vocab': 'http://schema.org/',
          type: '@type',
          id: '@id',
        },
      ],
      id: getIRI(id),
      type,
      learningResourceType,
      name: data.metaData?.title,
      description: data.metaData?.metaDescription,
      dateCreated: data.metaData?.dateCreated,
      dateModified: data.metaData?.dateModified,
      version,
      license,
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
      isPartOf,
      applicationCategory:
        entityType === 'Applet' ? 'https://www.geogebra.org/' : undefined,
      hasPart,
      collectionSize,
      about,
    }
    function getIRI(id: number) {
      return `https://serlo.org/${id}`
    }
  }
}
