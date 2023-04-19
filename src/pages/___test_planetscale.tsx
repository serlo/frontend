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
  return (
    <>
      <div className="w-full">
        <div className="mx-auto text-xl pt-24 w-fit">Anzahl Aufrufe</div>
        <div className="w-fit mx-auto text-5xl mt-24 font-bold pb-24">
          {count}
        </div>
      </div>
    </>
  )
}

export default Page
