export const deRegions = {
  bayern: {
    title: 'Bayern',
    code: 'BY',
  },
  'baden-wuerttemberg': {
    title: 'Baden-Württemberg',
    code: 'BW',
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
  alle: 'Alle Schultypen',
  hauptschule: 'Hauptschule',
  gesamtschule: 'Gesamtschule',
  mittelschule: 'Mittelschule',
  'haupt-werkreal': 'Haupt- & Werkrealschule',
  realschule: 'Realschule',
  'fos-bos': 'FOS & BOS',
  oberschule: 'Oberschule',
  gymnasium: 'Gymnasium',
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

export const examsFoldersBW: ExamsFolders = {
  hauptschule: {
    id: 317526,
    displayTitle: 'Hauptschulabschluss',
    schoolType: 'hauptschule',
  },
  werkrealschule: {
    id: 317529,
    displayTitle: 'Werkrealschulabschluss',
    schoolType: 'haupt-werkreal',
  },
  realschule: {
    id: 317525,
    displayTitle: 'Realschulabschluss',
    schoolType: 'realschule',
  },
}

export const examsFoldersNI: ExamsFolders = {
  hs9: {
    displayTitle: 'Hauptschulabschluss 9',
    schoolType: 'hauptschule',
    options: [
      {
        id: 315311,
        displayTitle: 'HS9 G-Kurs',
      },
      {
        id: 315310,
        displayTitle: 'HS9 E-Kurs',
      },
    ],
  },
  hs10: {
    displayTitle: 'Hauptschulabschluss 10',
    schoolType: 'hauptschule',
    options: [
      {
        id: 315309,
        displayTitle: 'HS10 G-Kurs',
      },
      {
        id: 315308,
        displayTitle: 'HS10 E-Kurs',
      },
    ],
  },
  isg: {
    displayTitle: 'IGS Abschlüsse',
    schoolType: 'gesamtschule',
    options: [
      {
        id: 302434,
        displayTitle: 'IGS G-Kurs',
      },
      {
        id: 302433,
        displayTitle: 'IGS E-Kurs',
      },
    ],
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
  eesa: {
    id: 311010,
    displayTitle: 'EESA | Zentrale Prüfungen (ZAP)',
    schoolType: 'alle',
  },
  msa: {
    id: 307336,
    displayTitle: 'MSA | Zentrale Prüfungen (ZAP)',
    schoolType: 'alle',
  },
  gym: {
    id: 307335,
    displayTitle: 'GYM | Zentrale Prüfungen (ZAP)',
    schoolType: 'gymnasium',
  },
  abitur: {
    id: 313659,
    displayTitle: 'Abitur',
    schoolType: 'gymnasium',
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
  msa: {
    id: 308610,
    displayTitle: 'Mittlerer Schulabschluss (MSA)',
    schoolType: 'alle',
  },
  esa: {
    id: 313804,
    displayTitle: 'Erster allgemeinbildender Schulabschluss (ESA)',
    schoolType: 'alle',
  },
}

export const mathExamTaxDataStatic: Record<SupportedRegion, ExamsFolders> = {
  bayern: examsFoldersBY,
  'baden-wuerttemberg': examsFoldersBW,
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
  'baden-wuerttemberg': extractIds(examsFoldersBW),
  berlin: extractIds(examsFoldersBE),
  brandenburg: extractIds(examsFoldersBB),
  niedersachsen: [...extractIds(examsFoldersNI), 315306, 315307],
  nrw: extractIds(examsFoldersNW),
  'schleswig-holstein': extractIds(examsFoldersSH),
}

export const allMathExamTaxIds = Object.values(mathExamsTaxIds).flatMap(
  (entries) => entries
)

export const schoolTaxonomies = [
  201593, 16259, 16157, 16042, 97943, 97944, 97945, 97946, 97947, 16376, 16033,
  305760, 307330, 181782, 317521, 317522,
]

export const extraMetaTags = {
  297606: {
    title: 'Abiturprüfungen Mathe eA mit Lösungen',
    metaDescription:
      'Mathe lernen fürs Abitur in Niedersachsen mit Serlo. Mathe Abi Aufgaben erhöhtes Anforderungsniveau mit Lösungen ✨ kostenlos und einfach erklärt.',
  },
  300778: {
    title: 'Abiturprüfungen Mathe gA mit Lösungen',
    metaDescription:
      'Mathe lernen fürs Abitur mit Serlo. 💪 Mathe Abi Aufgaben grundlegendes Anforderungsniveau in Niedersachsen mit Lösungen. Du schaffst das!',
  },
  297604: {
    title: 'Mathe Prüfungsaufgaben mit Lösungen | Realschule',
    metaDescription:
      'Mathe lernen für die Realschul-Abschlussprüfungen in Niedersachsen mit Original-Aufgaben und Lösungen. 🙌 Mit Serlo schaffst du das!',
  },
  302433: {
    title: 'IGS-Prüfungen Mathe G-Kurs mit Lösungen',
    metaDescription:
      'Bereite dich auf Mathe-Abschlussprüfung an der Gesamtschule vor! 💪 Lerne mit originalen Prüfungsaufgaben mit Lösungen für den G-Kurs!',
  },
  302434: {
    title: 'IGS-Prüfungen Mathe E-Kurs mit Lösungen',
    metaDescription:
      'Mathe-Prüfungsaufgaben und Lösungen für den IGS E Abschluss in Niedersachsen 🚀 Mit Serlo gut vorbereitet zur Prüfung!',
  },
  20852: {
    title: 'Mathe Abiturprüfungen mit Lösung',
    metaDescription:
      'Die beste Vorbereitung fürs Mathe Abi. 🚀 Mathe-Aufgaben fürs Abitur in Bayern mit Lösungen und Erklärungen. Mit Serlo schaffst du das!',
  },
  75049: {
    title: 'Mathe Abschlussprüfungen mit Lösung | Mittlere Reife',
    metaDescription:
      'Lerne für die Abschlussprüfung für die Realschule in Bayern: Mathe lernen mit originalen Prüfungsaufgaben Zweig I und Lösungen. 🙌 Mit Serlo schaffst du das!',
  },
  76750: {
    title: 'Mathe Abschlussprüfungen mit Lösung | Mittlere Reife',
    metaDescription:
      'Deine Vorbereitung für die Abschlussprüfung der Realschule in Bayern Zweig II und III 💪 Mathe lernen mit originalen Prüfungen und Lösungen.',
  },
  307335: {
    title: 'GYM Mathe – Zentrale Prüfungen (ZAP) | NRW',
    metaDescription:
      'Deine Vorbereitung für die ZP 10 am Gymnasium in NRW mit Serlo. 🙌 Übe mit den Prüfungen von 2021-2024 mit Lösungen für die gymnasiale Differenzierung.',
  },
  307336: {
    title: 'MSA Mathe – Zentrale Prüfungen (ZAP) | NRW',
    metaDescription:
      'Lerne für die ZP 10 Mathe in NRW mit Serlo. 🚀 Mit originalen Mathe-Aufgaben für den MSA der Jahre 2024-2021 mit Lösungen optimal vorbereiten!',
  },
  305819: {
    title: 'Mathe MSA- und eBBR-Prüfungen | Berlin',
    metaDescription:
      'Mathe lernen für den MSA und den eBBR in Berlin! 💪 Originale Prüfungsaufgaben und Lösungen für deinen erfolgreichen Abschluss.',
  },
  305843: {
    title: 'Mathe Abschlussprüfungen in Brandenburg mit Lösungen',
    metaDescription:
      'Mathe lernen für den MSA, FOR und EBR in Brandenburg! 🚀 Deine Prüfungsvorbereitung mit originalen Aufgaben und Lösungen von Serlo.',
  },
  308610: {
    title: 'Mathe MSA Prüfungen mit Lösungen | Schleswig-Holstein',
    metaDescription:
      'Optimale Mathe-Prüfungsvorbereitung zum Mittleren Schulabschluss (MSA) in Schleswig-Holstein! 🔥 Originale Aufgaben 2021-2024 mit Lösungen.',
  },
  313804: {
    title: 'Mathe ESA Abschlussprüfungen mit Lösungen | Schleswig-Holstein',
    metaDescription:
      'Lerne für den Mathe ESA in Schleswig-Holstein! ✨ Originale Prüfungsaufgaben für den ersten allgemeinbildenden Schulabschluss mit Lösungen.',
  },
  311010: {
    title: 'Mathe EESA – Zentrale Prüfungen (ZAP) | NRW',
    metaDescription:
      'EESA ZP in NRW (ehemals HSA10) bestehen! 💪 Lerne mit originalen Mathe-Prüfungen der Jahre 2024–2021 mit Lösungen. Mit Serlo schaffst du das!',
  },
  313659: {
    title: 'Mathe Abitur mit Lösungen | NRW',
    metaDescription:
      'Deine Abi-Vorbereitung mit Lösungen in NRW: Originale Abitur-Aufgaben Mathe 2021-2024 Grundkurs und Leistungskurs. 🔥 Kostenlos vorbereiten mit Serlo!',
  },
  75678: {
    title: 'Quali Abschlussprüfungen mit Lösung für Bayern',
    metaDescription:
      'Lerne Mathe für den Quali in Bayern! ✨ Prüfungsaufgaben mit Lösungen von Serlo - verständlich und kostenlos!',
  },
  247427: {
    title: 'Mathe MSA an der Mittelschule mit Lösungen | Bayern',
    metaDescription:
      'Deine Vorbereitung für den MSA an der Mittelschule Bayern!🔥Mathe lernen mit Prüfungen und Lösungen für den Mittleren Schulabschluss!',
  },
  317525: {
    title: 'Prüfungen Realschule mit Lösungen | Mathematik',
    metaDescription:
      'Mathe lernen für den Realschulabschluss in Baden-Württemberg mit originalen Aufgaben und Lösungen! 🚀 Mit Serlo schaffst du das!',
  },
  317529: {
    title: 'Prüfungen Werkrealschule mit Lösungen | Mathematik',
    metaDescription:
      'Mathe-Prüfungsvorbereitung für deinen erfolgreichen Abschluss! 🙌 Aufgaben mit Lösungen für die Werkrealschule Baden-Württemberg!',
  },
  317526: {
    title: 'Prüfungen Hauptschule mit Lösungen | Mathematik',
    metaDescription:
      'Lerne Mathe für den Hauptschulabschluss Baden-Württemberg! 💪 Mit originalen Prüfungen und Lösungen vorbereiten.',
  },
  315307: {
    title: 'Mathe Prüfungsaufgaben HS 9 mit Lösungen',
    metaDescription:
      'Lerne Mathe für den HS 9 Niedersachsen! 🚀 Mit Serlo auf den Hauptschulabschluss vorbereiten. Aufgaben und Lösungen für den G-Kurs und E-Kurs.',
  },
  315306: {
    title: 'Mathe Prüfungsaufgaben HS 10 mit Lösungen',
    metaDescription:
      'Mathe-Prüfungsvorbereitung für den HS 10 Niedersachsen mit Serlo! 🔥Aufgaben vom Hauptschulabschluss mit Lösungen für den G-Kurs und E-Kurs!',
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
  'baden-wuerttemberg': {
    title: 'Mathe Abschlussprüfungen für Baden-Württemberg',
    metaDescription:
      'Mathe lernen mit Prüfungsaufgaben und Lösungen der vergangenen Jahre. Für deine Abschlussprüfung in BaWü.',
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
