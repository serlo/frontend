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

// employmentType special cases:
// intern: praktikum
// trailnee: ehrenamt

export default renderedPageNoHooks<JobsProps>((props) => {
  const position =
    props.jobId &&
    props.positions.find((position) => position.id === props.jobId)

  const jobs = [] as PersonioPosition[]
  const internships = [] as PersonioPosition[]
  const volunteers = [] as PersonioPosition[]

  function getMaxExp(job: PersonioPosition) {
    return parseInt(job.yearsOfExperience?.split('-')[1] ?? '0')
  }

  for (let i = 0; i < props.positions.length; i++) {
    const pos = props.positions[i]
    if (pos.employmentType === 'trainee') volunteers.push(pos)
    else if (pos.employmentType === 'intern') internships.push(pos)
    else jobs.push(pos)
  }

  jobs.sort((a, b) => getMaxExp(b) - getMaxExp(a))

  return (
    <FrontendClientBase noContainers>
      {position ? (
        <Job position={position} />
      ) : (
        <Overview
          jobs={jobs}
          internships={internships}
          volunteers={volunteers}
        />
      )}
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
    revalidate: 60 * 60 * 2, // 2h
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
