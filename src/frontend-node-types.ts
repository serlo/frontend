import { LicenseData } from './data-types'
import { BoxType } from './edtr-io/plugins/box/renderer'
import { PageTeamRendererProps } from './edtr-io/plugins/page-team/renderer'
import { TableType } from './edtr-io/plugins/serlo-table/renderer'

// The actual content of the page.

// The frontend defines it's own content format that bridges the gap between legacy and edtr-io state.
// Will switch to edtr-io state one day.
// Until then: Here are the types the frontend expects after converting

export interface FrontendTextNode {
  type: 'text'
  text: string
  color?: FrontendTextColor
  em?: boolean
  strong?: boolean
  code?: boolean
  children?: undefined
}

export type FrontendTextColor = 'blue' | 'green' | 'orange'

export interface FrontendANode {
  type: 'a'
  href: string
  children?: FrontendContentNode[]
}

export interface ArticleNodeUuidLink {
  id: string
  title: string
}

export interface FrontendArticleNode {
  type: 'article'
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
  type: 'inline-math'
  formula: string
  formulaSource?: string
  children?: undefined
}

export interface FrontendPNode {
  type: 'p'
  children?: FrontendContentNode[]
}

export interface FrontendSlatePNode {
  type: 'slate-p'
  children?: FrontendContentNode[]
}

export interface FrontendSlateContainerNode {
  type: 'slate-container'
  children?: FrontendContentNode[]
}

export interface FrontendHNode {
  type: 'h'
  level: 1 | 2 | 3 | 4 | 5
  id?: string
  children?: FrontendContentNode[]
}

export interface FrontendMathNode {
  type: 'math'
  formula: string
  formulaSource?: string
  children?: undefined
  alignCenter?: boolean
}

export interface FrontendImgNode {
  type: 'img'
  src: string
  href?: string
  alt: string
  maxWidth?: number
  caption?: FrontendContentNode[]
  children?: undefined
}

export interface FrontendSpoilerContainerNode {
  type: 'spoiler-container'
  children: [FrontendSpoilerTitleNode, FrontendSpoilerBodyNode]
}

export interface FrontendSpoilerTitleNode {
  type: 'spoiler-title'
  children?: FrontendContentNode[]
}

export interface FrontendSpoilerBodyNode {
  type: 'spoiler-body'
  children?: FrontendContentNode[]
}

export interface FrontendUlNode {
  type: 'ul'
  children?: FrontendLiNode[]
}

export interface FrontendOlNode {
  type: 'ol'
  children?: FrontendLiNode[]
}

export interface FrontendLiNode {
  type: 'li'
  children?: FrontendContentNode[]
}

export interface FrontendMultiMediaNode {
  type: 'multimedia'
  float?: 'left' | 'right'
  mediaWidth: number
  media: FrontendContentNode[]
  children: FrontendContentNode[]
}

export interface FrontendRowNode {
  type: 'row'
  children?: FrontendColNode[]
}

export interface FrontendColNode {
  type: 'col'
  size: number
  float?: 'left' | 'right'
  children?: FrontendContentNode[]
}

export interface FrontendImportantNode {
  type: 'important'
  children?: FrontendContentNode[]
}

export interface FrontendBlockquoteNode {
  type: 'blockquote'
  children?: FrontendContentNode[]
}

export interface FrontendBoxNode {
  type: 'box'
  boxType: BoxType
  title?: FrontendContentNode[]
  anchorId: string
  children?: FrontendContentNode[]
}

export interface FrontendAnchorNode {
  type: 'anchor'
  id: string
  children?: undefined
}

export interface FrontendSerloTableNode {
  type: 'serlo-table'
  children?: FrontendSerloTrNode[]
  tableType: keyof typeof TableType | string
}

export interface FrontendSerloTrNode {
  type: 'serlo-tr'
  children?: FrontendSerloTdNode[]
}

export interface FrontendSerloTdNode {
  type: 'serlo-td'
  children?: FrontendContentNode[]
}

export interface FrontendTableNode {
  type: 'table'
  children?: FrontendTrNode[]
}

export interface FrontendTrNode {
  type: 'tr'
  children?: (FrontendThNode | FrontendTdNode)[]
}

export interface FrontendThNode {
  type: 'th'
  children?: FrontendContentNode[]
}

export interface FrontendTdNode {
  type: 'td'
  children?: FrontendContentNode[]
}

export interface FrontendGeogebraNode {
  type: 'geogebra'
  id: string
  children?: undefined
}

export interface FrontendInjectionNode {
  type: 'injection'
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
  type: 'exercise'
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
  type: 'solution'
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
  type: 'exercise-group'
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
  type: 'video'
  src: string
  children?: undefined
  license?: LicenseData
}

export interface FrontendCodeNode {
  type: 'code'
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
  type: 'equations'
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
  type: 'pageLayout'
  column1: FrontendContentNode[]
  column2: FrontendContentNode[]
  widthPercent: number
  children?: undefined
}

export type FrontendPageTeamNode = PageTeamRendererProps & {
  type: 'pageTeam'
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
