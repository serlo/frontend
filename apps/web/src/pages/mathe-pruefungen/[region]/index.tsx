import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

import { endpoint } from '@/api/endpoint'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { MathExamsLanding } from '@/components/pages/math-exams-landing'
import {
  type SupportedRegion,
  deRegions,
  allMathExamTaxIds,
  ExamsTaxonomyData,
} from '@/data/de/math-exams-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export const supportedRegions = Object.keys(deRegions)
export interface ExamsLandingData {
  region: SupportedRegion
  examsTaxonomyData: ExamsTaxonomyData
}

export default renderedPageNoHooks<ExamsLandingData>(
  ({ region, examsTaxonomyData }) => {
    return (
      <FrontendClientBase noContainers noHeaderFooter>
        <MathExamsLanding
          region={region}
          examsTaxonomyData={examsTaxonomyData}
        />
      </FrontendClientBase>
    )
  }
)

export const getStaticProps: GetStaticProps<ExamsLandingData> = async (
  context
) => {
  if (context.locale !== 'de') return { notFound: true }

  const examsTaxonomyData = await request<ExamsTaxonomyData>(
    endpoint,
    buildExamsTaxonomyQuery(allMathExamTaxIds)
  )

  const region = context.params?.region as SupportedRegion
  if (!supportedRegions.includes(region)) return { notFound: true }

  return { props: { region, examsTaxonomyData } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: supportedRegions.map((region) => ({ params: { region } })),
    fallback: 'blocking',
  }
}

function buildExamsTaxonomyQuery(ids: number[]) {
  return gql`
    query examsTaxonomyQuery {
      ${ids.map(
        (id) => gql`
          id${id}: uuid(id: ${id}) {
            ... on TaxonomyTerm {
              ... examsTaxonomyData
            }
      }`
      )}
    }

    fragment examsTaxonomyData on TaxonomyTerm {
      alias
      trashed
      children {
        nodes {
          alias
          title
          trashed
        }
      }
    }
  `
}
