export interface LinearEquationTask {
  latex: string
  number: number
  version?: number
  isGolden?: boolean
}

interface LinearEquationLevel {
  tasks: LinearEquationTask[]
  number: number
  heading: string
}

export interface LinearEquationData {
  levels: LinearEquationLevel[]
}

export const linearEquationData: LinearEquationData = {
  levels: [
    {
      number: 1,
      heading: 'Herzlich Willkommen',
      tasks: [
        { number: 1, latex: 'x + 1 = 4' },
        { number: 2, latex: '4x = 8' },
        { number: 3, latex: 'x + 16 = 26' },
        { number: 4, latex: '12 = 3a' },
        { number: 5, latex: 'x + 8 = 50', isGolden: true },
        { number: 6, latex: '2x = 8', isGolden: true },
        { number: 7, latex: '3x + 4 = 16', isGolden: true },
      ],
    },
    {
      number: 2,
      heading: 'Plus und Minus',
      tasks: [
        { number: 8, latex: 'x - 1 = 3' },
        { number: 9, latex: 'x + 5 = 1' },
        { number: 10, latex: '-20 + x = -50' },
        { number: 11, latex: 'a - 5 = -8' },
        { number: 12, latex: 'x - 2 = 10', isGolden: true },
        { number: 13, latex: 'y + 20 = 15', isGolden: true },
        { number: 14, latex: 'x - 10 = -100', isGolden: true },
      ],
    },
    {
      number: 3,
      heading: 'Auf beiden Seiten Variablen',
      tasks: [
        { number: 15, latex: '123' },
        { number: 16, latex: '123' },
        { number: 17, latex: '123' },
        { number: 18, latex: '123' },
        { number: 19, latex: '123', isGolden: true },
        { number: 20, latex: '123', isGolden: true },
        { number: 21, latex: '123', isGolden: true },
      ],
    },
    {
      number: 4,
      heading: 'Herzlich Willkommen',
      tasks: [
        { number: 22, latex: '123' },
        { number: 23, latex: '123' },
        { number: 24, latex: '123' },
        { number: 25, latex: '123' },
        { number: 26, latex: '123', isGolden: true },
        { number: 27, latex: '123', isGolden: true },
        { number: 28, latex: '123', isGolden: true },
      ],
    },
    {
      number: 5,
      heading: 'Herzlich Willkommen',
      tasks: [
        { number: 29, latex: '123' },
        { number: 30, latex: '123' },
        { number: 31, latex: '123' },
        { number: 32, latex: '123' },
        { number: 33, latex: '123', isGolden: true },
        { number: 34, latex: '123', isGolden: true },
        { number: 35, latex: '123', isGolden: true },
      ],
    },
    {
      number: 6,
      heading: 'Herzlich Willkommen',
      tasks: [
        { number: 29, latex: '123' },
        { number: 30, latex: '123' },
        { number: 31, latex: '123' },
        { number: 32, latex: '123' },
        { number: 33, latex: '123', isGolden: true },
        { number: 34, latex: '123', isGolden: true },
        { number: 35, latex: '123', isGolden: true },
      ],
    },
    {
      number: 7,
      heading: 'Herzlich Willkommen',
      tasks: [
        { number: 29, latex: '123' },
        { number: 30, latex: '123' },
        { number: 31, latex: '123' },
        { number: 32, latex: '123' },
        { number: 33, latex: '123', isGolden: true },
        { number: 34, latex: '123', isGolden: true },
        { number: 35, latex: '123', isGolden: true },
      ],
    },
    {
      number: 8,
      heading: 'Herzlich Willkommen',
      tasks: [
        { number: 29, latex: '123' },
        { number: 30, latex: '123' },
        { number: 31, latex: '123' },
        { number: 32, latex: '123' },
        { number: 33, latex: '123', isGolden: true },
        { number: 34, latex: '123', isGolden: true },
        { number: 35, latex: '123', isGolden: true },
      ],
    },
  ],
}
