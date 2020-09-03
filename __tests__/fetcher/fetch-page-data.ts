import { rest } from 'msw'
import { setupServer } from 'msw/node'
import nodeFetch from 'node-fetch'

import {
  articleUuidMock,
  taxonomyTermUuidMock,
  appletUuidMock,
  eventUuidMock,
  courseUuidMock_alias,
  courseUuidMock_id,
  groupedExerciseUuidMock,
  exerciseGroupUuidMock,
  videoUuidMock,
  pageUuidMock,
  exerciseUuidMock,
  coursePageUuidMock,
} from './api_mockdata'
import { endpoint } from '@/api/endpoint'
import { ErrorPage, SingleEntityPage, TaxonomyPage } from '@/data-types'
import { fetchPageData } from '@/fetcher/fetch-page-data'
import { serloDomain } from '@/helper/serlo-domain'

const server = setupServer()

global.fetch = (nodeFetch as unknown) as typeof global.fetch

beforeAll(() => {
  server.listen()
})

beforeEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

function serverPostUuid(uuid: object) {
  server.use(
    rest.post(endpoint, (req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            uuid: uuid,
          },
        })
      )
    })
  )
}

describe('fetcher: check examples for all supported typenames', () => {
  test('typename: User', async () => {
    serverPostUuid({
      __typename: 'User',
      id: 1,
    })
    const response = (await fetchPageData('/de/1')) as ErrorPage
    expect(response.kind).toBe('error')
    expect(response.errorData.code).toBe(404)
  })

  test('typename: Page', async () => {
    serverPostUuid(pageUuidMock)
    const response = (await fetchPageData('/de/serlo')) as SingleEntityPage

    expect(response.secondaryNavigationData).toEqual([
      {
        title: 'So funktioniert die Lernplattform',
        url: '/81862',
        active: false,
      },
      {
        title: 'Wirkung',
        url: '/21406',
        active: false,
      },
    ])

    expect(response.metaData?.title).toBe('Über Serlo - lernen mit Serlo!')

    expect(response.metaData?.contentType).toBe('page')
    expect(response.metaData?.metaDescription).toBe(
      'Serlo.org bietet einfache Erklärungen, Kurse, Lernvideos, Übungen und Musterlösungen mit denen Schüler*innen und Studierende nach ihrem …'
    )
    expect(response.metaData?.metaImage).toBe(
      `https://de.${serloDomain}/_assets/img/meta/serlo.jpg`
    )
    assertCorrectHorizonDataFormat(response)

    expect(response.cacheKey).toBe('/de/serlo')
    expect(response.newsletterPopup).toBe(true)
    expect(response.kind).toBe('single-entity')
    expect(response.entityData.id).toBe(18922)
    expect(response.entityData.title).toBe('Über Serlo')
    expect(Array.isArray(response.entityData.content)).toBe(true)
  })

  test('typename: Article', async () => {
    serverPostUuid(articleUuidMock)

    const response = (await fetchPageData('/de/27801')) as SingleEntityPage

    expect(response.breadcrumbsData).toEqual([
      {
        label: 'Mathematik',
        url: '/mathe',
      },
      {
        label: 'Zahlen und Größen',
        url: '/mathe/zahlen-größen',
      },
      {
        label: 'Bruchrechnen und Dezimalzahlen',
        url: '/mathe/zahlen-größen/bruchrechnen-dezimalzahlen',
      },
    ])

    expect(response.metaData?.title).toBe(
      'Addition und Subtraktion von Dezimalbrüchen - lernen mit Serlo!'
    )
    expect(response.metaData?.contentType).toBe('article')
    expect(response.metaData?.metaDescription).toBe(
      'Um Dezimalbrüche zu addieren oder zu subtrahieren, geht man ähnlich vor wie bei der schriftlichen Addition bzw. Subtraktion.Addition Es …'
    )
    assertCorrectMetaImageLink(response)
    assertCorrectHorizonDataFormat(response)

    expect(response.cacheKey).toBe('/de/27801')
    expect(response.newsletterPopup).toBe(false)
    expect(response.kind).toBe('single-entity')
    expect(response.entityData.id).toBe(27801)
    expect(response.entityData.title).toBe(
      'Addition und Subtraktion von Dezimalbrüchen'
    )
    expect(Array.isArray(response.entityData.content)).toBe(true)
  })

  test('typename: CoursePage', async () => {
    serverPostUuid(coursePageUuidMock)

    const response = (await fetchPageData('/de/52020')) as SingleEntityPage

    expect(response.breadcrumbsData).toEqual([
      {
        label: 'Mathematik',
        url: '/mathe',
      },
      {
        label: 'Funktionen',
        url: '/mathe/funktionen',
      },
      {
        label: 'Wichtige Funktionstypen und ihre Eigenschaften',
        url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften',
      },
    ])

    expect(response.metaData?.title).toBe('Übersicht - lernen mit Serlo!')
    expect(response.metaData?.contentType).toBe('course-page')
    expect(response.metaData?.metaDescription).toBe(
      'Ziel dieses Kurses ist es, einen Überblick zur möglichen Vorgehensweise beim Finden von Nullstellen von Polynomfunktionen zu geben. Inhalte …'
    )
    assertCorrectMetaImageLink(response)
    assertCorrectHorizonDataFormat(response)

    expect(response.cacheKey).toBe('/de/52020')
    expect(response.newsletterPopup).toBe(false)
    expect(response.kind).toBe('single-entity')
    expect(response.entityData.id).toBe(52020)
    expect(response.entityData.title).toBe('Übersicht')
    expect(Array.isArray(response.entityData.content)).toBe(true)
  })

  test('typename: Video', async () => {
    serverPostUuid(videoUuidMock)

    const response = (await fetchPageData('/de/40744')) as SingleEntityPage

    expect(response.breadcrumbsData).toEqual([
      {
        label: 'Mathematik',
        url: '/mathe',
      },
      {
        label: 'Geometrie',
        url: '/mathe/geometrie',
      },
    ])

    expect(response.metaData?.title).toBe(
      'Winkel konstruieren - lernen mit Serlo!'
    )
    expect(response.metaData?.contentType).toBe('video')
    expect(response.metaData?.metaDescription).toBe(
      'Inhalt:Konstruktion der Winkel  und .Konstruktion der Winkel  und  mit detailliertem Konstruktionsplan.Konstruktion der Winkelhalbierenden …'
    )
    assertCorrectMetaImageLink(response)
    assertCorrectHorizonDataFormat(response)

    expect(response.cacheKey).toBe('/de/40744')
    expect(response.newsletterPopup).toBe(false)
    expect(response.kind).toBe('single-entity')
    expect(response.entityData.id).toBe(40744)
    expect(response.entityData.title).toBe('Winkel konstruieren')
    expect(Array.isArray(response.entityData.content)).toBe(true)
  })

  test('typename: Applet', async () => {
    serverPostUuid(appletUuidMock)

    const response = (await fetchPageData('/de/138114')) as SingleEntityPage

    expect(response.breadcrumbsData).toEqual([
      {
        label: 'Mathematik',
        url: '/mathe',
      },
      {
        label: 'Zahlen und Größen',
        url: '/mathe/zahlen-größen',
      },
      {
        label: 'Bruchrechnen und Dezimalzahlen',
        url: '/mathe/zahlen-größen/bruchrechnen-dezimalzahlen',
      },
    ])

    expect(response.metaData?.title).toBe(
      'Brüche Multiplizieren - lernen mit Serlo!'
    )
    expect(response.metaData?.contentType).toBe('applet')
    expect(response.metaData?.metaDescription).toBe(
      'Stelle mit den Schiebereglern die Brüche ein, die du multiplizieren möchtest. Die Bruchteile werden dann in den Rechtecken farbig markiert. …'
    )

    assertCorrectMetaImageLink(response)
    assertCorrectHorizonDataFormat(response)

    expect(response.cacheKey).toBe('/de/138114')
    expect(response.newsletterPopup).toBe(false)
    expect(response.kind).toBe('single-entity')
    expect(response.entityData.id).toBe(138114)
    expect(response.entityData.title).toBe('Brüche Multiplizieren')
    expect(Array.isArray(response.entityData.content)).toBe(true)
  })

  test('typename: TaxonomyTerm', async () => {
    serverPostUuid(taxonomyTermUuidMock)

    const response = (await fetchPageData('/de/5')) as TaxonomyPage

    expect(response.breadcrumbsData).toEqual([
      {
        label: 'Mathematik',
        url: '/mathe',
      },
    ])

    expect(response.secondaryNavigationData).toEqual([
      {
        title: 'Alle Themen',
        url: '/5',
        active: true,
      },
      {
        title: 'Gymnasium',
        url: '/16042',
        active: false,
      },
      {
        title: 'Realschule',
        url: '/16157',
        active: false,
      },
      {
        title: 'Mittelschule (Hauptschule)',
        url: '/16259',
        active: false,
      },
      {
        title: 'FOS & BOS',
        url: '/16033',
        active: false,
      },
      {
        title: 'Hochschule',
        url: '/44323',
        active: false,
      },
      {
        title: 'Prüfungen',
        url: '/83249',
        active: false,
      },
      {
        title: 'Inhalte bearbeiten und neue Inhalte hinzufügen',
        url: '/19880',
        active: false,
      },
    ])

    expect(response.metaData?.title).toBe('Mathe - Fach - lernen mit Serlo!')
    expect(response.metaData?.contentType).toBe('topic')

    assertCorrectMetaImageLink(response)

    expect(response.cacheKey).toBe('/de/5')
    expect(response.newsletterPopup).toBe(false)
    expect(response.kind).toBe('taxonomy')
    expect(response.taxonomyData.id).toBe(5)
    expect(response.taxonomyData.title).toBe('Mathe')
    expect(Array.isArray(response.taxonomyData.subterms)).toBe(true)
  })

  test('typename: Exercise', async () => {
    serverPostUuid(exerciseUuidMock)

    const response = (await fetchPageData('/de/54210')) as SingleEntityPage

    expect(response.breadcrumbsData).toEqual([
      {
        label: 'Mathematik',
        url: '/mathe',
      },
      {
        label: 'Funktionen',
        url: '/mathe/funktionen',
      },
      {
        ellipsis: true,
        label: '',
      },
      {
        label: 'Trigonometrische Funktionen',
        url:
          '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen',
      },
      {
        label:
          'Aufgaben zum Verschieben und Strecken trigonometrischer Funktionen',
        url:
          '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen/aufgaben-verschieben-strecken-trigonometrischer-funktionen',
      },
    ])

    expect(response.metaData?.title).toBe('Serlo')
    expect(response.metaData?.contentType).toBe('text-exercise')
    expect(response.metaData?.metaDescription).toBe(
      'Ordne folgendem Graphen die richtige Funktionsgleichung zu:Richtig! Der Nobelpreis ist ganz nah ;-)Leider falsch! Du denkst wahrscheinlich …'
    )

    assertCorrectMetaImageLink(response)
    assertCorrectHorizonDataFormat(response)

    expect(response.cacheKey).toBe('/de/54210')
    expect(response.newsletterPopup).toBe(false)
    expect(response.kind).toBe('single-entity')
    expect(response.entityData.id).toBe(54210)
    expect(Array.isArray(response.entityData.content)).toBe(true)
  })

  test('typename: ExerciseGroup', async () => {
    serverPostUuid(exerciseGroupUuidMock)

    const response = (await fetchPageData('/de/53205')) as SingleEntityPage

    expect(response.breadcrumbsData).toEqual([
      {
        label: 'Mathematik',
        url: '/mathe',
      },
      {
        label: 'Funktionen',
        url: '/mathe/funktionen',
      },
      {
        ellipsis: true,
        label: '',
      },
      {
        label: 'Trigonometrische Funktionen',
        url:
          '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen',
      },
      {
        label:
          'Aufgaben zum Verschieben und Strecken trigonometrischer Funktionen',
        url:
          '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen/aufgaben-verschieben-strecken-trigonometrischer-funktionen',
      },
    ])

    expect(response.metaData?.title).toBe('Serlo')
    expect(response.metaData?.contentType).toBe('exercisegroup')
    expect(response.metaData?.metaDescription).toBe(
      'Finde die passenden Gleichungen zu den Funktionsgraphen:Die Ruhelage der Funktion liegt auf der -Achse.Der Graph schneidet das Koordinatensystem …'
    )

    assertCorrectMetaImageLink(response)
    assertCorrectHorizonDataFormat(response)

    expect(response.cacheKey).toBe('/de/53205')
    expect(response.newsletterPopup).toBe(false)
    expect(response.kind).toBe('single-entity')
    expect(response.entityData.id).toBe(53205)
    expect(Array.isArray(response.entityData.content)).toBe(true)
  })

  test('typename: GroupedExercise', async () => {
    serverPostUuid(groupedExerciseUuidMock)

    const response = (await fetchPageData('/de/53209')) as SingleEntityPage

    expect(response.metaData?.title).toBe('Serlo')
    expect(response.metaData?.contentType).toBe('groupedexercise')
    expect(response.metaData?.metaDescription).toBe(
      'Die Ruhelage der Funktion liegt auf der -Achse.Der Graph schneidet das Koordinatensystem im Nullpunkt, also handelt es sich um eine Sinusfunktion …'
    )
    assertCorrectMetaImageLink(response)
    assertCorrectHorizonDataFormat(response)

    expect(response.cacheKey).toBe('/de/53209')
    expect(response.newsletterPopup).toBe(false)
    expect(response.kind).toBe('single-entity')
    expect(response.entityData.id).toBe(53209)
    expect(Array.isArray(response.entityData.content)).toBe(true)
  })

  test('typename: Course', async () => {
    server.use(
      rest.post(endpoint, (req, res, ctx) => {
        const body = req.body! as {
          query: string
          variables: { id?: number; alias?: { path: string; instance: 'de' } }
        }

        if (body.variables.id === 51979) {
          return res(
            ctx.json({
              data: {
                uuid: courseUuidMock_id,
              },
            })
          )
        }

        if (
          body.variables.alias?.path ===
          '/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/uebersicht'
        ) {
          return res(
            ctx.json({
              data: {
                uuid: courseUuidMock_alias,
              },
            })
          )
        }

        return res(ctx.status(500))
      })
    )

    const response = (await fetchPageData('/de/51979')) as SingleEntityPage

    expect(response.breadcrumbsData).toEqual([
      {
        label: 'Mathematik',
        url: '/mathe',
      },
      {
        label: 'Funktionen',
        url: '/mathe/funktionen',
      },
      {
        label: 'Wichtige Funktionstypen und ihre Eigenschaften',
        url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften',
      },
    ])

    expect(response.metaData?.title).toBe('Übersicht - lernen mit Serlo!')
    expect(response.metaData?.contentType).toBe('course-page')
    expect(response.metaData?.metaDescription).toBe(
      'Ziel dieses Kurses ist es, einen Überblick zur möglichen Vorgehensweise beim Finden von Nullstellen von Polynomfunktionen zu geben. Inhalte …'
    )
    expect(response.metaData?.metaImage).toBe(
      `https://de.${serloDomain}/_assets/img/meta/mathematik.jpg`
    )

    assertCorrectHorizonDataFormat(response)

    expect(response.cacheKey).toBe(
      '/de/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/uebersicht'
    )
    expect(response.newsletterPopup).toBe(false)
    expect(response.kind).toBe('single-entity')
    expect(response.entityData.id).toBe(52020)
    expect(response.entityData.title).toBe('Übersicht')
    expect(Array.isArray(response.entityData.content)).toBe(true)
  })

  test('typename: Event', async () => {
    serverPostUuid(eventUuidMock)
    const response = (await fetchPageData('/de/145590')) as SingleEntityPage

    expect(response.metaData?.title).toBe('Serlo')
    expect(response.metaData?.contentType).toBe('event')
    expect(response.metaData?.metaDescription).toBe(
      '31.08.20 - 25.09.2020, Mo-Fr Digital Learning Academy in MünchenonlineGemeinsame Arbeit an Lerninhalten, Workshops zu verschiedenen Themen …'
    )

    expect(response.metaData?.metaImage).toBe(
      `https://de.${serloDomain}/_assets/img/meta/serlo.jpg`
    )
    assertCorrectHorizonDataFormat(response)

    expect(response.cacheKey).toBe('/de/145590')
    expect(response.newsletterPopup).toBe(false)
    expect(response.kind).toBe('single-entity')
    expect(Array.isArray(response.entityData.content)).toBe(true)
  })
})

function assertCorrectHorizonDataFormat(pageData: SingleEntityPage) {
  expect(
    pageData.horizonData?.every((entry) => {
      return (
        typeof entry.title === 'string' &&
        typeof entry.imageUrl === 'string' &&
        typeof entry.text === 'string' &&
        typeof entry.url === 'string' &&
        // FIXME: type not correct
        // @ts-expect-error
        typeof entry.frequency === 'number'
      )
    })
  ).toBe(true)
}

function assertCorrectMetaImageLink(pageData: SingleEntityPage | TaxonomyPage) {
  expect(pageData.metaData?.metaImage).toBe(
    `https://de.${serloDomain}/_assets/img/meta/mathematik.jpg`
  )
}
