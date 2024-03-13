/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import request from 'graphql-request'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'

import { endpoint } from '@/api/endpoint'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { FolderData, FolderOverview } from '@/components/pages/folder-overview'
import { idsQuery } from '@/fetcher/prettify-links-state/ids-query'
import { IdsQueryReturn } from '@/fetcher/prettify-links-state/prettify-links-in-state'

const ignoredIds = [
  // Prüfungsaufgaben
  261570, 261603, 261604, 226923, 274633, 264625, 226928, 178171, 290077,
  264538, 141780,
  // Universität
  30023 /* Mengenlehre */,
]

const folderData: FolderData = {
  sections: [
    {
      name: 'Mathematische Grundlagen',
      folders: [
        { id: 25120 },
        { id: 25777 },
        { id: 66809 },
        { id: 79412 },
        { id: 25112 },
        { id: 25771 },
        { id: 25113 },
        { id: 25769 },
        { id: 25770 },
        { id: 40685 },

        { id: 24491 },
        { id: 146376 },
        { id: 24492 },
        { id: 28874 },
        { id: 40819 },
        { id: 24496 },
        { id: 50453 },
        { id: 40852 },
        { id: 26312 },
        { id: 26315 },
        { id: 23665 },
        { id: 23767 },
        { id: 78888 },
        { id: 25481 },
        { id: 42 },
        { id: 42 },
      ],
    },
    {
      name: 'Angewandte Mathematik',
      folders: [
        { id: 23869 },
        { id: 38456 },
        { id: 174193 },
        { id: 24382 },
        { id: 24386 },
        { id: 26431 },
        { id: 26418 },
        { id: 42 },
        { id: 42 },
        { id: 42 },
        { id: 42 },
        { id: 42 },
      ],
    },
    {
      name: 'Algebra',
      folders: [
        { id: 26258 },
        { id: 25103 },
        { id: 55276 },
        { id: 25104 },
        { id: 80261 },
        { id: 26306 },
        { id: 78918 },
        { id: 24468 },
        { id: 72471 },
        { id: 24467 },
        { id: 48895 },
        { id: 26259 },
        { id: 260827 },
        { id: 55249 },
        { id: 42 },
        { id: 42 },
        { id: 42 },
        { id: 42 },
      ],
    },
    {
      name: 'Stochastik',
      folders: [
        { id: 26428 },
        { id: 25624 },
        { id: 78889 },
        { id: 25616 },
        { id: 30022 },
        { id: 25627 },
        { id: 63558 },
        { id: 25635 },
        { id: 25630 },
        { id: 25628 },
        { id: 25618 },
        { id: 25621 },
        { id: 25631 },
        { id: 29920 },
        { id: 24547 },
        { id: 24548 },
        { id: 30081 },
        { id: 25632 },
        { id: 42 },
        { id: 42 },
        { id: 42 },
        { id: 42 },
      ],
    },
    {
      name: 'Geometrie',
      folders: [
        { id: 50436 },
        { id: 24392 },
        { id: 67965 },
        { id: 30678 },
        { id: 30680 },
        { id: 85458 },
        { id: 78053 },
        { id: 29215 },
        { id: 69539 },
        { id: 30560 },
        { id: 62758 },
        { id: 62630 },
        { id: 50462 },
        { id: 63588 },
        { id: 62627 },
        { id: 65267 },
        { id: 58818 },
        { id: 25380 },
        { id: 31860 },
        { id: 30683 },
        { id: 24573 },
        { id: 30686 },
        { id: 160385 },
        { id: 30684 },
        { id: 30685 },
        { id: 30688 },
        { id: 30687 },
        { id: 30690 },
        { id: 46046 },
        { id: 42 },
        { id: 42 },
        { id: 42 },
      ],
    },
    {
      name: 'Funktionen',
      folders: [
        { id: 24367 },
        { id: 24369 },
        { id: 31912 },
        { id: 31911 },
        { id: 172264 },
        { id: 172256 },
        { id: 59991 },
        { id: 26396 },

        { id: 40787 },
        { id: 26398 },
        { id: 26314 },
        { id: 26399 },
        { id: 40878 },
        { id: 160066 },
        { id: 160062 },
        { id: 158385 },

        { id: 156666 },
        { id: 30679 },
        { id: 112676 },
        { id: 54054 },

        { id: 63356 },
        { id: 26405 },
        { id: 63329 },
        { id: 128720 },
        { id: 56572 },
        { id: 26400 },
        { id: 129066 },
        { id: 26395 },
        { id: 26410 },
        { id: 26409 },

        { id: 58876 },
        { id: 26262 },
        { id: 23768 },
        { id: 79675 },
        { id: 42 },
        { id: 42 },
      ],
    },
    {
      name: 'Analysis',
      folders: [
        { id: 91321 },
        { id: 26407 },
        { id: 24525 },
        { id: 24523 },
        { id: 24524 },
        { id: 26408 },

        { id: 228643 },
        { id: 63313 },
        { id: 26411 },
        { id: 122106 },
        { id: 26412 },
        { id: 24688 },
        { id: 24507 },
        { id: 58495 },

        { id: 26416 },
        { id: 26419 },
        { id: 159266 },
        { id: 129164 },
        { id: 26417 },
        { id: 64645 },
        { id: 26099 },
        { id: 26415 },
        { id: 26098 },
        { id: 26421 },
        { id: 42 },
        { id: 42 },
      ],
    },
  ],
  nextup: [],
  ignored: ignoredIds,
}

const ContentPage: NextPage<FolderData> = (folderData: FolderData) => {
  return (
    <FrontendClientBase>
      <HeadTags
        data={{
          title: 'Übersicht aller Mathe-Aufgabenordner - Serlo',
          metaDescription:
            'Übersicht über alle Aufgaben-Ordner in Mathematik auf Serlo',
        }}
      />
      <FolderOverview data={folderData} />
    </FrontendClientBase>
  )
}

export const getStaticProps: GetStaticProps<FolderData> = async () => {
  const statsRes = await fetch(
    `https://serlo.github.io/data-pipeline-interactive-exercises/folderData/overview.json`
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const stats: { title: string; id: number; visitCount: number }[] =
    await statsRes.json()

  const mathStats = stats.filter(
    (entry) =>
      entry.title.startsWith('/mathe/') && !ignoredIds.includes(entry.id)
  )

  mathStats.sort((a, b) => b.visitCount - a.visitCount)

  const top10 = mathStats.slice(0, 10).map((entry) => entry.id)
  const top40 = mathStats.slice(10, 40).map((entry) => entry.id)
  /*const below100Views = new Set(
    mathStats.filter((s) => s.visitCount < 100).map((entry) => entry.id)
  )*/

  const ids: number[] = []
  folderData.sections.forEach((section) => {
    section.folders.forEach((folder) => {
      if (ignoredIds.includes(folder.id)) return
      ids.push(folder.id)
    })
  })
  const prettyLinks = await request<IdsQueryReturn>(
    endpoint,
    idsQuery(ids, { withTitle: true })
  )
  folderData.sections.forEach((section) => {
    section.folders.forEach((folder) => {
      const prettyAlias =
        prettyLinks[`uuid${folder.id}`]?.alias ?? `/${folder.id}`

      const prettyTitle =
        prettyLinks[`uuid${folder.id}`]?.title ?? `${folder.id}`

      folder.alias = prettyAlias
      folder.title = prettyTitle
      if (top10.includes(folder.id)) {
        folder.top10 = true
      }
      if (top40.includes(folder.id)) {
        folder.top40 = true
      }
    })
  })

  let i = 0

  for (const folder of mathStats) {
    if (folderData.nextup.length > 30) break
    i++
    if (ids.includes(folder.id)) continue
    folderData.nextup.push({ id: folder.id, alias: folder.title, rank: i })
  }
  return { props: folderData }
}

export default ContentPage
