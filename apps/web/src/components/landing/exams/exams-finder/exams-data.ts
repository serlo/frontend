// TODO: persists school choice in url or sessionstorage

export const regions = {
  bayern: {
    title: 'Bayern',
    code: 'BY',
  },
  niedersachsen: {
    title: 'Niedersachsen',
    code: 'NI',
  },
} as const

const schoolTypes = [
  'mittelschule',
  'realschule',
  'gymnasium',
  'fos-bos',
] as const

export type SupportedRegion = keyof typeof regions
export const regionKeys = Object.keys(regions) as SupportedRegion[]
export type SchoolType = (typeof schoolTypes)[number]

export const schoolTypesWithExamsByRegion: Record<
  SupportedRegion,
  Record<
    SchoolType,
    {
      title: string
      exams: {
        title: string
        url: string
        years: { title: string; url: string }[]
      }[]
    }
  >
> = {
  bayern: {
    mittelschule: {
      title: 'Mittelschule',
      exams: [
        {
          title: 'Quali',
          url: '/mathe/75678/quali-abschlusspr%C3%BCfungen-mit-l%C3%B6sung',
          years: [
            { title: '2023', url: '/mathe/290075/2023' },
            { title: '2022', url: '/mathe/261569/2022' },
            { title: '2021', url: '/mathe/226922/2021' },
            { title: '2020', url: '/mathe/178169/2020' },
          ],
        },
        {
          title: 'Mittlerer Schulabschluss',
          url: '/mathe/247427/mittlerer-schulabschluss-an-der-mittelschule',
          years: [
            { title: '2023', url: '/mathe/293322/2023' },
            { title: '2022', url: '/mathe/261415/2022' },
            { title: '2021', url: '/mathe/247428/2021' },
            { title: '2020', url: '/mathe/247429/2020' },
          ],
        },
      ],
    },
    realschule: {
      title: 'Realschule',
      exams: [
        {
          title: 'Abschluss Zweig I',
          url: '/mathe/75049/abschlusspr%C3%BCfungen-mit-l%C3%B6sung-zweig-i',
          years: [
            { title: '2023', url: '/mathe/288940/2023' },
            { title: '2022', url: '/mathe/272196/2022' },
            { title: '2021', url: '/mathe/232930/2021' },
            { title: '2020', url: '/mathe/180388/2020' },
            { title: '2019', url: '/mathe/146968/2019' },
            { title: '2018', url: '/mathe/146967/2018' },
            { title: '2017', url: '/mathe/95100/2017' },
            { title: '2016', url: '/mathe/75548/2016' },
            { title: '2015', url: '/mathe/75050/2015' },
          ],
        },
        {
          title: 'Abschluss Zweig II & III',
          url: '/mathe/76750/abschlusspr%C3%BCfungen-mit-l%C3%B6sungen-zweig-ii-und-iii',
          years: [
            { title: '2023', url: '/mathe/288945/2023' },
            { title: '2022', url: '/mathe/272224/2022' },
            { title: '2021', url: '/mathe/234076/2021' },
            { title: '2020', url: '/mathe/180403/2020' },
            { title: '2019', url: '/mathe/146981/2019' },
            { title: '2018', url: '/mathe/139217/2018' },
            { title: '2017', url: '/mathe/94502/2017' },
            { title: '2016', url: '/mathe/76714/2016' },
            { title: '2015', url: '/mathe/76717/2015' },
          ],
        },
      ],
    },
    gymnasium: {
      title: 'Gymnasium',
      exams: [
        {
          title: 'Abitur',
          url: '/mathe/20852/abiturpr%C3%BCfungen-mit-l%C3%B6sung',
          years: [
            {
              title: '2023',
              url: '/mathe/274629/mathematik-abitur-bayern-2023',
            },
            {
              title: '2022',
              url: '/mathe/248460/mathematik-abitur-bayern-2022',
            },
            {
              title: '2021',
              url: '/mathe/231486/mathematik-abitur-bayern-2021',
            },
            {
              title: '2020',
              url: '/mathe/179851/mathematik-abitur-bayern-2020',
            },
            {
              title: '2019',
              url: '/mathe/137533/mathematik-abitur-bayern-2019',
            },
            {
              title: '2018',
              url: '/mathe/106725/mathematik-abitur-bayern-2018',
            },
            {
              title: '2017',
              url: '/mathe/76975/mathematik-abitur-bayern-2017',
            },
            {
              title: '2016',
              url: '/mathe/70296/mathematik-abitur-bayern-2016',
            },
            {
              title: '2015',
              url: '/mathe/70295/mathematik-abitur-bayern-2015',
            },
            {
              title: '2015',
              url: '/mathe/70304/mathematik-abitur-bayern-2014',
            },
            {
              title: '2015',
              url: '/mathe/21007/mathematik-abitur-bayern-2013',
            },
          ],
        },
      ],
    },
    'fos-bos': {
      title: 'FOS & BOS',
      exams: [
        {
          title: 'Fachhochschulreife',
          url: '/mathe/91252/fachhochschulreife',
          years: [
            { title: '2022', url: '/mathe/262133/2022' },
            { title: '2021', url: '/mathe/253867/2021' },
            { title: '2020', url: '/mathe/201338/2020' },
            { title: '2019', url: '/mathe/201337/2019' },
            { title: '2018', url: '/mathe/186715/2018' },
            { title: '2017', url: '/mathe/91264/2017' },
            { title: '2016', url: '/mathe/91265/2016' },
          ],
        },
        {
          title: 'Fachgebundene Hochschulreife',
          url: '/mathe/91253/fachgebundene-hochschulreife',
          years: [
            { title: '2020', url: '/mathe/201339/2020' },
            { title: '2019', url: '/mathe/201340/2019' },
            { title: '2018', url: '/mathe/201341/2018' },
            { title: '2017', url: '/mathe/91266/2017' },
            { title: '2016', url: '/mathe/91267/2016' },
          ],
        },
      ],
    },
  },
  //@ts-expect-error not sure how to fix the type here,
  niedersachsen: {
    mittelschule: {
      title: 'Gesamtschule',
      exams: [
        {
          title: 'IGS G',
          url: '/mathe/300763/igs-g',
          years: [
            { title: '2023', url: '/mathe/300785/2023' },
            { title: '2022', url: '/mathe/300786/2022' },
            { title: '2021', url: '/mathe/300787/2021' },
          ],
        },
        {
          title: 'IGS E',
          url: '/mathe/300762/igs-e',
          years: [
            { title: '2023', url: '/mathe/300764/2023' },
            { title: '2022', url: '/mathe/300765/2022' },
            { title: '2021', url: '/mathe/300766/2021' },
          ],
        },
      ],
    },
    realschule: {
      title: 'Realschule',
      exams: [
        {
          title: 'Abschlussarbeit Realschule',
          url: '/mathe/297604/abschlussprüfungen-mit-lösungen',
          years: [
            { title: '2023', url: '/mathe/300698/2023' },
            { title: '2022', url: '/mathe/300714/2022' },
            { title: '2021', url: '/mathe/300718/2021' },
          ],
        },
      ],
    },
    gymnasium: {
      title: 'Gymnasium',
      exams: [
        {
          title: 'Abitur (gA)',
          url: '/mathe/300778/abiturprüfungen-ga-mit-lösungen',
          years: [
            { title: '2023', url: '/mathe/300804/2023' },
            { title: '2022', url: '/mathe/300805/2022' },
            { title: '2021', url: '/mathe/300806/2021' },
          ],
        },
        {
          title: 'Abitur (eA)',
          url: '/mathe/297606/abiturprüfungen-ea-mit-lösungen',
          years: [
            { title: '2023', url: '/mathe/300750/2023' },
            { title: '2022', url: '/mathe/300754/2022' },
            { title: '2021', url: '/mathe/300755/2021' },
          ],
        },
      ],
    },
  },
} as const

export const examsByRegionAndType: Record<
  SupportedRegion,
  Record<
    string,
    {
      title: string
      url?: string
      options?: { title: string; url: string }[]
    }
  >
> = {
  bayern: {
    quali: {
      title: 'Quali',
      url: '/mathe/75678/quali-abschlusspr%C3%BCfungen-mit-l%C3%B6sung',
    },
    msa: {
      title: 'MSA',
      url: '/mathe/247427/mittlerer-schulabschluss-an-der-mittelschule',
    },
    realschule: {
      title: 'Realschulabschluss',
      options: [
        {
          title: 'Abschluss Zweig I',
          url: '/mathe/75049/abschlusspr%C3%BCfungen-mit-l%C3%B6sung-zweig-i',
        },
        {
          title: 'Abschluss Zweig II & III',
          url: '/mathe/76750/abschlusspr%C3%BCfungen-mit-l%C3%B6sungen-zweig-ii-und-iii',
        },
      ],
    },
    abitur: {
      title: 'Abitur',
      url: '/mathe/20852/abiturpr%C3%BCfungen-mit-l%C3%B6sung',
    },
    hochschulreife: {
      title: 'Hochschulreife (FOS&BOS)',
      options: [
        {
          title: 'Fachhochschulreife',
          url: '/mathe/91252/fachhochschulreife',
        },
        {
          title: 'Fachgebundene Hochschulreife',
          url: '/mathe/91253/fachgebundene-hochschulreife',
        },
      ],
    },
  },
  niedersachsen: {
    igsG: {
      title: 'IGS G',
      url: '/mathe/300763/igs-g',
    },
    igsE: {
      title: 'IGS E',
      url: '/mathe/300762/igs-e',
    },
    realschule: {
      title: 'Realschulabschluss',
      url: '/mathe/297604/abschlussprüfungen-mit-lösungen',
    },
    abiturGA: {
      title: 'Abitur (gA)',
      url: '/mathe/300778/abiturprüfungen-ga-mit-lösungen',
    },
    abiturEA: {
      title: 'Abitur (eA)',
      url: '/mathe/297606/abiturprüfungen-ea-mit-lösungen',
    },
  },
}
