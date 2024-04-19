export const deRegions = {
  bayern: {
    title: 'Bayern',
    code: 'BY',
  },
  berlin: {
    title: 'Berlin',
    code: 'BE',
  },
  brandenburg: {
    title: 'Brandenburg',
    code: 'BB',
  },
  niedersachsen: {
    title: 'Niedersachsen',
    code: 'NI',
  },
  nrw: {
    title: 'Nordrhein-Westfalen',
    code: 'NW',
  },
} as const
export type SupportedRegion = keyof typeof deRegions
export const regionKeys = Object.keys(deRegions) as SupportedRegion[]

export const schoolTypes = {
  mittelschule: 'Mittelschule',
  realschule: 'Realschule',
  gymnasium: 'Gymnasium',
  'fos-bos': 'FOS & BOS',
  gesamtschule: 'Gesamtschule',
  oberschule: 'Oberschule',
  alle: 'Alle Schultypen',
} as const
export type SchoolType = keyof typeof schoolTypes

export interface Exam {
  id?: number
  displayTitle: string
  options?: { displayTitle: string; id: number }[]
  schoolType: keyof typeof schoolTypes
}

export type ExamsFolders = Record<string, Exam>

export const examsFoldersBY: ExamsFolders = {
  quali: {
    id: 75678,
    displayTitle: 'Quali',
    schoolType: 'mittelschule',
  },
  msa: {
    id: 247427,
    displayTitle: 'Mittlerer Schulabschluss (MSA)',
    schoolType: 'mittelschule',
  },
  realschule: {
    displayTitle: 'Realschulabschluss',
    schoolType: 'realschule',
    options: [
      {
        id: 75049,
        displayTitle: 'Abschluss Zweig I',
      },
      {
        id: 76750,
        displayTitle: 'Abschluss Zweig II & III',
      },
    ],
  },
  abitur: {
    id: 20852,
    displayTitle: 'Abitur',
    schoolType: 'gymnasium',
  },
  hochschulreife: {
    displayTitle: 'Hochschulreife (FOS&BOS)',
    schoolType: 'fos-bos',
    options: [
      {
        id: 91252,
        displayTitle: 'Fachhochschulreife',
      },
      {
        id: 91253,
        displayTitle: 'Fachgebundene Hochschulreife',
      },
    ],
  },
}

export const examsFoldersNI: ExamsFolders = {
  igsG: {
    id: 302433,
    displayTitle: 'IGS G',
    schoolType: 'gesamtschule',
  },
  igsE: {
    id: 302434,
    displayTitle: 'IGS E',
    schoolType: 'gesamtschule',
  },
  realschule: {
    id: 297604,
    displayTitle: 'Realschulabschluss',
    schoolType: 'realschule',
  },
  abiturGA: {
    id: 300778,
    displayTitle: 'Abitur (gA)',
    schoolType: 'gymnasium',
  },
  abiturEA: {
    id: 297606,
    displayTitle: 'Abitur (eA)',
    schoolType: 'gymnasium',
  },
}

export const examsFoldersNW: ExamsFolders = {
  'zentrale-pruefung': {
    id: 305760,
    displayTitle: 'Zentrale Prüfungen (ZAP)',
    schoolType: 'alle',
  },
}

export const examsFoldersBE: ExamsFolders = {
  msa: {
    id: 305819,
    displayTitle: 'Mittlere Schulabschluss (MSA)',
    schoolType: 'alle',
  },
  ebbr: {
    id: 305819,
    displayTitle: 'Erweiterte Berufsbildungsreife (eBBR)',
    schoolType: 'alle',
  },
}

export const examsFoldersBB: ExamsFolders = {
  oberschule: {
    id: 305843,
    displayTitle: 'EBR & FOR (Oberschule)',
    schoolType: 'oberschule',
  },
  gesamtschule: {
    id: 305843,
    displayTitle: 'Grund- & Erweiterungskurs (Gesamtschule)',
    schoolType: 'gesamtschule',
  },
}

export const mathExamTaxDataStatic: Record<SupportedRegion, ExamsFolders> = {
  bayern: examsFoldersBY,
  berlin: examsFoldersBE,
  brandenburg: examsFoldersBB,
  niedersachsen: examsFoldersNI,
  nrw: examsFoldersNW,
}

function extractIds(folders: ExamsFolders) {
  return Object.values(folders).flatMap(({ id, options }) => {
    return options ? options.map(({ id }) => id) : id!
  })
}

// "de" folder ids that include final math exams
export const mathExamsTaxIds: Record<SupportedRegion, number[]> = {
  bayern: extractIds(examsFoldersBY),
  berlin: extractIds(examsFoldersBE),
  brandenburg: extractIds(examsFoldersBB),
  niedersachsen: extractIds(examsFoldersNI),
  nrw: extractIds(examsFoldersNW),
}

export const allMathExamTaxIds = Object.values(mathExamsTaxIds).flatMap(
  (entries) => entries
)

export const schoolTaxonomies = [
  201593, 16259, 16157, 16042, 97943, 97944, 97945, 97946, 97947, 16376, 16033,
]

export const extraMetaTags = {
  297606: {
    title: 'Abiturprüfungen Mathe eA mit Lösungen',
    metaDescription:
      'Mathe lernen fürs Abitur mit Serlo. Mathe Abi Aufgaben erhöhtes Anforderungsnvieau mit Lösungen. Du schaffst das!',
  },
  300778: {
    title: 'Abiturprüfungen Mathe gA mit Lösungen',
    metaDescription:
      'Mathe lernen fürs Abitur mit Serlo. Mathe Abi Aufgaben grundlegendes Anforderungsnvieau mit Lösungen. Du schaffst das!',
  },
  297604: {
    title: 'Mathe Prüfungsaufgaben mit Lösungen | Realschule',
    metaDescription:
      'Mathe lernen für die Realschul- Abschlussprüfungen mit Original- Aufgaben und Lösungshilfe. Mit Serlo schaffst du das!',
  },
  302433: {
    title: 'IGS-Prüfungen Mathe G-Kurs mit Lösungen',
    metaDescription:
      'Mathe lernen mit Original Aufgaben und Lösungen für die Abschlussprüfungen an der Gesamtschule. Mit Serlo schaffst du das!',
  },
  20852: {
    title: 'Mathe Abiturprüfungen mit Lösung',
    metaDescription:
      'Die beste Vorbereitung fürs Mathe Abi. Mathe-Aufgaben fürs Abitur mit Lösungen und Erklärungen. Mit Serlo schaffst du das!',
  },
  75049: {
    title: 'Mathe Abschlussprüfungen mit Lösung | Mittlere Reife',
    metaDescription:
      'Deine Vorbereitung für die Mittlere Reife Zweig i: Mathe lernen mit Original Prüfungsaufgaben. Mit Serlo schaffst du das!',
  },
  76750: {
    title: 'Mathe Abschlussprüfungen mit Lösung | Mittlere Reife',
    metaDescription:
      'Deine Vorbereitung für die Mittlere Reife Zweig ii und iii: Mathe lernen mit Original Prüfungsaufgaben. Mit Serlo schaffst du das!',
  },
  305760: {
    title: 'Mathe Zentrale Prüfungen (ZAP) | NRW',
    metaDescription:
      'Deine Vorbereitung für die Zentrale Prüfungen (ZAP) in Nordrhein-Westfalen: Mathe lernen mit Original Prüfungsaufgaben und Lösungen. Mit Serlo schaffst du das!',
  },
} as const

// TODO: add meta tags for NRW, BE and BB

export interface ExamsTaxonomyData {
  // key in this form `id${uuid}`
  [key: string]: {
    alias: string
    trashed: boolean
    children: {
      nodes: {
        alias: string
        title: string
        trashed: boolean
      }[]
    }
  }
}
