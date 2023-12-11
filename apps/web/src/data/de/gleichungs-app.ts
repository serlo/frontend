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
        { number: 1, latex: '123' },
        { number: 2, latex: '123' },
        { number: 3, latex: '123' },
        { number: 4, latex: '123' },
        { number: 5, latex: '123', isGolden: true },
        { number: 6, latex: '123', isGolden: true },
        { number: 7, latex: '123', isGolden: true },
      ],
    },
    {
      number: 2,
      heading: 'Herzlich Willkommen',
      tasks: [
        { number: 8, latex: '123' },
        { number: 9, latex: '123' },
        { number: 10, latex: '123' },
        { number: 11, latex: '123' },
        { number: 12, latex: '123', isGolden: true },
        { number: 13, latex: '123', isGolden: true },
        { number: 14, latex: '123', isGolden: true },
      ],
    },
    {
      number: 3,
      heading: 'Herzlich Willkommen',
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
  ],
}
