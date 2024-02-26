import { GetStaticPaths, GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import {
  SupportedRegion,
  regions,
} from '@/components/landing/exams/exams-finder/exams-finder'
import { MathExamsLanding } from '@/components/pages/math-exams-landing'
import { isProduction } from '@/helper/is-production'
import { renderedPageNoHooks } from '@/helper/rendered-page'

// TODO: rename to `mathe-pruefungen` again before going live

export const supportedRegions = Object.keys(regions)
export interface RegionData {
  region: SupportedRegion
}

export default renderedPageNoHooks<RegionData>(({ region }) => {
  return (
    <FrontendClientBase noContainers noHeaderFooter>
      <MathExamsLanding region={region} />
    </FrontendClientBase>
  )
})

export const getStaticProps: GetStaticProps<RegionData> = async (context) => {
  if (context.locale !== 'de') return { notFound: true }
  if (isProduction) return { notFound: true }

  const region = context.params?.region as SupportedRegion
  if (!supportedRegions.includes(region)) return { notFound: true }

  return { props: { region } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: supportedRegions.map((region) => ({ params: { region } })),
    fallback: 'blocking',
  }
}
