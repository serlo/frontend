import { ABCFormular } from '../exercise-implementations/abc-formular'
import { Asymptote1 } from '../exercise-implementations/asymptote-1'
import { Asymptote2 } from '../exercise-implementations/asymptote-2'
import { ExponentialFunction } from '../exercise-implementations/exponential-function-1'
import { ExponentialFunctionTime } from '../exercise-implementations/exponential-function-2'
import { ExponentialEquation } from '../exercise-implementations/exponential-function-3'
import { LogarithmExercise1 } from '../exercise-implementations/logarithm-exercise-1'
import { LogarithmExercise2 } from '../exercise-implementations/logarithm-exericse-2'
import { AbbildungGraphen } from '../exercise-implementations/mapping-graphs-1'
import { AbbildungGraphen2 } from '../exercise-implementations/mapping-graphs-2'
import { ModellingParabola } from '../exercise-implementations/modelling-parabolax'
import { NormalformParabola } from '../exercise-implementations/normalform-parabola'
import { ObliqueImage } from '../exercise-implementations/oblique-image'
import { ParabolaCharacteristics } from '../exercise-implementations/parabola-by-characteristics'
import { PlotFunction } from '../exercise-implementations/plot-function-1'
import { PlotFunction2 } from '../exercise-implementations/plot-function-2'
import { RootEquations } from '../exercise-implementations/root-equations'
import { SurfacePyramide } from '../exercise-implementations/surface-pyramide'
import { SurfaceThreePyramide } from '../exercise-implementations/surface-pyramide-2'
import { Trigonometry } from '../exercise-implementations/trigonometry'
import { Trigonometry1 } from '../exercise-implementations/trigonometry-1'
import { ValueSetParabola } from '../exercise-implementations/value-set-parabola'
import { VertexParabola } from '../exercise-implementations/vertex-parabola'
import { VolumePyramide } from '../exercise-implementations/volume-pyramide'
import { VolumeThreePyramide } from '../exercise-implementations/volume-pyramide-2'
import { WheelOfFortune } from '../exercise-implementations/wheel-of-fortune'

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
  'value-set-parabolas': {
    title: 'Wertemenge von Parabeln',
    subtitle: 'Quadratische Funktionen',
    useCalculator: false,
    track: 2,
    component: <ValueSetParabola />,
  },
  'modelling-parabolas': {
    title: 'Modellieren mit Parabeln',
    subtitle: 'Quadratische Funktionen',
    useCalculator: false,
    track: 2,
    component: <ModellingParabola />,
  },
  'parabolas-by-characteristics': {
    title: 'Parabel aus Punkten bestimmen',
    subtitle: 'Quadratische Funktionen',
    useCalculator: true,
    track: 2,
    component: <ParabolaCharacteristics />,
  },
  'volumen-pyramide-1': {
    title: 'Volumen einer Pyramide',
    subtitle: 'vierseitig',
    useCalculator: true,
    track: 2,
    component: <VolumePyramide />,
  },
  'volumen-pyramide-2': {
    title: 'Volumen einer Pyramide',
    subtitle: 'dreiseitig',
    useCalculator: true,
    track: 2,
    component: <VolumeThreePyramide />,
  },
  'oberflaeche-pyramide-1': {
    title: 'Oberfläche einer Pyramide',
    subtitle: 'vierseitig',
    useCalculator: true,
    track: 2,
    component: <SurfacePyramide />,
  },
  'oberflaeche-pyramide-2': {
    title: 'Oberfläche einer Pyramide',
    subtitle: 'dreiseitig',
    useCalculator: true,
    track: 2,
    component: <SurfaceThreePyramide />,
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
  'exponential-function-3': {
    title: 'Nullstelle berechnen',
    subtitle: 'Exponentialfunktion',
    useCalculator: false,
    track: 1,
    component: <ExponentialEquation />,
  },
  'root-equations-1': {
    title: 'Zinssatz berechnen',
    subtitle: 'Wurzeln',
    useCalculator: true,
    track: 1,
    component: <RootEquations />,
  },
  'plot-function-1': {
    title: 'Graphen skizzieren',
    subtitle: 'Ganzrationale Funktionen',
    useCalculator: true,
    track: 1,
    component: <PlotFunction />,
  },
  'plot-function-2': {
    title: 'Graphen skizzieren',
    subtitle: 'Exponentialfunktionen',
    useCalculator: true,
    track: 1,
    component: <PlotFunction2 />,
  },
  'asymptote-1': {
    title: 'Definitions-, Wertebereich und Asymptote',
    subtitle: 'Ganzrationale Funktionen',
    useCalculator: true,
    track: 1,
    component: <Asymptote1 />,
  },
  'asymptote-2': {
    title: 'Definitions-, Wertebereich und Asymptote',
    subtitle: 'Exponentialfunktionen',
    useCalculator: true,
    track: 1,
    component: <Asymptote2 />,
  },
  'oblique-image-1': {
    title: 'Schrägbilder zeichnen',
    subtitle: 'Geometrie',
    useCalculator: true,
    track: 1,
    component: <ObliqueImage />,
  },
  'mapping-graphs-1': {
    title: 'Graphen verschieben',
    subtitle: 'Funktionen',
    useCalculator: true,
    track: 1,
    component: <AbbildungGraphen />,
  },
  'mapping-graphs-2': {
    title: 'Graphen spiegeln',
    subtitle: 'Funktionen',
    useCalculator: true,
    track: 1,
    component: <AbbildungGraphen2 />,
  },
  'wheel-of-fortune': {
    title: 'Glücksrad',
    subtitle: 'Wahrscheinlichkeit',
    useCalculator: false,
    track: 1,
    component: <WheelOfFortune />,
  },
} as const
