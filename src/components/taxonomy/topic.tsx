import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons'
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-internal-modules
import Chart from 'chart.js/auto'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { Fragment, useEffect, useState } from 'react'
import { RatingProps } from 'react-simple-star-rating'

import { NewFolderPrototypeProps } from './new-folder-prototype'
import { SubTopic } from './sub-topic'
import { TopicCategories } from './topic-categories'
import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { StaticInfoPanel } from '../static-info-panel'
import type { DonationsBannerProps } from '@/components/content/donations-banner-experiment/donations-banner'
import { LicenseNotice } from '@/components/content/license/license-notice'
import { UserTools } from '@/components/user-tools/user-tools'
import { useAB } from '@/contexts/ab'
import { useExerciseFolderStats } from '@/contexts/exercise-folder-stats-context'
import { useInstanceData } from '@/contexts/instance-context'
import { TaxonomyData, TopicCategoryType, UuidType } from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { FrontendNodeType } from '@/frontend-node-types'
import { abSubmission } from '@/helper/ab-submission'
import { renderArticle } from '@/schema/article-renderer'

export interface TopicProps {
  data: TaxonomyData
}

const DonationsBanner = dynamic<DonationsBannerProps>(() =>
  import(
    '@/components/content/donations-banner-experiment/donations-banner'
  ).then((mod) => mod.DonationsBanner)
)

const Rating = dynamic<RatingProps>(() =>
  import('react-simple-star-rating').then((mod) => mod.Rating)
)

const NewFolderPrototype = dynamic<NewFolderPrototypeProps>(() =>
  import('./new-folder-prototype').then((mod) => mod.NewFolderPrototype)
)

export function Topic({ data }: TopicProps) {
  const { strings } = useInstanceData()
  const exerciseStats = useExerciseFolderStats()

  const ab = useAB()

  const [hasFeedback, setHasFeedback] = useState(false)

  const isExerciseFolder = data.taxonomyType === TaxonomyTermType.ExerciseFolder
  const isTopic = data.taxonomyType === TaxonomyTermType.Topic

  const hasExercises = data.exercisesContent.length > 0
  const defaultLicense = hasExercises ? getDefaultLicense() : undefined

  const mapping: { [key: string]: string } = {}
  data.exercisesContent.forEach((exercise, i) => {
    if (exercise.type === FrontendNodeType.Exercise) {
      mapping[exercise.context.id] = `${i + 1}`
    } else {
      exercise.children?.forEach((child) => {
        mapping[child.context.id] = `${i + 1}${String.fromCharCode(
          'a'.charCodeAt(0) + child.positionInGroup!
        )}`
      })
    }
  })

  function customSort(a: string, b: string): number {
    // Regular expression to separate numeric and alphabetic parts
    const regex = /(\d+)([a-zA-Z]*)/

    // Function to extract numeric and alphabetic parts
    const extractParts = (str: string): [number, string] => {
      const match = str.match(regex)!
      return [parseInt(match[1], 10), match[2]]
    }

    // Extract parts for comparison
    const partsA = extractParts(a)
    const partsB = extractParts(b)

    // Compare numeric parts
    if (partsA[0] !== partsB[0]) {
      return partsA[0] - partsB[0]
    }

    // If numeric parts are equal, compare alphabetic parts
    return partsA[1].localeCompare(partsB[1])
  }

  // calculate matrix
  const matrix: { [key: string]: { [key: string]: number } } = {}
  let things: string[] = []
  if (exerciseStats) {
    const ids: { [key: number]: number } = {}
    Object.values(exerciseStats.journeys).forEach((journey) => {
      journey.forEach((id) => {
        if (!ids[id]) {
          ids[id] = 0
        }
        ids[id]++
      })
    })
    const entries = Object.entries(ids)
    entries.sort((a, b) => b[1] - a[1])
    things = entries.map((e) => e[0])
    things.sort((a, b) => customSort(mapping[a], mapping[b]))
    // prepare matrix
    for (const thing of things) {
      matrix[thing] = {}
      for (const t2 of things) {
        matrix[thing][t2] = 0
      }
      matrix[thing]['E'] = 0
    }
    matrix['S'] = {}
    for (const t2 of things) {
      matrix['S'][t2] = 0
    }
    matrix['S']['E'] = 0
    for (const journey of Object.values(exerciseStats.journeys)) {
      let prev = 'S'
      for (let i = 0; i <= journey.length; i++) {
        if (i < journey.length) {
          matrix[prev][journey[i]]++
          prev = journey[i].toString()
        } else {
          matrix[prev]['E']++
        }
      }
    }
  }

  useEffect(() => {
    const ctx = document.getElementById('chart')
    const ctx2 = document.getElementById('chart2')
    if (ctx && ctx2) {
      const chart = new Chart(ctx as HTMLCanvasElement, {
        type: 'bar',
        data: {
          labels: exerciseStats?.sessionsByDay.map((entry) => entry.date),
          datasets: [
            {
              label: 'Anzahl aktive NutzerInnen pro Tag',
              data: exerciseStats?.sessionsByDay.map((entry) => entry.count),
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
      const chart2 = new Chart(ctx2 as HTMLCanvasElement, {
        type: 'bar',
        data: {
          labels: exerciseStats?.sessionsByDay.map((entry) => entry.date),
          datasets: [
            {
              label: 'Median aktive Zeit in Minuten',
              data: exerciseStats?.sessionsByDay.map(
                (entry) => entry.medianTime / 1000 / 60
              ),
              borderWidth: 1,
              backgroundColor: '#FFB1C1',
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
      return () => {
        chart.destroy()
        chart2.destroy()
      }
    }
  }, [exerciseStats?.sessionsByDay])

  return (
    <>
      {data.trashed && renderTrashedNotice()}
      {renderHeader()}
      {renderUserTools({ aboveContent: true })}
      <div className="min-h-1/2">
        <div className="mt-6 sm:mb-5">
          {data.description &&
            renderArticle(data.description, `taxdesc${data.id}`)}
        </div>

        {renderSubterms()}

        {renderExercises()}

        {isTopic && <TopicCategories data={data} full />}

        {isExerciseFolder && data.events && (
          <TopicCategories
            data={data}
            categories={[TopicCategoryType.events]}
            full
          />
        )}
      </div>
      {defaultLicense && <LicenseNotice data={defaultLicense} />}

      {/* Temporary donations banner trial */}
      {isExerciseFolder && !exerciseStats ? (
        <DonationsBanner
          id={data.id}
          entityData={{
            ...data,
            typename: UuidType.TaxonomyTerm,
            isUnrevised: false,
          }}
        />
      ) : null}

      {renderUserTools()}
    </>
  )

  function renderTrashedNotice() {
    return (
      <StaticInfoPanel icon={faTrash} doNotIndex>
        {strings.content.trashedNotice}
      </StaticInfoPanel>
    )
  }

  function renderHeader() {
    return (
      <>
        {exerciseStats && (
          <div className="mt-3">
            <span className="ml-3 rounded-full bg-fuchsia-300 px-2 py-1 font-bold">
              Auswertung
            </span>
            <br />
            <br />
            <Link
              href={
                '/___exercise_dashboard' +
                (exerciseStats.date.includes('to') ||
                exerciseStats.date.includes('all')
                  ? ''
                  : `/${exerciseStats.date}`)
              }
              className="ml-4"
            >
              zurück zur Übersicht
            </Link>
            <br />
            <br />
            <span className="ml-3">
              <strong>{exerciseStats.fullCount}</strong> NutzerInnen am{' '}
              {exerciseStats.date.replace(/-/g, '.')}
            </span>
            <br />
            <br />
            {exerciseStats.date !== 'all' && (
              <>
                {!exerciseStats.date.includes('to') ? (
                  <div className="my-5 ml-side">
                    Startzeiten: {exerciseStats.times.join(' - ')}
                  </div>
                ) : null}
                <div className="ml-side">
                  <RangePicker id={data.id.toString()} />
                </div>
              </>
            )}
          </div>
        )}
        {exerciseStats?.date.includes('all') ||
        exerciseStats?.date.includes('to') ? (
          <>
            <div className="my-12 w-full">
              <canvas id="chart"></canvas>
            </div>
            <div className="my-12 w-full">
              <canvas id="chart2"></canvas>
            </div>
            {matrix && (
              <div className="mb-2">
                Wenn jemand eine Aufgabe löst, zeigt die Zeile welche Aufgabe
                als nächstes gelöst wird. S = Start, E = Ende. Prozentwerte sind
                pro Zeile.
              </div>
            )}
            {matrix && (
              <table>
                <tr>
                  <th></th>
                  {[...things, 'E'].map((t) => (
                    <th key={t} className="border p-1">
                      {t === 'E' ? t : mapping[t]}
                    </th>
                  ))}
                </tr>
                {['S', ...things].map((r) => (
                  <tr key={r === 'S' ? r : mapping[r]}>
                    <td className="border p-1">
                      <strong>{r === 'S' ? r : mapping[r]}</strong>
                    </td>
                    {[...things, 'E'].map((t) => (
                      <td className="border p-1" key={t}>
                        {r === t ? (
                          <strong>-</strong>
                        ) : (
                          <>
                            {matrix[r][t]}
                            <br />
                            <span className="text-sm text-gray-700">
                              {(
                                (100 * matrix[r][t]) /
                                [...things, 'E'].reduce(
                                  (res, obj) => res + matrix[r][obj],
                                  0
                                )
                              ).toFixed(0)}
                              %
                            </span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </table>
            )}
          </>
        ) : null}
        <h1 className="serlo-h1 mb-10 mt-8" itemProp="name">
          {data.title}
          {isExerciseFolder && (
            <span title={strings.entities.exerciseFolder}>
              {' '}
              <FaIcon
                icon={faFile}
                className="align-baseline text-[1.43rem] text-brand-400"
              />{' '}
            </span>
          )}
        </h1>
      </>
    )
  }

  function renderSubterms() {
    return (
      data.subterms &&
      data.subterms.map((child) => (
        <Fragment key={child.title}>
          <SubTopic data={child} subid={child.id} id={data.id} />
        </Fragment>
      ))
    )
  }

  function renderExercises() {
    if (ab?.experiment === 'dreisatz_new_design') {
      // here is the place for new exercise view
      return (
        <>
          <NewFolderPrototype data={data} />
          <div className="h-24"></div>
        </>
      )
    }
    return (
      hasExercises &&
      data.exercisesContent &&
      data.exercisesContent.map((exercise, i) => {
        return (
          <Fragment key={i}>
            {renderArticle(
              [exercise],
              `tax${data.id}`,
              `ex${exercise.context.id}`
            )}
            {i === 1 && renderSurvey()}
          </Fragment>
        )
      })
    )
  }

  function renderSurvey() {
    if (!ab) return
    if (ab.topicId !== data.id) return
    return (
      <div className=" mx-auto my-12  max-w-[420px] rounded-xl bg-brand-50 p-4 text-center ">
        <strong>Wie gut gefällt dir dieser Aufgabenordner?</strong>
        <Rating
          className="mt-4 [&_svg]:inline"
          readonly={hasFeedback}
          onClick={(rate) => {
            //submit_event(`rate_quest_${core.ws.quest.id}_${rate}`, core)
            abSubmission({
              entityId: -1,
              experiment: ab.experiment,
              group: ab.group,
              result: rate.toString(),
              topicId: ab.topicId,
              type: 'rating',
            })
            setHasFeedback(true)
          }}
        />
        <div className={clsx('mt-3', hasFeedback ? '' : 'invisible')}>
          Danke für dein Feedback! &#10084;
        </div>
      </div>
    )
  }

  function renderUserTools(setting?: { aboveContent?: boolean }) {
    if (exerciseStats) return null
    return (
      <UserTools
        data={{ type: UuidType.TaxonomyTerm, ...data }}
        id={data.id}
        aboveContent={setting?.aboveContent}
      />
    )
  }

  function getDefaultLicense() {
    for (let i = 0; i < data.exercisesContent.length; i++) {
      const content = data.exercisesContent[i]

      if (content.type === 'exercise-group') {
        if (content.license?.isDefault) return content.license
      } else {
        if (content.task?.license?.isDefault) return content.task.license
        if (content.solution?.license?.isDefault)
          return content.solution.license
      }
    }
    //no part of collection has default license so don't show default notice.
    return undefined
  }
}

function RangePicker(props: { id: string }) {
  const exerciseStats = useExerciseFolderStats()

  const [start, setStart] = useState(
    (exerciseStats?.date.includes('to') && exerciseStats.date.split('to')[0]) ||
      new Date().toLocaleDateString('en-CA')
  )
  const [end, setEnd] = useState(
    (exerciseStats?.date.includes('to') && exerciseStats.date.split('to')[1]) ||
      new Date().toLocaleDateString('en-CA')
  )

  return (
    <div>
      <strong>Zeitraum auswählen:</strong>
      <br />
      Start (inkl.):{' '}
      <input
        type="date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <br />
      Ende (inkl.):{' '}
      <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
      <br />
      <Link
        href={`/___exercise_dashboard/details/${start}to${end}/${props.id}`}
        forceNoCSR
      >
        Anzeigen
      </Link>
    </div>
  )
}
