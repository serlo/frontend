import { XMLParser } from 'fast-xml-parser'
import { GetStaticPaths, GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { Job } from '@/components/pages/jobs/job'
import { Overview } from '@/components/pages/jobs/overview'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export interface JobsProps {
  positions: PersonioPosition[]
  jobId: number | null
}

export default renderedPageNoHooks<JobsProps>((props) => {
  const position =
    props.jobId &&
    props.positions.find((position) => position.id === props.jobId)

  return (
    <FrontendClientBase noContainers>
      {position ? <Job position={position} /> : <Overview {...props} />}
    </FrontendClientBase>
  )
})

export interface PersonioJobDescription {
  name: string
  value: string
}

export interface PersonioPosition {
  id: number
  name: string
  office: string
  employmentType: string
  department?: string
  recruitingCategory?: string
  jobDescriptions?: {
    jobDescription?: PersonioJobDescription[]
  }
  seniority?: string
  schedule?: string
  yearsOfExperience?: string
  occupation?: string
  occupationCategory?: string
  createdAt?: string
}

export interface ParsedPersonioData {
  'workzag-jobs': {
    position: PersonioPosition[]
  }
}

export const getStaticProps: GetStaticProps<JobsProps> = async (context) => {
  if (context.locale !== 'de') return { notFound: true }
  const id = parseInt(context.params?.jobId as string)
  const jobId = id && !isNaN(id) ? id : null

  const resp = await fetch('https://serlo.jobs.personio.de/xml')
  const xml = await resp?.text()

  const parser = new XMLParser()
  const data = parser.parse(xml) as ParsedPersonioData
  const positions = data['workzag-jobs'].position

  return {
    props: { positions, jobId },
    revalidate: 2 * 60 * 60, // 2h,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
