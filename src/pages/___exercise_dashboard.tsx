import { ExerciseSubmission } from '@prisma/client'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { prisma } from '@/helper/prisma'

interface Data {
  groups: {
    date: string
  }[]
}

export const getServerSideProps: GetServerSideProps<Data> = async () => {
  const data = await prisma.exerciseSubmission.findMany()

  const groups = data.reduce((result, obj) => {
    const dateKey = obj.timestamp.toUTCString().substring(0, 16)
    ;(result[dateKey] = result[dateKey] || []).push(obj)
    return result
  }, {} as { [key: string]: ExerciseSubmission[] })

  const output: Data = { groups: [] }

  for (const group in groups) {
    const data = groups[group]

    const sessions = data.reduce((result, obj) => {
      const uuid = obj.sessionId
      ;(result[uuid] = result[uuid] || []).push(obj)
      return result
    }, {} as { [key: string]: ExerciseSubmission[] })

    const pages = data.reduce((result, obj) => {
      const path = obj.path
      ;(result[path] = result[path] || []).push(obj)
      return result
    }, {} as { [key: string]: ExerciseSubmission[] })

    console.log(group)
    console.log('number of entries', data.length)
    console.log('Number of sessions:', Object.keys(sessions).length)
    console.log('Number of pages:', Object.keys(pages).length)

    output.groups.push({ date: group })
  }

  return {
    props: output,
  }
}

const Page: NextPage<Data> = (props) => {
  return (
    <FrontendClientBase authorization={{}}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div>{JSON.stringify(props)}</div>
    </FrontendClientBase>
  )
}

export default Page
