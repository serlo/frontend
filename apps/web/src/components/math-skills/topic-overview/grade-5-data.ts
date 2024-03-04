import { SupportedExercisesId } from '../exercises/all-exercises'

export interface GradeTopicData {
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
        children: [{ id: 'zahlen-ordnen', text: 'Level 1' }],
      },
      {
        title: 'Vorgänger und Nachfolger',
        children: [
          { id: 'vorgaenger-nachfolger-1', text: 'Tabelle' },
          { id: 'vorgaenger-nachfolger-2', text: 'Text' },
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
          { id: 'zahlenabstaende-erkennen-topprofi', text: 'Profi+' },
        ],
      },
      {
        title: 'Römische Zahlen: Römisch nach Dezimal',
        children: [
          { id: 'roemisch-nach-dezimal-1', text: 'Level 1' },
          { id: 'roemisch-nach-dezimal-2', text: 'Level 2' },
          { id: 'roemisch-nach-dezimal-3', text: 'Level 3' },
          { id: 'roemisch-nach-dezimal-profi', text: 'Profi' },
        ],
      },
      {
        title: 'Römische Zahlen: Dezimal nach Römisch',
        children: [
          { id: 'dezimal-nach-roemisch-1', text: 'Level 1' },
          { id: 'dezimal-nach-roemisch-2', text: 'Level 2' },
          { id: 'dezimal-nach-roemisch-profi', text: 'Profi' },
        ],
      },
      {
        title: 'Römische Zahlen: Memory',
        children: [
          { id: 'roemische-zahlen-memory-1', text: '1 bis 10' },
          { id: 'roemische-zahlen-memory-2', text: '11 bis 60' },
          { id: 'roemische-zahlen-memory-3', text: '4 bis 50' },
          { id: 'roemische-zahlen-memory-4', text: '40 bis 500' },
          { id: 'roemische-zahlen-memory-profi', text: 'Profi' },
          { id: 'roemische-zahlen-memory-profi-plus', text: 'Profi+' },
        ],
      },
      {
        title: 'Römische Zahlen ordnen',
        children: [
          { id: 'roemische-zahlen-ordnen-1', text: 'Level 1' },
          { id: 'roemische-zahlen-ordnen-2', text: 'Level 2' },
          { id: 'roemische-zahlen-ordnen-profi', text: 'Profi' },
        ],
      },
      {
        title: 'Dualzahlen: Einführung',
        children: [
          {
            id: 'dualzahlen-stellenwerte-erkennen',
            text: 'Stellenwerte erkennen',
          },
        ],
      },
      {
        title: 'Dual nach Dezimal mit Stellenwerttafel',
        children: [
          {
            id: 'dual-nach-dezimal-stellenwerttafel-1',
            text: 'Level 1 (WIP)',
          },
          {
            id: 'dual-nach-dezimal-stellenwerttafel-2',
            text: 'Level 2 (WIP)',
          },
        ],
      },
      {
        title: 'Baustellen',
        children: [
          { id: 'memory-small-wip', text: 'Memory Klein' },
          { id: 'memory-big-wip', text: 'Memory Groß' },
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
