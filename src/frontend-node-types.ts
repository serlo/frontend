import { LicenseData } from './data-types'
import { BoxType } from './edtr-io/plugins/box/renderer'
import { PageTeamRendererProps } from './edtr-io/plugins/page-team/renderer'
import { TableType } from './edtr-io/plugins/serlo-table/renderer'

// The actual content of the page.

// The frontend defines it's own content format that bridges the gap between legacy and edtr-io state.
// Will switch to edtr-io state one day.
// Until then: Here are the types the frontend expects after converting

export enum FrontendNodeType {
  Text = 'text',
  A = 'a',
  Article = 'article',
  InlineMath = 'inline-math',
  P = 'p',
  SlateP = 'slate-p',
  SlateContainer = 'slate-container',
  H = 'h',
  Math = 'math',
  Img = 'img',
  SpoilerContainer = 'spoiler-container',
  SpoilerTitle = 'spoiler-title',
  SpoilerBody = 'spoiler-body',
  Ul = 'ul',
  Ol = 'ol',
  Li = 'li',
  Multimedia = 'multimedia',
  Row = 'row',
  Col = 'col',
  Important = 'important',
  Blockquote = 'blockquote',
  Box = 'box',
  Anchor = 'anchor',
  SerloTable = 'serlo-table',
  SerloGallery = 'serlo-gallery',
  SerloTr = 'serlo-tr',
  SerloTd = 'serlo-td',
  Table = 'table',
  Tr = 'tr',
  Th = 'th',
  Td = 'td',
  Geogebra = 'geogebra',
  Injection = 'injection',
  Exercise = 'exercise',
  Solution = 'solution',
  ExerciseGroup = 'exercise-group',
  Video = 'video',
  Code = 'code',
  Equations = 'equations',
  PageLayout = 'pageLayout',
  PageTeam = 'pageTeam',
}

export interface FrontendTextNode {
  type: FrontendNodeType.Text
  text: string
  color?: FrontendTextColor
  em?: boolean
  strong?: boolean
  code?: boolean
  children?: undefined
}

export type FrontendTextColor = 'blue' | 'green' | 'orange'

export interface FrontendANode {
  type: FrontendNodeType.A
  href: string
  children?: FrontendContentNode[]
}

export interface ArticleNodeUuidLink {
  id: string
  title: string
}

export interface FrontendArticleNode {
  type: FrontendNodeType.Article
  introduction: FrontendContentNode[]
  content: FrontendContentNode[]
  exercises: FrontendContentNode[]
  exerciseFolder: ArticleNodeUuidLink
  relatedContent?: {
    articles: ArticleNodeUuidLink[]
    courses: ArticleNodeUuidLink[]
    videos: ArticleNodeUuidLink[]
  }
  sources: {
    href: string
    title: string
  }[]
  children?: undefined
}

export interface FrontendInlineMathNode {
  type: FrontendNodeType.InlineMath
  formula: string
  formulaSource?: string
  children?: undefined
}

export interface FrontendPNode {
  type: FrontendNodeType.P
  children?: FrontendContentNode[]
}

export interface FrontendSlatePNode {
  type: FrontendNodeType.SlateP
  children?: FrontendContentNode[]
}

export interface FrontendSlateContainerNode {
  type: FrontendNodeType.SlateContainer
  children?: FrontendContentNode[]
}

export interface FrontendHNode {
  type: FrontendNodeType.H
  level: 1 | 2 | 3 | 4 | 5
  id?: string
  children?: FrontendContentNode[]
}

export interface FrontendMathNode {
  type: FrontendNodeType.Math
  formula: string
  formulaSource?: string
  children?: undefined
  alignCenter?: boolean
}

export interface FrontendImgNode {
  type: FrontendNodeType.Img
  src: string
  href?: string
  alt: string
  maxWidth?: number
  caption?: FrontendContentNode[]
  children?: undefined
}

export interface FrontendSpoilerContainerNode {
  type: FrontendNodeType.SpoilerContainer
  children: [FrontendSpoilerTitleNode, FrontendSpoilerBodyNode]
}

export interface FrontendSpoilerTitleNode {
  type: FrontendNodeType.SpoilerTitle
  children?: FrontendContentNode[]
}

export interface FrontendSpoilerBodyNode {
  type: FrontendNodeType.SpoilerBody
  children?: FrontendContentNode[]
}

export interface FrontendUlNode {
  type: FrontendNodeType.Ul
  children?: FrontendLiNode[]
}

export interface FrontendOlNode {
  type: FrontendNodeType.Ol
  children?: FrontendLiNode[]
}

export interface FrontendLiNode {
  type: FrontendNodeType.Li
  children?: FrontendContentNode[]
}

export interface FrontendMultiMediaNode {
  type: FrontendNodeType.Multimedia
  float?: 'left' | 'right'
  mediaWidth: number
  media: FrontendContentNode[]
  children: FrontendContentNode[]
}

export interface FrontendRowNode {
  type: FrontendNodeType.Row
  children?: FrontendColNode[]
}

export interface FrontendColNode {
  type: FrontendNodeType.Col
  size: number
  float?: 'left' | 'right'
  children?: FrontendContentNode[]
}

export interface FrontendImportantNode {
  type: FrontendNodeType.Important
  children?: FrontendContentNode[]
}

export interface FrontendBlockquoteNode {
  type: FrontendNodeType.Blockquote
  children?: FrontendContentNode[]
}

export interface FrontendBoxNode {
  type: FrontendNodeType.Box
  boxType: BoxType
  title?: FrontendContentNode[]
  anchorId: string
  children?: FrontendContentNode[]
}

export interface FrontendAnchorNode {
  type: FrontendNodeType.Anchor
  id: string
  children?: undefined
}

export interface FrontendSerloGalleryNode {
  children?: FrontendImgNode[]
}

export interface FrontendSerloTableNode {
  type: FrontendNodeType.SerloTable
  children?: FrontendSerloTrNode[]
  tableType: keyof typeof TableType | string
}

export interface FrontendSerloTrNode {
  type: FrontendNodeType.SerloTr
  children?: FrontendSerloTdNode[]
}

export interface FrontendSerloTdNode {
  type: FrontendNodeType.SerloTd
  children?: FrontendContentNode[]
}

export interface FrontendTableNode {
  type: FrontendNodeType.Table
  children?: FrontendTrNode[]
}

export interface FrontendTrNode {
  type: FrontendNodeType.Tr
  children?: (FrontendThNode | FrontendTdNode)[]
}

export interface FrontendThNode {
  type: FrontendNodeType.Th
  children?: FrontendContentNode[]
}

export interface FrontendTdNode {
  type: FrontendNodeType.Td
  children?: FrontendContentNode[]
}

export interface FrontendGeogebraNode {
  type: FrontendNodeType.Geogebra
  id: string
  children?: undefined
}

export interface FrontendInjectionNode {
  type: FrontendNodeType.Injection
  href: string
  children?: undefined
}

interface BareSolution {
  legacy?: FrontendContentNode[]
  edtrState?: SolutionEdtrState
  license?: LicenseData
  trashed: boolean
}

export interface FrontendExerciseNode {
  type: FrontendNodeType.Exercise
  trashed?: boolean
  task: {
    legacy?: FrontendContentNode[]
    edtrState?: TaskEdtrState
    license?: LicenseData
  }
  solution: BareSolution
  grouped?: boolean
  positionInGroup?: number
  positionOnPage?: number
  context: {
    id: number
    parent?: number
    solutionId?: number
  }
  children?: undefined
  href?: string
  unrevisedRevisions?: number
}

export interface FrontendSolutionNode {
  type: FrontendNodeType.Solution
  solution: BareSolution

  context: {
    id: number
  }
  href?: string
  children?: undefined
  unrevisedRevisions?: number
}

export interface TaskEdtrState {
  content: FrontendContentNode[] // edtr-io plugin "exercise"
  interactive?: EdtrPluginScMcExercise | EdtrPluginInputExercise
}

export interface SolutionEdtrState {
  prerequisite?: {
    // edtr-io plugin "solution"
    id?: number
    href?: string // added, the resolved alias
    title: string
  }
  strategy: FrontendContentNode[]
  steps: FrontendContentNode[]
}

export interface EdtrPluginScMcExercise {
  plugin: 'scMcExercise' // edtr-io plugin
  state: {
    answers: {
      isCorrect: boolean
      feedback: FrontendContentNode[]
      content: FrontendContentNode[]
      originalIndex: number
    }[]
    isSingleChoice?: boolean
  }
}

export interface EdtrPluginInputExercise {
  plugin: 'inputExercise' // edtr-io plugin
  state: {
    type:
      | 'input-number-exact-match-challenge'
      | 'input-string-normalized-match-challenge'
      | 'input-expression-equal-match-challenge'
    answers: {
      value: string
      isCorrect: boolean
      feedback: FrontendContentNode[]
    }[]
    unit: string
  }
}

export interface FrontendExerciseGroupNode {
  type: FrontendNodeType.ExerciseGroup
  license?: LicenseData
  positionOnPage?: number
  content: FrontendContentNode[]
  children?: FrontendExerciseNode[]
  context: {
    id: number
  }
  href?: string
  unrevisedRevisions?: number
}

export interface FrontendVideoNode {
  type: FrontendNodeType.Video
  src: string
  children?: undefined
  license?: LicenseData
}

export interface FrontendCodeNode {
  type: FrontendNodeType.Code
  code: string
  language: string
  showLineNumbers: boolean
  children?: undefined
}

export enum Sign {
  Equals = 'equals',
  GreaterThan = 'greater-than',
  GreaterThanOrEqual = 'greater-than-or-equal',
  LessThan = 'less-than',
  LessThanOrEqual = 'less-than-or-equal',
  AlmostEqualTo = 'almost-equal-to',
}

export interface FrontendEquationsNode {
  type: FrontendNodeType.Equations
  steps: {
    left: string
    leftSource?: string
    sign: Sign
    right: string
    rightSource?: string
    transform: string
    transformSource?: string
    explanation: FrontendContentNode[]
  }[]
  firstExplanation: FrontendContentNode[]
  transformationTarget: 'term' | 'equation'
  children?: undefined
}

export interface FrontendPageLayoutNode {
  type: FrontendNodeType.PageLayout
  column1: FrontendContentNode[]
  column2: FrontendContentNode[]
  widthPercent: number
  children?: undefined
}

export type FrontendPageTeamNode = PageTeamRendererProps & {
  type: FrontendNodeType.PageTeam
  children?: undefined
}

export type FrontendVoidNode =
  | FrontendInlineMathNode
  | FrontendMathNode
  | FrontendImgNode
  | FrontendAnchorNode
  | FrontendGeogebraNode
  | FrontendInjectionNode
  | FrontendExerciseNode
  | FrontendSolutionNode
  | FrontendVideoNode
  | FrontendCodeNode
  | FrontendEquationsNode

export type FrontendElementNode =
  | FrontendANode
  | FrontendPNode
  | FrontendHNode
  | FrontendSpoilerTitleNode
  | FrontendSpoilerBodyNode
  | FrontendLiNode
  | FrontendColNode
  | FrontendImportantNode
  | FrontendBlockquoteNode
  | FrontendBoxNode
  | FrontendThNode
  | FrontendTdNode
  | FrontendSerloTdNode
  | FrontendSlatePNode
  | FrontendSlateContainerNode

export type FrontendRestrictedElementNode =
  | FrontendArticleNode
  | FrontendSpoilerContainerNode
  | FrontendTableNode
  | FrontendSerloTableNode
  | FrontendSerloTrNode
  | FrontendSpoilerContainerNode
  | FrontendUlNode
  | FrontendOlNode
  | FrontendRowNode
  | FrontendMultiMediaNode
  | FrontendTrNode
  | FrontendExerciseGroupNode
  | FrontendPageLayoutNode
  | FrontendPageTeamNode

export type FrontendContentNode =
  | FrontendTextNode
  | FrontendVoidNode
  | FrontendElementNode
  | FrontendRestrictedElementNode
