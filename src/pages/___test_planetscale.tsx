import { GetServerSideProps, NextPage } from 'next'

import { prisma } from '@/helper/prisma'

interface Data {
  count: number
}

export const getServerSideProps: GetServerSideProps<Data> = async () => {
  const count = await prisma.exerciseSubmission.count()
  await prisma.exerciseSubmission.create({
    data: {
      path: '/test',
      entityId: 1,
      revisionId: 1,
      type: 'input',
      result: 'correct',
      sessionId: '123',
    },
  })
  return { props: { count } }
}

const Page: NextPage<Data> = ({ count }) => {
  return <div>Hi, Anzahl Zeilen in Datenbank: {count}</div>
}

export default Page
