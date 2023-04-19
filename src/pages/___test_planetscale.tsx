import { GetServerSideProps, NextPage } from 'next'

import { prisma } from '@/helper/prisma'

interface Data {
  count: number
}

export const getServerSideProps: GetServerSideProps<Data> = async () => {
  const count = await prisma.exerciseSubmission.count()
  return { props: { count } }
}

const Page: NextPage<Data> = ({ count }) => {
  return (
    <>
      <div className="w-full">
        <div className="mx-auto text-xl pt-24 w-fit">
          Anzahl Interaktive Aufgaben geklickt
        </div>
        <div className="w-fit mx-auto text-5xl mt-24 font-bold pb-24">
          {count}
        </div>
      </div>
    </>
  )
}

export default Page
