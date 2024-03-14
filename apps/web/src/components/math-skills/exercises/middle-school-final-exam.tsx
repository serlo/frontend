import { LogarithmExercise1 } from '../exercise-implementations/logarithm-exercise-1'
import { LogarithmExercise2 } from '../exercise-implementations/logarithm-exericse-2'
import { NormalformParabola } from '../exercise-implementations/normalform-parabola'
import { SurfacePyramide } from '../exercise-implementations/surface-pyramide'
import { Trigonometry } from '../exercise-implementations/trigonometry'
import { VertexParabola } from '../exercise-implementations/vertex-parabola'
import { VolumePyramide } from '../exercise-implementations/volume-pyramide'

export const middleSchoolFinalExam = {
  'logarithmus-1': {
    title: 'Logarithmus zusammenfassen',
    subtitle: 'Terme',
    useCalculator: false,
    track: 1, // 1 = Mathe-Zweig 1, 2 = Mathe-Zweig 2 & 3
    component: <LogarithmExercise1 />,
  },
  'logarithmus-2': {
    title: 'Logarithmus zusammenfassen',
    subtitle: 'mit 3. binomischer Formel',
    useCalculator: false,
    track: 1, // 1 = Mathe-Zweig 1, 2 = Mathe-Zweig 2 & 3
    component: <LogarithmExercise2 />,
  },
  'volumen-pyramide-1': {
    title: 'Volumen einer Pyramiden',
    subtitle: 'vierseitig',
    useCalculator: true,
    track: 2, // 1 = Mathe-Zweig 1, 2 = Mathe-Zweig 2 & 3
    component: <VolumePyramide />,
  },
  'oberflaeche-pyramide-1': {
    title: 'Oberfläche einer Pyramide',
    subtitle: 'vierseitig',
    useCalculator: true,
    track: 2, // 1 = Mathe-Zweig 1, 2 = Mathe-Zweig 2 & 3
    component: <SurfacePyramide />,
  },
  'trigonometrie-1': {
    title: 'Trigonometrie',
    subtitle: 'Strahlensatz, Kosinussatz',
    useCalculator: false,
    track: 1, // 1 = Mathe-Zweig 1, 2 = Mathe-Zweig 2 & 3
    component: <Trigonometry />,
  },
  'normalform-1': {
    title: 'Normalform einer Parabel',
    subtitle: 'Quadratische Funktionen',
    useCalculator: false,
    track: 2, // 1 = Mathe-Zweig 1, 2 = Mathe-Zweig 2 & 3
    component: <NormalformParabola />,
  },
  'scheitelform-1': {
    title: 'Scheitelform einer Parabel',
    subtitle: 'Quadratische Funktionen',
    useCalculator: false,
    track: 2, // 1 = Mathe-Zweig 1, 2 = Mathe-Zweig 2 & 3
    component: <VertexParabola />,
  },
} as const
