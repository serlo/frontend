/* eslint-disable import/no-cycle */
import { ABCFormular } from '../exercise-implementations/abc-formular'
import { AnimalsInForest } from '../exercise-implementations/animals-in-forest'
import { Asymptote1 } from '../exercise-implementations/asymptote-1'
import { Asymptote2 } from '../exercise-implementations/asymptote-2'
import { Ball } from '../exercise-implementations/ball'
import { CircleSector } from '../exercise-implementations/circle-sector'
import { CompareGrowth } from '../exercise-implementations/compare-growth'
import { CompletingTheSquare } from '../exercise-implementations/completing-the-square'
import { Cone } from '../exercise-implementations/cone'
import { Cylinder } from '../exercise-implementations/cylinder'
import { DescribeGraphPowerFunction } from '../exercise-implementations/describe-graph-power-function'
import { ExponentialFunction } from '../exercise-implementations/exponential-function-1'
import { ExponentialFunctionTime } from '../exercise-implementations/exponential-function-2'
import { ExponentialEquation } from '../exercise-implementations/exponential-function-3'
import { FindExponentialFunction } from '../exercise-implementations/find-exponential-function'
import { FindParabola } from '../exercise-implementations/find-parabola'
import { IceCreamShop } from '../exercise-implementations/ice-cream-shop'
import { ImportantApps } from '../exercise-implementations/important-apps'
import { IntersectingLines } from '../exercise-implementations/intersecting-lines'
import { IsAreaPossible } from '../exercise-implementations/is-area-possible'
import { LawOfSinesCosines } from '../exercise-implementations/law-of-sines-cosines'
import { LogarithmEquation } from '../exercise-implementations/logarithm-equation'
import { LogarithmExercise1 } from '../exercise-implementations/logarithm-exercise-1'
import { LogarithmExercise2 } from '../exercise-implementations/logarithm-exericse-2'
// import { AbbildungGraphen } from '../exercise-implementations/mapping-graphs-1'
// import { AbbildungGraphen2 } from '../exercise-implementations/mapping-graphs-2'
import { MirrorLineThroughOrigin } from '../exercise-implementations/mirror-line-through-origin'
import { ModellingParabola } from '../exercise-implementations/modelling-parabolax'
import { NormalformParabola } from '../exercise-implementations/normalform-parabola'
import { ObliqueImage } from '../exercise-implementations/oblique-image'
import { ParabolaCharacteristics } from '../exercise-implementations/parabola-by-characteristics'
import { Parallelogram1 } from '../exercise-implementations/parallelogram-1'
import { Parallelogram2 } from '../exercise-implementations/parallelogram-2'
import { Parallelogram3 } from '../exercise-implementations/parallelogram-3'
import { ParametricArea } from '../exercise-implementations/parametric-area'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PlaceholderExercise } from '../exercise-implementations/placeholder-exercise'
import { PlotFunction } from '../exercise-implementations/plot-function-1'
import { PlotFunction2 } from '../exercise-implementations/plot-function-2'
import { PowerFunctionTriangle } from '../exercise-implementations/power-function-triangle'
import { RightTriangle } from '../exercise-implementations/right-triangle'
import { RootEquations } from '../exercise-implementations/root-equations'
import { RotatePoint } from '../exercise-implementations/rotate-point'
import { TimeToDouble } from '../exercise-implementations/time-to-double'
import { Tombola } from '../exercise-implementations/tombola'
import { TransformGraph } from '../exercise-implementations/transform-graph'
import { Trapezoid } from '../exercise-implementations/trapezoid'
import { TreeDiagram } from '../exercise-implementations/tree-diagram'
import { TriangleArea } from '../exercise-implementations/triangle-area'
// import { SurfacePyramide } from '../exercise-implementations/surface-pyramide'
// import { SurfaceThreePyramide } from '../exercise-implementations/surface-pyramide-2'
import { Trigonometry } from '../exercise-implementations/trigonometry'
import { Trigonometry1 } from '../exercise-implementations/trigonometry-1'
import { Trigonometry2 } from '../exercise-implementations/trigonometry-2'
import { Trigonometry3 } from '../exercise-implementations/trigonometry-3'
import { ValueSetParabola } from '../exercise-implementations/value-set-parabola'
import { VertexParabola } from '../exercise-implementations/vertex-parabola'
import { VolumePyramide } from '../exercise-implementations/volume-pyramide'
import { WheelOfFortune } from '../exercise-implementations/wheel-of-fortune/wheel-of-fortune'
import { WheelOfFortuneStepByStep } from '../exercise-implementations/wheel-of-fortune/wheel-of-fortune-step-by-step'
// import { VolumeThreePyramide } from '../exercise-implementations/volume-pyramide-2'

//track:  1 = Mathe-Zweig 1, 2 = Mathe-Zweig 2 & 3, 3 = beide Zweige

export type TaskKey = keyof typeof middleSchoolFinalExam

export interface MiddleSchoolTask {
  title: string
  subtitle: string
  calculatorAllowed: boolean
  difficulty?: 1 | 2 | 3
  track: 1 | 2 | 3
  component: JSX.Element
}

export type MiddleSchoolTasks = Record<TaskKey, MiddleSchoolTask>

export const middleSchoolFinalExam = {
  // Mathe-Zweig Teil A
  'potenzfunktionen-graphen-beschreiben': {
    title: 'Funktionsgraph beschreiben',
    subtitle: 'Potenzfunktionen',
    difficulty: 1,
    calculatorAllowed: false,
    track: 1,
    component: <DescribeGraphPowerFunction />,
  },
  'exponential-funktion-aufstellen': {
    title: 'Funktion aufstellen',
    subtitle: 'Exponentialfunktion',
    difficulty: 1,
    calculatorAllowed: false,
    track: 3,
    component: <FindExponentialFunction />,
  },
  'exponential-funktion-gleichung-loesen': {
    title: 'Gleichung lösen',
    subtitle: 'Exponentialfunktion',
    difficulty: 1,
    calculatorAllowed: false,
    track: 3,
    component: <ExponentialEquation />,
  },
  'logarithmus-im-kopf': {
    title: 'Im Kopf rechnen',
    subtitle: 'Logarithmus',
    difficulty: 1,
    calculatorAllowed: false,
    track: 3,
    component: <LogarithmEquation />,
  },
  'logarithmus-1': {
    title: 'Terme zusammenfassen 1',
    subtitle: 'Logarithmus',
    difficulty: 2,
    calculatorAllowed: false,
    track: 1,
    component: <LogarithmExercise1 />,
  },
  'logarithmus-2': {
    title: 'Terme zusammenfassen 2',
    subtitle: 'Logarithmus',
    difficulty: 3,
    calculatorAllowed: false,
    track: 1,
    component: <LogarithmExercise2 />,
  },
  strahlensatz: {
    title: 'Strahlensatz Einführung',
    subtitle: 'Geometrie',
    difficulty: 1,
    calculatorAllowed: false,
    track: 3,
    component: <Trigonometry1 />,
  },
  kosinussatz: {
    title: 'Kosinussatz Einführung',
    subtitle: 'Trigonometrie',
    difficulty: 1,
    calculatorAllowed: false,
    track: 3,
    component: <Trigonometry />,
  },
  'parallelogramm-einzeichnen': {
    title: 'Parallelogramm einzeichnen',
    subtitle: 'Trigonometrie',
    difficulty: 1,
    calculatorAllowed: false,
    track: 1,
    component: <Parallelogram1 />,
  },
  'winkelmass-berechnen': {
    title: 'Winkelmaß berechnen',
    subtitle: 'Trigonometrie',
    difficulty: 2,
    calculatorAllowed: false,
    track: 1,
    component: <Parallelogram2 />,
  },
  'punkt-darstellen-in-abhaengigkeit': {
    title: 'Punkt darstellen in Abhängigkeit',
    subtitle: 'Trigonometrie',
    difficulty: 2,
    calculatorAllowed: false,
    track: 1,
    component: <Parallelogram3 />,
  },
  'schraegbild-zeichnen': {
    title: 'Schrägbild zeichnen',
    subtitle: 'Raumgeometrie',
    difficulty: 1,
    calculatorAllowed: false,
    track: 3,
    component: <ObliqueImage />,
  },
  // Einschub Zweig 2
  'normalform-parabel': {
    title: 'Normalform einer Parabel',
    subtitle: 'Quadratische Funktionen',
    difficulty: 1,
    calculatorAllowed: false,
    track: 2,
    component: <NormalformParabola />,
  },
  'scheitelform-parabel': {
    title: 'Scheitelform einer Parabel',
    subtitle: 'Quadratische Funktionen',
    difficulty: 1,
    calculatorAllowed: false,
    track: 2,
    component: <VertexParabola />,
  },
  'losesungsformel-quadratische-gleichung': {
    title: 'Lösungsformel',
    subtitle: 'Quadratische Gleichungen',
    difficulty: 1,
    calculatorAllowed: false,
    track: 2,
    component: <ABCFormular />,
  },
  'quadratische-ergaenzung': {
    title: 'Quadratische Ergänzung',
    subtitle: 'Quadratische Funktionen',
    difficulty: 3,
    calculatorAllowed: false,
    track: 2,
    component: <CompletingTheSquare />,
  },
  'wertemenge-parabel': {
    title: 'Wertemenge der Parabel',
    subtitle: 'Quadratische Funktionen',
    difficulty: 1,
    calculatorAllowed: false,
    track: 2,
    component: <ValueSetParabola />,
  },
  'modellierung-mit-parabeln': {
    title: 'Modellieren mit Parabeln',
    subtitle: 'Quadratische Funktionen',
    difficulty: 2,
    calculatorAllowed: false,
    track: 2,
    component: <ModellingParabola />,
  },
  // Ende Einschub
  'gluecksrad-einfuehrung': {
    title: 'Glücksrad Einführung',
    subtitle: 'Daten und Zufall',
    calculatorAllowed: false,
    difficulty: 1,
    track: 3,
    component: <WheelOfFortuneStepByStep />,
  },
  gluecksrad: {
    title: 'Glücksrad',
    subtitle: 'Daten und Zufall',
    difficulty: 1,
    calculatorAllowed: false,
    track: 3,
    component: <WheelOfFortune />,
  },
  eisdiele: {
    title: 'Eisdiele',
    subtitle: 'Daten und Zufall',
    difficulty: 2,
    calculatorAllowed: false,
    track: 3,
    component: <IceCreamShop />,
  },
  'punkt-drehen': {
    title: 'Punkt drehen',
    subtitle: 'Abbildungen',
    difficulty: 2,
    calculatorAllowed: false,
    track: 1,
    component: <RotatePoint />,
  },
  // Mathe-Zweig, Teil B
  'definitions-wertemenge-asymptoten-potenzfunktionen': {
    title: 'Definitions-, Wertemenge und Asymptoten',
    subtitle: 'Potenzfunktionen',
    calculatorAllowed: true,
    track: 1,
    component: <Asymptote1 />,
  },
  'graph-zeichnen-potenzfunktion': {
    title: 'Graph zeichnen',
    subtitle: 'Potenzfunktionen',
    calculatorAllowed: true,
    track: 1,
    component: <PlotFunction />,
  },
  'potenzfunktion-verschieben-spiegeln': {
    title: 'Graph verschieben/spiegeln',
    subtitle: 'Potenzfunktionen',
    calculatorAllowed: true,
    track: 1,
    difficulty: 2,
    component: <TransformGraph />,
  },
  'dreiecksflaeche-in-abhaengigkeit': {
    title: 'Dreiecksfläche in Abhängigkeit',
    subtitle: 'Potenzfunktionen',
    calculatorAllowed: true,
    track: 1,
    difficulty: 2,
    component: <PowerFunctionTriangle />,
  },
  'graph-skizzieren-exponentialfunktion': {
    title: 'Graph skizzieren',
    subtitle: 'Exponentialfunktionen',
    calculatorAllowed: true,
    track: 1,
    component: <PlotFunction2 />,
  },
  'eigenschaften-exponentialfunktion': {
    title: 'Eigenschaften bestimmen',
    subtitle: 'Exponentialfunktionen',
    calculatorAllowed: true,
    track: 1,
    component: <Asymptote2 />,
  },
  'kapital-berechnen': {
    title: 'Kapital berechnen',
    subtitle: 'Exponentialfunktion',
    difficulty: 1,
    calculatorAllowed: true,
    track: 3,
    component: <ExponentialFunction />,
  },
  'anlagezeit-berechnen': {
    title: 'Anlagezeit berechnen',
    subtitle: 'Exponentialfunktion',
    difficulty: 2,
    calculatorAllowed: true,
    track: 3,
    component: <ExponentialFunctionTime />,
  },
  'taegliche-uebung-exponentialfunktion': {
    title: 'Tägliches Üben',
    subtitle: 'Exponentialfunktion',
    calculatorAllowed: true,
    track: 3,
    difficulty: 1,
    component: <TimeToDouble />,
  },
  'wachstum-vergleichen': {
    title: 'Wachstum vergleichen',
    subtitle: 'Exponentialfunktion',
    calculatorAllowed: true,
    track: 3,
    difficulty: 1,
    component: <CompareGrowth />,
  },
  'follower-wachstum-exponentialfunktion': {
    title: 'Follower-Wachstum',
    subtitle: 'Exponentialfunktion',
    calculatorAllowed: true,
    track: 1,
    difficulty: 3,
    component: <RootEquations />,
  },
  'tiere-im-wald-exponentialfunktion': {
    title: 'Tiere im Wald',
    subtitle: 'Exponentialfunktion',
    calculatorAllowed: true,
    track: 1,
    difficulty: 3,
    component: <AnimalsInForest />,
  },
  'trapez-akrobatik': {
    title: 'Trapez Akrobatik',
    subtitle: 'Geometrie',
    calculatorAllowed: true,
    track: 3,
    difficulty: 1,
    component: <Trapezoid />,
  },
  'pizza-stueck-kreissektor': {
    title: 'Pizza-Stück',
    subtitle: 'Geometrie',
    calculatorAllowed: true,
    track: 3,
    difficulty: 1,
    component: <CircleSector />,
  },
  'strahlensatz-2': {
    title: 'Strahlensatz',
    subtitle: 'Trigonometrie',
    calculatorAllowed: true,
    track: 3,
    difficulty: 1,
    component: <IntersectingLines />,
  },
  'rechtwinkliges-dreieck': {
    title: 'Rechtwinkliges Dreieck',
    subtitle: 'Trigonometrie',
    calculatorAllowed: true,
    track: 3,
    difficulty: 1,
    component: <RightTriangle />,
  },
  'sinus-oder-kosinussatz': {
    title: 'Sinus- oder Kosinussatz?',
    subtitle: 'Trigonometrie',
    calculatorAllowed: true,
    track: 3,
    difficulty: 1,
    component: <LawOfSinesCosines />,
  },
  'flaecheninhalt-dreieck': {
    title: 'Flächeninhalt Dreieck',
    subtitle: 'Trigonometrie',
    calculatorAllowed: true,
    track: 3,
    difficulty: 1,
    component: <TriangleArea />,
  },
  'beach-bar-anwendung-trigonometrie': {
    title: 'Beach-Bar',
    subtitle: 'Trigonometrie',
    calculatorAllowed: true,
    difficulty: 2,
    track: 3,
    component: <Trigonometry3 />,
  },
  'knifflige-aufgabe': {
    title: 'Knifflige Aufgabe',
    subtitle: 'Trigonometrie',
    calculatorAllowed: true,
    difficulty: 3,
    track: 3,
    component: <Trigonometry2 />,
  },
  'volumen-pyramide': {
    title: 'Volumen einer Pyramide',
    subtitle: 'Raumgeometrie',
    calculatorAllowed: true,
    difficulty: 1,
    track: 3,
    component: <VolumePyramide />,
  },
  'volumen-zylinder': {
    title: 'Zylinder',
    subtitle: 'Raumgeometrie',
    calculatorAllowed: true,
    difficulty: 1,
    track: 3,
    component: <Cylinder />,
  },
  'volumen-kegel': {
    title: 'Kegel',
    subtitle: 'Raumgeometrie',
    calculatorAllowed: true,
    difficulty: 1,
    track: 3,
    component: <Cone />,
  },
  'volumen-kugel': {
    title: 'Kugel',
    subtitle: 'Raumgeometrie',
    calculatorAllowed: true,
    difficulty: 1,
    track: 3,
    component: <Ball />,
  },
  'parabel-bestimmen': {
    title: 'Parabel bestimmen',
    subtitle: 'Quadratische Funktionen',
    calculatorAllowed: true,
    difficulty: 1,
    track: 2,
    component: <FindParabola />,
  },
  'parabel-aus-punkten-bestimmen': {
    title: 'Parabel aus Punkten bestimmen',
    subtitle: 'Quadratische Funktionen',
    calculatorAllowed: true,
    track: 2,
    difficulty: 2,
    component: <ParabolaCharacteristics />,
  },
  'flaecheninhalt-in-abhaengigkeit': {
    title: 'Flächeninhalt in Abhängigkeit',
    subtitle: 'Quadratische Funktionen',
    calculatorAllowed: true,
    difficulty: 2,
    track: 2,
    component: <ParametricArea />,
  },
  'flaecheninhalt-moeglich': {
    title: 'Flächeninhalt möglich?',
    subtitle: 'Quadratische Gleichungen',
    calculatorAllowed: true,
    difficulty: 1,
    track: 2,
    component: <IsAreaPossible />,
  },
  'baumdiagramm-zeichnen': {
    title: 'Baumdiagramm zeichnen',
    subtitle: 'Daten und Zufall',
    calculatorAllowed: true,
    track: 3,
    difficulty: 1,
    component: <TreeDiagram />,
  },
  'wichtige-apps-daten-auslesen': {
    title: 'Wichtige Apps',
    subtitle: 'Daten und Zufall',
    calculatorAllowed: true,
    track: 3,
    difficulty: 1,
    component: <ImportantApps />,
  },
  'verlosung-wahrscheinlichkeit-berechnen': {
    title: 'Verlosung',
    subtitle: 'Daten und Zufall',
    calculatorAllowed: true,
    track: 3,
    difficulty: 1,
    component: <Tombola />,
  },
  'ursprungsgerade-spiegeln': {
    title: 'An Ursprungsgerade spiegeln',
    subtitle: 'Abbildungen',
    calculatorAllowed: true,
    track: 1,
    difficulty: 2,
    component: <MirrorLineThroughOrigin />,
  },
  /*'mapping-graphs-1': {
    title: 'Graphen verschieben 🚧',
    subtitle: 'Funktionen',
    calculatorAllowed: true,
    track: 1,
    component: <AbbildungGraphen />,
  },
  'mapping-graphs-2': {
    title: 'Graphen spiegeln 🚧',
    subtitle: 'Funktionen',
    calculatorAllowed: true,
    track: 1,
    component: <AbbildungGraphen2 />,
  },*/
  /*'volumen-pyramide-2': {
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
  },*/
} as const

/*

Construction sign: 🚧

Template for new exercise

import { SelfEvaluationExercise } from './self-evaluation-exercise'

export function RotatePoint() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return null
      }}
      renderTask={() => {
        return <></>
      }}
      renderSolution={() => {
        return <></>
      }}
    />
  )
}

*/
