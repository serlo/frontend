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
  'schleswig-holstein': {
    title: 'Schleswig-Holstein',
    code: 'SH',
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
  gym: {
    id: 307335,
    displayTitle: 'GYM | Zentrale Prüfungen (ZAP)',
    schoolType: 'gymnasium',
  },
  msa: {
    id: 307336,
    displayTitle: 'MSA | Zentrale Prüfungen (ZAP)',
    schoolType: 'alle',
  },
}

export const examsFoldersBE: ExamsFolders = {
  msa: {
    id: 305819,
    displayTitle: 'Mittlerer Schulabschluss (MSA)',
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
export const examsFoldersSH: ExamsFolders = {
  alle: {
    id: 308610,
    displayTitle: 'Mittlerer Schulabschluss (MSA)',
    schoolType: 'alle',
  },
}

export const mathExamTaxDataStatic: Record<SupportedRegion, ExamsFolders> = {
  bayern: examsFoldersBY,
  berlin: examsFoldersBE,
  brandenburg: examsFoldersBB,
  niedersachsen: examsFoldersNI,
  nrw: examsFoldersNW,
  'schleswig-holstein': examsFoldersSH,
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
  'schleswig-holstein': extractIds(examsFoldersSH),
}

export const allMathExamTaxIds = Object.values(mathExamsTaxIds).flatMap(
  (entries) => entries
)

export const schoolTaxonomies = [
  201593, 16259, 16157, 16042, 97943, 97944, 97945, 97946, 97947, 16376, 16033,
  305760, 307330,
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
      'Mathe lernen mit originalen Aufgaben und Lösungen für die Abschlussprüfungen an der Gesamtschule. Mit Serlo schaffst du das!',
  },
  20852: {
    title: 'Mathe Abiturprüfungen mit Lösung',
    metaDescription:
      'Die beste Vorbereitung fürs Mathe Abi. Mathe-Aufgaben fürs Abitur mit Lösungen und Erklärungen. Mit Serlo schaffst du das!',
  },
  75049: {
    title: 'Mathe Abschlussprüfungen mit Lösung | Mittlere Reife',
    metaDescription:
      'Deine Vorbereitung für die Mittlere Reife Zweig i: Mathe lernen mit originalen Prüfungsaufgaben. Mit Serlo schaffst du das!',
  },
  76750: {
    title: 'Mathe Abschlussprüfungen mit Lösung | Mittlere Reife',
    metaDescription:
      'Deine Vorbereitung für die Mittlere Reife Zweig ii und iii: Mathe lernen mit originalen Prüfungsaufgaben. Mit Serlo schaffst du das!',
  },
  307335: {
    title: 'GYM Mathe – Zentrale Prüfungen (ZAP) | NRW',
    metaDescription:
      'Deine Vorbereitung für die zentrale Prüfung (ZAP) am Gymnasium in Nordrhein-Westfalen: Mathe lernen mit originalen Prüfungsaufgaben und Lösungen. Mit Serlo schaffst du das!',
  },
  307336: {
    title: 'MSA Mathe – Zentrale Prüfungen (ZAP) | NRW',
    metaDescription:
      'Deine Vorbereitung für den Mittleren Schulabschluss – Zentrale Prüfungen (ZAP) in Nordrhein-Westfalen: Mathe lernen mit originalen Prüfungsaufgaben und Lösungen. Mit Serlo schaffst du das!',
  },
  305819: {
    title: 'Mathe MSA- und eBBR-Prüfungen | Berlin',
    metaDescription:
      'Mathe lernen für den Mittleren Schulabschluss (MSA) und die erweiterte Berufsbildungsreife (eBBR) mit den originalen Prüfungsaufgaben und Lösungen aus Berlin. Mit Serlo schaffst du das!',
  },
  305843: {
    title:
      'Mathe Abschlussprüfungen in Brandenburg | Oberschule & Gesamtschule',
    metaDescription:
      'Kostenlose Prüfungsvorbereitung für A-Kurs/EBR-Klasse und B-Kurs/FOR-Klasse sowie Grund- und Erweiterungskurs der Gesamtschule in Brandenburg. Mit Serlo schaffst du das!',
  },
  308610: {
    title: 'Mathe MSA Abschlussprüfungen mit Lösungen | Schleswig-Holstein',
    metaDescription:
      'Mathe lernen für den Mittleren Schulabschluss (MSA) mit den originalen Prüfungsaufgaben und Lösungen aus Schleswig-Holstein. Mit Serlo schaffst du das!',
  },
} as const

export const landingMetaTags: Record<
  SupportedRegion,
  { title: string; metaDescription: string }
> = {
  bayern: {
    title: 'Mathe Abschlussprüfungen in Bayern',
    metaDescription:
      'Mathe lernen mit Prüfungsaufgaben und Lösungen der vergangenen Jahre. Für deine Abschlussprüfung in Bayern.',
  },
  berlin: {
    title: 'Prüfungsaufgaben für Mathe-Prüfungen Berlin',
    metaDescription:
      'Original Berliner Abschlussprüfungen mit Lösungen der vergangenen Jahre. Mit Serlo schaffst du das!',
  },
  brandenburg: {
    title: 'Mathe Abschlussprüfungen Brandenburg',
    metaDescription:
      'Ideale Vorbereitung: originale Prüfungsaufgaben mit Lösungen für deine Abschlussprüfung in Mathe in Brandenburg. ',
  },
  niedersachsen: {
    title: 'Mathe Abschlussprüfungen Niedersachsen',
    metaDescription:
      'Mathematik für den Abschluss lernen mit original Prüfungsausgaben und Musterlösungen aus Niedersachsen. Du schaffst das!',
  },
  nrw: {
    title: 'Zentrale Prüfungen (ZAP) Mathe NRW',
    metaDescription:
      'Mathe lernen für die ZAP in Nordrhein-Westfalen – mit den originalen Prüfungsaufgaben samt Musterlösungen der vergangenen Jahre.',
  },
  'schleswig-holstein': {
    title: 'Mathe-Prüfungen Mittlerer Schulabschluss MSA Schleswig-Holstein',
    metaDescription:
      'Mathe lernen für den MSA in Schleswig-Holstein – mit den originalen Prüfungsaufgaben und Musterlösungen der vergangenen Jahre (2021,2022,2023).',
  },
}

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
