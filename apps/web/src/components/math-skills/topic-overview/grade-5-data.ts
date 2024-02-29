import { SupportedExercisesId } from '../exercises/all-exercises'

interface GradeTopicData {
  title: string
  children: {
    title: string
    children: {
      id: SupportedExercisesId
      text: string
    }[]
  }[]
}

export const grade5Data: GradeTopicData[] = [
  {
    title: 'Natürliche Zahlen',
    children: [
      {
        title: 'Zahlenstrahl: Anordnen',
        children: [
          { id: 'zahlen-anordnen-1', text: 'Level 1' },
          { id: 'zahlen-anordnen-2', text: 'Level 2' },
          { id: 'zahlen-anordnen-profi', text: 'Profi' },
        ],
      },
      {
        title: 'Zahlenstrahl: Ablesen',
        children: [
          { id: 'zahlen-ablesen-1', text: 'Level 1' },
          { id: 'zahlen-ablesen-2', text: 'Level 2' },
          { id: 'zahlen-ablesen-profi', text: 'Profi' },
        ],
      },
      {
        title: 'Stellenwert-Tabelle',
        children: [
          { id: 'stellenwerte-finden', text: 'Stelle finden' },
          { id: 'stellenwert-tabelle-ablesen', text: 'Zahl ablesen' },
        ],
      },
      {
        title: 'Stellenwerte ändern',
        children: [
          { id: 'stellenwerte-aendern-1', text: 'Level 1' },
          { id: 'stellenwerte-aendern-profi', text: 'Profi' },
        ],
      },
      {
        title: 'Text in Zahl umwandeln',
        children: [
          { id: 'text-in-zahl-1', text: 'Level 1' },
          { id: 'text-in-zahl-profi', text: 'Profi' },
        ],
      },
      {
        title: 'Zahlen ordnen',
        children: [{ id: 'zahlen-sortieren-wip', text: 'Level 1 (WIP)' }],
      },
      {
        title: 'Vorgänger und Nachfolger',
        children: [
          { id: 'zahlen-sortieren-wip', text: 'Level 1 (TODO)' },
          { id: 'zahlen-sortieren-wip', text: 'Level 2 (TODO)' },
        ],
      },
      {
        title: 'Zahlen vergrößern & verkleinern',
        children: [
          { id: 'zahlen-vergroeßern-verkleinern-1', text: 'Level 1' },
          { id: 'zahlen-vergroeßern-verkleinern-2', text: 'Level 2' },
          { id: 'zahlen-vergroeßern-verkleinern-3', text: 'Level 3' },
          { id: 'zahlen-vergroeßern-verkleinern-profi', text: 'Profi' },
        ],
      },
      {
        title: 'Zahlenabstände erkennen',
        children: [
          { id: 'zahlenabstaende-erkennen-1', text: 'Level 1' },
          { id: 'zahlenabstaende-erkennen-2', text: 'Level 2' },
          { id: 'zahlenabstaende-erkennen-profi', text: 'Profi' },
          { id: 'zahlenabstaende-erkennen-profi', text: 'Profi' },
          { id: 'zahlenabstaende-erkennen-topprofi', text: 'Profi+' },
        ],
      },
    ],
  },
  {
    title: 'Rechnen in ℕ',
    children: [
      {
        title: 'Potenzieren',
        children: [
          { id: 'potenzwert-berechnen', text: 'Potenzwert berechnen' },
        ],
      },
    ],
  },
]
