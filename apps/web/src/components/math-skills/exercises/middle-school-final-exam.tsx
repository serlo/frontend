import { ABCFormular } from '../exercise-implementations/abc-formular'
import { Asymptote1 } from '../exercise-implementations/asymptote-1'
import { Asymptote2 } from '../exercise-implementations/asymptote-2'
import { DescribeGraphPowerFunction } from '../exercise-implementations/describe-graph-power-function'
import { ExponentialFunction } from '../exercise-implementations/exponential-function-1'
import { ExponentialFunctionTime } from '../exercise-implementations/exponential-function-2'
import { ExponentialEquation } from '../exercise-implementations/exponential-function-3'
import { IceCreamShop } from '../exercise-implementations/ice-cream-shop'
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
import { RotatePoint } from '../exercise-implementations/rotate-point'
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
  // Mathe-Zweig Teil A
  'potenzfunktionen-graphen-beschreiben': {
    title: 'Funktionsgraph beschreiben',
    subtitle: 'Potenzfunktionen',
    useCalculator: false,
    track: 1,
    component: <DescribeGraphPowerFunction />,
  },
  'exponential-funktion-gleichung-loesen': {
    title: 'Gleichung lösen',
    subtitle: 'Exponentialfunktion',
    useCalculator: false,
    track: 1,
    component: <ExponentialEquation />,
  },
  'logarithmus-1': {
    title: 'Terme zusammenfassen 1',
    subtitle: 'Logarithmus',
    useCalculator: false,
    track: 1,
    component: <LogarithmExercise1 />,
  },
  'logarithmus-2': {
    title: 'Terme zusammenfassen 2',
    subtitle: 'Logarithmus',
    useCalculator: false,
    track: 1,
    component: <LogarithmExercise2 />,
  },
  'trigonometrie-1': {
    title: 'Strahlensatz',
    subtitle: 'Geometrie',
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
  eisdiele: {
    title: 'Eisdiele',
    subtitle: 'Daten und Zufall',
    useCalculator: false,
    track: 1,
    component: <IceCreamShop />,
  },
  gluecksrad: {
    title: 'Glücksrad',
    subtitle: 'Daten und Zufall',
    useCalculator: false,
    track: 1,
    component: <WheelOfFortune />,
  },
  drehung: {
    title: 'Punkt drehen',
    subtitle: 'Abbildungen',
    useCalculator: false,
    track: 1,
    component: <RotatePoint />,
  },
  // Mathe-Zweig, Teil B
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
} as const

/*

Template for new exercise

import { SelfEvaluationExercise } from './self-evaluation-exercise'

export function RotatePoint() {
  return (
    <SelfEvaluationExercise
      generator={() => null}
      renderTask={() => <></>}
      renderSolution={() => <></>}
      centAmount={35}
    />
  )
}

*/
