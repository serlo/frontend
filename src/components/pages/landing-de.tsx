import Head from 'next/head'

import { HeadTags } from '../head-tags'
import { InstanceLandingData } from '@/data-types'

export interface LandingDEProps {
  data: InstanceLandingData
}

export function LandingDE() {
  return (
    <>
      <HeadTags data={{ title: 'Serlo – Die freie Lernplattform' }} />
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:wght@400;700;800"
          rel="stylesheet"
        />
      </Head>
      <p className="font-extrabold text-5xl" style={{ fontFamily: 'Karla' }}>
        DAS ist ein TEST
      </p>
      <p className="font-bold text-5xl" style={{ fontFamily: 'Karla' }}>
        Das ist ein anderer Test
      </p>
      <svg
        width="1480"
        height="785"
        viewBox="0 0 1480 785"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 24.464C0 24.464 296 0 735 0C1174 0 1480 24.464 1480 24.464V761.811C1480 761.811 1332.5 785 1009 785C685.5 785 0 745.944 0 745.944V24.464Z"
          fill="#FFEFDA"
        />
      </svg>
    </>
  )
}
