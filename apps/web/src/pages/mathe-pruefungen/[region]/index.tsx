import { GetStaticPaths, GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { MathExamsLanding } from '@/components/pages/math-exams-landing'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export const supportedRegions = ['bayern', 'niedersachsen'] as const
export type SupportedRegion = (typeof supportedRegions)[number]
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
