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
      heading: 'Auf beiden Seiten',
      tasks: [
        { number: 15, latex: '2x = x + 4' },
        { number: 16, latex: '3x - 5 = 2x + 7' },
        { number: 17, latex: '6x + 6 = 2x + 2' },
        { number: 18, latex: '4x + 5 = 2x - 9' },
        { number: 19, latex: '4x+4=3x+3', isGolden: true },
        { number: 20, latex: '5x-2=x+6', isGolden: true },
        { number: 21, latex: '9x+14=2+3x', isGolden: true },
      ],
    },
    {
      number: 4,
      heading: 'Aufräumen erwünscht (nutze "Vereinfachen")',
      tasks: [
        { number: 22, latex: 'x = 10 + 2 \\cdot 5' },
        { number: 23, latex: 'y + y = 4 + 4 + 4' },
        { number: 24, latex: 'a = (555x + 77) \\cdot 0' },
        { number: 25, latex: '3x + 4x = 3 + 4' },
        { number: 26, latex: 'y = 4 + 5 \\cdot 6', isGolden: true },
        { number: 27, latex: 'x = 0 \\cdot (10x + 42)', isGolden: true },
        { number: 28, latex: '2x + 3x = 5 + 5 + 5', isGolden: true },
      ],
    },
    {
      number: 5,
      heading: 'Nicht immer eine Lösung',
      tasks: [
        { number: 29, latex: '5 + 7 = 12' },
        { number: 30, latex: '5 + 7 = 13' },
        { number: 31, latex: 'x + x = x + x' },
        { number: 32, latex: '2x = 2x + 4' },
        { number: 33, latex: 'x=x+1', isGolden: true },
        { number: 34, latex: 'x-x=0', isGolden: true },
        { number: 35, latex: '0x = 7', isGolden: true },
      ],
    },
    {
      number: 6,
      heading: 'Brüüüüüüüüüüüche',
      tasks: [
        { number: 36, latex: 'x=42' },
        { number: 37, latex: 'x=42' },
        { number: 38, latex: 'x=42' },
        { number: 39, latex: 'x=42' },
        { number: 40, latex: 'x=42', isGolden: true },
        { number: 41, latex: 'x=42', isGolden: true },
        { number: 42, latex: 'x=42', isGolden: true },
      ],
    },
    {
      number: 7,
      heading: 'Herzlich Willkommen',
      tasks: [
        { number: 43, latex: 'x=42' },
        { number: 44, latex: 'x=42' },
        { number: 45, latex: 'x=42' },
        { number: 46, latex: 'x=42' },
        { number: 47, latex: 'x=42', isGolden: true },
        { number: 48, latex: 'x=42', isGolden: true },
        { number: 49, latex: 'x=42', isGolden: true },
      ],
    },
    {
      number: 8,
      heading: 'Herzlich Willkommen',
      tasks: [
        { number: 50, latex: 'x=42' },
        { number: 51, latex: 'x=42' },
        { number: 52, latex: 'x=42' },
        { number: 53, latex: 'x=42' },
        { number: 54, latex: 'x=42', isGolden: true },
        { number: 55, latex: 'x=42', isGolden: true },
        { number: 56, latex: 'x=42', isGolden: true },
      ],
    },
  ],
}
