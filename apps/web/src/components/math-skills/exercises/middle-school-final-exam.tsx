import { ABCFormular } from '../exercise-implementations/abc-formular'
import { ExponentialFunction } from '../exercise-implementations/exponential-function-1'
import { ExponentialFunctionTime } from '../exercise-implementations/exponential-function-2'
import { LogarithmExercise1 } from '../exercise-implementations/logarithm-exercise-1'
import { LogarithmExercise2 } from '../exercise-implementations/logarithm-exericse-2'
import { NormalformParabola } from '../exercise-implementations/normalform-parabola'
import { RootEquations } from '../exercise-implementations/root-equations'
import { SurfacePyramide } from '../exercise-implementations/surface-pyramide'
import { Trigonometry } from '../exercise-implementations/trigonometry'
import { Trigonometry1 } from '../exercise-implementations/trigonometry-1'
import { VertexParabola } from '../exercise-implementations/vertex-parabola'
import { VolumePyramide } from '../exercise-implementations/volume-pyramide'

//track:  1 = Mathe-Zweig 1, 2 = Mathe-Zweig 2 & 3, 3 = beide Zweige

export const middleSchoolFinalExam = {
  'logarithmus-1': {
    title: 'Logarithmus zusammenfassen',
    subtitle: 'Terme',
    useCalculator: false,
    track: 1,
    component: <LogarithmExercise1 />,
  },
  'logarithmus-2': {
    title: 'Logarithmus zusammenfassen',
    subtitle: 'mit 3. binomischer Formel',
    useCalculator: false,
    track: 1,
    component: <LogarithmExercise2 />,
  },
  'trigonometrie-1': {
    title: 'Strahlensatz',
    subtitle: 'Trigonometrie',
    useCalculator: false,
    track: 1,
    component: <Trigonometry1 />,
  },
  'trigonometrie-2': {
    title: 'Kosinussatz',
    subtitle: 'Trigonometrie',
    useCalculator: false,
    track: 1,
    component: <Trigonometry />,
  },
  'normalform-1': {
    title: 'Normalform einer Parabel',
    subtitle: 'Quadratische Funktionen',
    useCalculator: false,
    track: 2,
    component: <NormalformParabola />,
  },
  'scheitelform-1': {
    title: 'Scheitelform einer Parabel',
    subtitle: 'Quadratische Funktionen',
    useCalculator: false,
    track: 2,
    component: <VertexParabola />,
  },
  'abcformel-1': {
    title: 'ABC-Formel',
    subtitle: 'Quadratische Gleichungen',
    useCalculator: false,
    track: 2,
    component: <ABCFormular />,
  },
  'volumen-pyramide-1': {
    title: 'Volumen einer Pyramide',
    subtitle: 'vierseitig',
    useCalculator: true,
    track: 2,
    component: <VolumePyramide />,
  },
  'oberflaeche-pyramide-1': {
    title: 'Oberfläche einer Pyramide',
    subtitle: 'vierseitig',
    useCalculator: true,
    track: 2,
    component: <SurfacePyramide />,
  },
  'exponential-function-1': {
    title: 'Kapital berechnen',
    subtitle: 'Exponentialfunktion',
    useCalculator: true,
    track: 1,
    component: <ExponentialFunction />,
  },
  'exponential-function-2': {
    title: 'Anlagezeit berechnen',
    subtitle: 'Exponentialfunktion',
    useCalculator: true,
    track: 1,
    component: <ExponentialFunctionTime />,
  },
  'root-equations-1': {
    title: 'Zinssatz berechnen',
    subtitle: 'Wurzeln',
    useCalculator: true,
    track: 1,
    component: <RootEquations />,
  },
} as const
