/* eslint-disable import/no-cycle */
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
import { Parallelogram1 } from '../exercise-implementations/parallelogram-1'
import { Parallelogram2 } from '../exercise-implementations/parallelogram-2'
import { Parallelogram3 } from '../exercise-implementations/parallelogram-3'
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
    calculatorAllowed: false,
    track: 1,
    component: <DescribeGraphPowerFunction />,
  },
  'exponential-funktion-gleichung-loesen': {
    title: 'Gleichung lösen',
    subtitle: 'Exponentialfunktion',
    calculatorAllowed: false,
    track: 1,
    component: <ExponentialEquation />,
  },
  'logarithmus-1': {
    title: 'Terme zusammenfassen 1',
    subtitle: 'Logarithmus',
    calculatorAllowed: false,
    track: 1,
    component: <LogarithmExercise1 />,
  },
  'logarithmus-2': {
    title: 'Terme zusammenfassen 2',
    subtitle: 'Logarithmus',
    calculatorAllowed: false,
    track: 1,
    component: <LogarithmExercise2 />,
  },
  'trigonometrie-1': {
    title: 'Strahlensatz',
    subtitle: 'Geometrie',
    calculatorAllowed: false,
    track: 1,
    component: <Trigonometry1 />,
  },
  'trigonometrie-2': {
    title: 'Kosinussatz',
    subtitle: 'Trigonometrie',
    calculatorAllowed: false,
    track: 1,
    component: <Trigonometry />,
  },
  'parallelogramm-1': {
    title: 'Parallelogramm einzeichnen',
    subtitle: 'Trigonometrie',
    calculatorAllowed: false,
    track: 1,
    component: <Parallelogram1 />,
  },
  'parallelogramm-2': {
    title: 'Winkelmaß berechnen',
    subtitle: 'Trigonometrie',
    calculatorAllowed: false,
    track: 1,
    component: <Parallelogram2 />,
  },
  'parallelogramm-3': {
    title: 'Punkt darstellen in Abhängigkeit',
    subtitle: 'Trigonometrie, TODO',
    calculatorAllowed: false,
    track: 1,
    component: <Parallelogram3 />,
  },
  eisdiele: {
    title: 'Eisdiele',
    subtitle: 'Daten und Zufall',
    calculatorAllowed: false,
    track: 1,
    component: <IceCreamShop />,
  },
  gluecksrad: {
    title: 'Glücksrad',
    subtitle: 'Daten und Zufall',
    calculatorAllowed: false,
    track: 1,
    component: <WheelOfFortune />,
  },
  drehung: {
    title: 'Punkt drehen',
    subtitle: 'Abbildungen',
    calculatorAllowed: false,
    track: 1,
    component: <RotatePoint />,
  },
  // Mathe-Zweig, Teil B
  'exponential-function-1': {
    title: 'Kapital berechnen',
    subtitle: 'Exponentialfunktion',
    calculatorAllowed: true,
    track: 1,
    component: <ExponentialFunction />,
  },
  'exponential-function-2': {
    title: 'Anlagezeit berechnen',
    subtitle: 'Exponentialfunktion',
    calculatorAllowed: true,
    track: 1,
    component: <ExponentialFunctionTime />,
  },
  'root-equations-1': {
    title: 'Zinssatz berechnen',
    subtitle: 'Wurzeln',
    calculatorAllowed: true,
    track: 1,
    component: <RootEquations />,
  },
  'plot-function-1': {
    title: 'Graphen skizzieren',
    subtitle: 'Ganzrationale Funktionen',
    calculatorAllowed: true,
    track: 1,
    component: <PlotFunction />,
  },
  'plot-function-2': {
    title: 'Graphen skizzieren',
    subtitle: 'Exponentialfunktionen',
    calculatorAllowed: true,
    track: 1,
    component: <PlotFunction2 />,
  },
  'asymptote-1': {
    title: 'Definitions-, Wertebereich und Asymptote',
    subtitle: 'Ganzrationale Funktionen',
    calculatorAllowed: true,
    track: 1,
    component: <Asymptote1 />,
  },
  'asymptote-2': {
    title: 'Definitions-, Wertebereich und Asymptote',
    subtitle: 'Exponentialfunktionen',
    calculatorAllowed: true,
    track: 1,
    component: <Asymptote2 />,
  },
  'oblique-image-1': {
    title: 'Schrägbilder zeichnen',
    subtitle: 'Geometrie',
    calculatorAllowed: true,
    track: 1,
    component: <ObliqueImage />,
  },
  'mapping-graphs-1': {
    title: 'Graphen verschieben',
    subtitle: 'Funktionen',
    calculatorAllowed: true,
    track: 1,
    component: <AbbildungGraphen />,
  },
  'mapping-graphs-2': {
    title: 'Graphen spiegeln',
    subtitle: 'Funktionen',
    calculatorAllowed: true,
    track: 1,
    component: <AbbildungGraphen2 />,
  },
  'normalform-1': {
    title: 'Normalform einer Parabel',
    subtitle: 'Quadratische Funktionen',
    calculatorAllowed: false,
    track: 2,
    component: <NormalformParabola />,
  },
  'scheitelform-1': {
    title: 'Scheitelform einer Parabel',
    subtitle: 'Quadratische Funktionen',
    calculatorAllowed: false,
    track: 2,
    component: <VertexParabola />,
  },

  'abcformel-1': {
    title: 'ABC-Formel',
    subtitle: 'Quadratische Gleichungen',
    calculatorAllowed: false,
    track: 2,
    component: <ABCFormular />,
  },
  'value-set-parabolas': {
    title: 'Wertemenge von Parabeln',
    subtitle: 'Quadratische Funktionen',
    calculatorAllowed: false,
    track: 2,
    component: <ValueSetParabola />,
  },
  'modelling-parabolas': {
    title: 'Modellieren mit Parabeln',
    subtitle: 'Quadratische Funktionen',
    calculatorAllowed: false,
    track: 2,
    component: <ModellingParabola />,
  },
  'parabolas-by-characteristics': {
    title: 'Parabel aus Punkten bestimmen',
    subtitle: 'Quadratische Funktionen',
    calculatorAllowed: true,
    track: 2,
    component: <ParabolaCharacteristics />,
  },
  'volumen-pyramide-1': {
    title: 'Volumen einer Pyramide',
    subtitle: 'vierseitig',
    calculatorAllowed: true,
    track: 2,
    component: <VolumePyramide />,
  },
  'volumen-pyramide-2': {
    title: 'Volumen einer Pyramide',
    subtitle: 'dreiseitig',
    calculatorAllowed: true,
    track: 2,
    component: <VolumeThreePyramide />,
  },
  'oberflaeche-pyramide-1': {
    title: 'Oberfläche einer Pyramide',
    subtitle: 'vierseitig',
    calculatorAllowed: true,
    track: 2,
    component: <SurfacePyramide />,
  },
  'oberflaeche-pyramide-2': {
    title: 'Oberfläche einer Pyramide',
    subtitle: 'dreiseitig',
    calculatorAllowed: true,
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
