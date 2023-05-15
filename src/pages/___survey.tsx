import { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { prisma } from '@/helper/prisma'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface SurveyProps {
  shown: number
  exit: number
  yes: number
  rarely: number
  no: number
  noStudent: number
}

export default renderedPageNoHooks<SurveyProps>(
  ({ shown, exit, yes, rarely, no, noStudent }) => {
    const unknown = shown - exit - yes - rarely - no - noStudent

    function showNumAndPercent(num: number) {
      return (
        <>
          {num} ({Math.round((num / shown) * 100)}%)
        </>
      )
    }
    return (
      <FrontendClientBase entityId={-1} authorization={{}}>
        <h1 className="serlo-h1 mt-12" itemProp="name">
          Schnell-Auswertung Umfrage
        </h1>
        <div className="min-h-1/4">
          <p>Anzeigen: {shown}</p>
          <p>Exit: {showNumAndPercent(exit)}</p>
          <p>Ja: {showNumAndPercent(yes)}</p>
          <p>Selten: {showNumAndPercent(rarely)}</p>
          <p>Nein: {showNumAndPercent(no)}</p>
          <p>Keine Schüler*in: {showNumAndPercent(noStudent)}</p>
          <p className="text-gray-600">
            Sonstiges: {showNumAndPercent(unknown)}
          </p>
        </div>
      </FrontendClientBase>
    )
  }
)

export const getServerSideProps: GetServerSideProps<SurveyProps> = async () => {
  const data = await prisma.testSurvey.findMany()
  if (!data) {
    return { notFound: true }
  }

  let shown = 0,
    exit = 0,
    yes = 0,
    rarely = 0,
    no = 0,
    noStudent = 0

  data.forEach((entry) => {
    if (entry.isProduction) {
      if (entry.event === 'show') {
        shown++
      } else if (entry.event === 'yes') {
        yes++
      } else if (entry.event === 'exit') {
        exit++
      } else if (entry.event === 'rarely') {
        rarely++
      } else if (entry.event === 'no') {
        no++
      } else if (entry.event === 'noStudent') {
        noStudent++
      }
    }
  })

  return {
    props: {
      shown,
      exit,
      yes,
      no,
      rarely,
      noStudent,
    },
  }
}
