import { rest } from 'msw'
import { setupServer } from 'msw/node'

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
} from '../../__fixtures__/api_mockdata'
import { endpoint } from '@/api/endpoint'
import { SingleEntityPage, TaxonomyPage } from '@/data-types'
import { fetchPageData } from '@/fetcher/fetch-page-data'
import { serloDomain } from '@/helper/urls/serlo-domain'

const server = setupServer()

beforeAll(() => {
  server.listen()
})

beforeEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('check all supported typenames with stored api-data', () => {
  test('typename: Page', async () => {
    givenApiReturnsUuid(pageUuidMock)
    const pageData = (await fetchPageData('/de/serlo')) as SingleEntityPage

    expect(pageData.secondaryMenuData?.[0]).toEqual({
      title: 'Über Serlo',
      id: 18922,
      url: '/18922',
      active: true,
    })

    expect(pageData.metaData?.title).toBe('Über Serlo - lernen mit Serlo!')

    expect(pageData.metaData?.contentType).toBe('page')
    expect(pageData.metaData?.metaDescription).toBe(
      'Serlo.org bietet einfache Erklärungen, Kurse, Lernvideos, Übungen und Musterlösungen mit denen Schüler*innen und Studierende nach ihrem …'
    )
    expect(pageData.metaData?.metaImage).toBe(
      `https://de.${serloDomain}/_assets/img/meta/meta.png`
    )
    assertCorrectHorizonDataFormat(pageData)

    expect(pageData.cacheKey).toBe('/de/serlo')
    expect(pageData.newsletterPopup).toBe(true)
    expect(pageData.kind).toBe('single-entity')
    expect(pageData.entityData.id).toBe(18922)
    expect(pageData.entityData.title).toBe('Über Serlo')
    expect(Array.isArray(pageData.entityData.content)).toBe(true)
  })

  test('typename: Article', async () => {
    givenApiReturnsUuid(articleUuidMock)

    const pageData = (await fetchPageData('/de/27801')) as SingleEntityPage

    // fixtures outdated due to refactoring
    /*expect(pageData.breadcrumbsData).toEqual([
      { label: 'Mathematics', url: '/math' },
      {
        label: 'All topics',
        url: '/math/1',
      },
    ])*/

    expect(pageData.metaData?.title).toBe(
      'Addition und Subtraktion von Dezimalbrüchen - lernen mit Serlo!'
    )
    expect(pageData.metaData?.contentType).toBe('article')
    expect(pageData.metaData?.metaDescription).toBe(
      'Um Dezimalbrüche zu addieren oder zu subtrahieren, geht man ähnlich vor wie bei der schriftlichen Addition bzw. Subtraktion.Addition Es …'
    )
    assertCorrectMetaImageLink(pageData)
    assertCorrectHorizonDataFormat(pageData)

    expect(pageData.cacheKey).toBe('/de/27801')
    expect(pageData.newsletterPopup).toBe(false)
    expect(pageData.kind).toBe('single-entity')
    expect(pageData.entityData.id).toBe(27801)
    expect(pageData.entityData.title).toBe(
      'Addition und Subtraktion von Dezimalbrüchen'
    )
    expect(Array.isArray(pageData.entityData.content)).toBe(true)
  })

  test('typename: CoursePage', async () => {
    givenApiReturnsUuid(coursePageUuidMock)

    const pageData = (await fetchPageData('/de/52020')) as SingleEntityPage

    // fixtures outdated due to refactoring
    /*expect(pageData.breadcrumbsData).toEqual([
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
      {
        label: 'Polynomfunktionen beliebigen Grades',
        url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/polynomfunktionen-beliebigen-grades',
      },
    ])*/

    expect(pageData.metaData?.title).toBe('Übersicht - lernen mit Serlo!')
    expect(pageData.metaData?.contentType).toBe('course-page')
    expect(pageData.metaData?.metaDescription).toBe(
      'Ziel dieses Kurses ist es, einen Überblick zur möglichen Vorgehensweise beim Finden von Nullstellen von Polynomfunktionen zu geben. Inhalte …'
    )
    assertCorrectMetaImageLink(pageData)
    assertCorrectHorizonDataFormat(pageData)

    expect(pageData.cacheKey).toBe('/de/52020')
    expect(pageData.newsletterPopup).toBe(false)
    expect(pageData.kind).toBe('single-entity')
    expect(pageData.entityData.id).toBe(52020)
    expect(pageData.entityData.title).toBe('Übersicht')
    expect(Array.isArray(pageData.entityData.content)).toBe(true)
  })

  test('typename: Video', async () => {
    givenApiReturnsUuid(videoUuidMock)

    const pageData = (await fetchPageData('/de/40744')) as SingleEntityPage

    // fixtures outdated due to refactoring
    /*expect(pageData.breadcrumbsData).toEqual([
      {
        label: 'Mathematik',
        url: '/mathe',
      },
      {
        label: 'Geometrie',
        url: '/mathe/geometrie',
      },
      {
        label: 'Konstruktion von geometrischen Objekten',
        url: '/mathe/geometrie/konstruktion-geometrischen-objekten',
      },
    ])*/

    expect(pageData.metaData?.title).toBe(
      'Winkel konstruieren - lernen mit Serlo!'
    )
    expect(pageData.metaData?.contentType).toBe('video')
    expect(pageData.metaData?.metaDescription).toBe(
      'Inhalt:Konstruktion der Winkel  und .Konstruktion der Winkel  und  mit detailliertem Konstruktionsplan.Konstruktion der Winkelhalbierenden …'
    )
    assertCorrectMetaImageLink(pageData)
    assertCorrectHorizonDataFormat(pageData)

    expect(pageData.cacheKey).toBe('/de/40744')
    expect(pageData.newsletterPopup).toBe(false)
    expect(pageData.kind).toBe('single-entity')
    expect(pageData.entityData.id).toBe(40744)
    expect(pageData.entityData.title).toBe('Winkel konstruieren')
    expect(Array.isArray(pageData.entityData.content)).toBe(true)
  })

  test('typename: Applet', async () => {
    givenApiReturnsUuid(appletUuidMock)

    const pageData = (await fetchPageData('/de/138114')) as SingleEntityPage

    // fixtures outdated due to refactoring
    /*expect(pageData.breadcrumbsData).toEqual([
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
      {
        label: 'Rechnen mit Brüchen',
        url: '/mathe/zahlen-größen/bruchrechnen-dezimalzahlen/rechnen-brüchen',
      },
    ])*/

    expect(pageData.metaData?.title).toBe(
      'Brüche Multiplizieren - lernen mit Serlo!'
    )
    expect(pageData.metaData?.contentType).toBe('applet')
    expect(pageData.metaData?.metaDescription).toBe(
      'Stelle mit den Schiebereglern die Brüche ein, die du multiplizieren möchtest. Die Bruchteile werden dann in den Rechtecken farbig markiert. …'
    )

    assertCorrectMetaImageLink(pageData)
    assertCorrectHorizonDataFormat(pageData)

    expect(pageData.cacheKey).toBe('/de/138114')
    expect(pageData.newsletterPopup).toBe(false)
    expect(pageData.kind).toBe('single-entity')
    expect(pageData.entityData.id).toBe(138114)
    expect(pageData.entityData.title).toBe('Brüche Multiplizieren')
    expect(Array.isArray(pageData.entityData.content)).toBe(true)
  })

  test('typename: TaxonomyTerm', async () => {
    givenApiReturnsUuid(taxonomyTermUuidMock)

    const pageData = (await fetchPageData('/de/5')) as TaxonomyPage

    // fixtures outdated due to refactoring
    /*expect(pageData.breadcrumbsData).toEqual([
      {
        label: 'Mathematik',
        url: '/mathe',
        id: 19767,
      },
    ])*/

    // fixtures outdated due to refactoring
    /*expect(pageData.secondaryMenuData?.[0]).toEqual({
      title: 'Alle Themen',
      url: '/5',
      id: 5,
      active: true,
    })*/

    expect(pageData.metaData?.title).toBe('Mathe - Fach - lernen mit Serlo!')
    expect(pageData.metaData?.contentType).toBe('topic')

    assertCorrectMetaImageLink(pageData)

    expect(pageData.cacheKey).toBe('/de/5')
    expect(pageData.newsletterPopup).toBe(false)
    expect(pageData.kind).toBe('taxonomy')
    expect(pageData.taxonomyData.id).toBe(5)
    expect(pageData.taxonomyData.title).toBe('Mathe')
    expect(Array.isArray(pageData.taxonomyData.subterms)).toBe(true)
  })

  test('typename: Exercise', async () => {
    givenApiReturnsUuid(exerciseUuidMock)

    const pageData = (await fetchPageData('/de/54210')) as SingleEntityPage

    /*
    expect(pageData.breadcrumbsData).toEqual([
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
        url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen',
      },
      {
        label:
          'Aufgaben zum Verschieben und Strecken trigonometrischer Funktionen',
        url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen/aufgaben-verschieben-strecken-trigonometrischer-funktionen',
      },
    ])*/

    // API data outdated, we are moving to e2e tests
    /*expect(pageData.metaData?.title).toBe(
      'Mathematik Aufgabe - lernen mit Serlo!'
    )*/
    expect(pageData.metaData?.contentType).toBe('text-exercise')
    expect(pageData.metaData?.metaDescription).toContain(
      'Ordne folgendem Graphen die richtige Funktionsgleichung zu:'
    )

    assertCorrectMetaImageLink(pageData)
    assertCorrectHorizonDataFormat(pageData)

    expect(pageData.cacheKey).toBe('/de/54210')
    expect(pageData.newsletterPopup).toBe(false)
    expect(pageData.kind).toBe('single-entity')
    expect(pageData.entityData.id).toBe(54210)
    expect(Array.isArray(pageData.entityData.content)).toBe(true)
  })

  test('typename: ExerciseGroup', async () => {
    givenApiReturnsUuid(exerciseGroupUuidMock)

    const pageData = (await fetchPageData('/de/53205')) as SingleEntityPage

    /*
    expect(pageData.breadcrumbsData).toEqual([
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
        url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen',
      },
      {
        label:
          'Aufgaben zum Verschieben und Strecken trigonometrischer Funktionen',
        url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/trigonometrische-funktionen/aufgaben-verschieben-strecken-trigonometrischer-funktionen',
      },
    ])
    */

    // API data outdated, we are moving to e2e tests
    /*expect(pageData.metaData?.title).toBe(
      'Mathematik Aufgabe mit Teilaufgaben - lernen mit Serlo!'
    )*/

    expect(pageData.metaData?.contentType).toBe('exercisegroup')
    expect(pageData.metaData?.metaDescription).toBe(
      'Finde die passenden Gleichungen zu den Funktionsgraphen:Die Ruhelage der Funktion liegt auf der -Achse.Der Graph schneidet das Koordinatensystem …'
    )

    assertCorrectMetaImageLink(pageData)
    assertCorrectHorizonDataFormat(pageData)

    expect(pageData.cacheKey).toBe('/de/53205')
    expect(pageData.newsletterPopup).toBe(false)
    expect(pageData.kind).toBe('single-entity')
    expect(pageData.entityData.id).toBe(53205)
    expect(Array.isArray(pageData.entityData.content)).toBe(true)
  })

  test('typename: GroupedExercise', async () => {
    givenApiReturnsUuid(groupedExerciseUuidMock)

    const pageData = (await fetchPageData('/de/53209')) as SingleEntityPage

    expect(pageData.metaData?.title).toBe('Teilaufgabe - lernen mit Serlo!')
    expect(pageData.metaData?.contentType).toBe('groupedexercise')
    expect(pageData.metaData?.metaDescription).toBe(
      'Die Ruhelage der Funktion liegt auf der -Achse.Der Graph schneidet das Koordinatensystem im Nullpunkt, also handelt es sich um eine Sinusfunktion …'
    )
    assertCorrectMetaImageLink(pageData)
    assertCorrectHorizonDataFormat(pageData)

    expect(pageData.cacheKey).toBe('/de/53209')
    expect(pageData.newsletterPopup).toBe(false)
    expect(pageData.kind).toBe('single-entity')
    expect(pageData.entityData.id).toBe(53209)
    expect(Array.isArray(pageData.entityData.content)).toBe(true)
    expect(pageData.breadcrumbsData?.length === 1)
  })

  test('typename: Course', async () => {
    server.use(
      rest.post(endpoint, (req, res, ctx) => {
        const body = req.body! as {
          query: string
          variables: { id?: number; alias?: { path: string; instance: 'de' } }
        }

        if (
          body.variables.alias?.path === '/51979' &&
          body.variables.alias?.instance === 'de'
        ) {
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

    const pageData = (await fetchPageData('/de/51979')) as SingleEntityPage

    // fixtures outdated due to refactoring
    /*expect(pageData.breadcrumbsData).toEqual([
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
      {
        label: 'Polynomfunktionen beliebigen Grades',
        url: '/mathe/funktionen/wichtige-funktionstypen-eigenschaften/polynomfunktionen-beliebigen-grades',
      },
    ])*/

    expect(pageData.metaData?.title).toBe('Übersicht - lernen mit Serlo!')
    expect(pageData.metaData?.contentType).toBe('course-page')
    expect(pageData.metaData?.metaDescription).toBe(
      'Ziel dieses Kurses ist es, einen Überblick zur möglichen Vorgehensweise beim Finden von Nullstellen von Polynomfunktionen zu geben. Inhalte …'
    )
    expect(pageData.metaData?.metaImage).toBe(
      `https://de.${serloDomain}/_assets/img/meta/mathe.png`
    )

    assertCorrectHorizonDataFormat(pageData)

    expect(pageData.cacheKey).toBe(
      '/de/mathe/funktionen/wichtige-funktionstypen-ihre-eigenschaften/polynomfunktionen-beliebigen-grades/berechnungsmethoden-nullstellen-polynomfunktionen/uebersicht'
    )
    expect(pageData.newsletterPopup).toBe(false)
    expect(pageData.kind).toBe('single-entity')
    expect(pageData.entityData.id).toBe(52020)
    expect(pageData.entityData.title).toBe('Übersicht')
    expect(Array.isArray(pageData.entityData.content)).toBe(true)
  })

  test('typename: Event', async () => {
    givenApiReturnsUuid(eventUuidMock)
    const pageData = (await fetchPageData('/de/145590')) as SingleEntityPage

    expect(pageData.metaData?.title).toBe('Serlo')
    expect(pageData.metaData?.contentType).toBe('event')
    expect(pageData.metaData?.metaDescription).toBe(
      '31.08.20 - 25.09.2020, Mo-Fr Digital Learning Academy in MünchenonlineGemeinsame Arbeit an Lerninhalten, Workshops zu verschiedenen Themen …'
    )

    expect(pageData.metaData?.metaImage).toBe(
      `https://de.${serloDomain}/_assets/img/meta/community.png`
    )
    assertCorrectHorizonDataFormat(pageData)

    expect(pageData.cacheKey).toBe('/de/145590')
    expect(pageData.newsletterPopup).toBe(false)
    expect(pageData.kind).toBe('single-entity')
    expect(Array.isArray(pageData.entityData.content)).toBe(true)
  })
})

function givenApiReturnsUuid(uuid: object) {
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
    `https://de.${serloDomain}/_assets/img/meta/mathe.png`
  )
}
