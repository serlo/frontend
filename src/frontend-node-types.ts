import type { LicenseData } from './data-types'
import type { BoxType } from './serlo-editor/plugins/box/renderer'
import { Sign } from './serlo-editor/plugins/equations/sign'
import type { PageTeamRendererProps } from './serlo-editor/plugins/page-team/renderer'
import { TableType } from './serlo-editor/plugins/serlo-table/renderer'
import type { CustomText } from './serlo-editor/plugins/text'
import { EditorPluginType } from './serlo-editor-integration/types/editor-plugin-type'
import type {
  EditorAnchorPlugin,
  EditorAudioPlugin,
  EditorGeogebraPlugin,
  EditorH5PPlugin,
  EditorHighlightPlugin,
  EditorInjectionPlugin,
  EditorVideoPlugin,
} from './serlo-editor-integration/types/editor-plugins'

// The actual content of the page.

// The frontend defines it's own content format that bridges the gap between legacy and edtr-io state.
// Will switch to directly using editor state or renderer soonish.
// Until then: Here are the types the frontend expects after converting

export enum FrontendNodeType {
  Anchor = EditorPluginType.Anchor,
  Article = EditorPluginType.Article,
  Audio = EditorPluginType.Audio,
  Blockquote = EditorPluginType.Blockquote,
  Box = EditorPluginType.Box,
  Code = EditorPluginType.Highlight,
  Equations = EditorPluginType.Equations,
  Geogebra = EditorPluginType.Geogebra,
  Image = EditorPluginType.Image,
  Important = EditorPluginType.Important,
  Injection = EditorPluginType.Injection,
  Multimedia = EditorPluginType.Multimedia,
  PageLayout = EditorPluginType.PageLayout,
  PagePartners = EditorPluginType.PagePartners,
  PageTeam = EditorPluginType.PageTeam,
  Table = EditorPluginType.Table,
  Td = 'td',
  Th = 'th',
  Tr = 'tr',
  SerloTable = EditorPluginType.SerloTable,
  SerloTd = 'serlo-td',
  SerloTr = 'serlo-tr',
  SpoilerBody = 'spoiler-body',
  SpoilerContainer = 'spoiler-container',
  SpoilerTitle = 'spoiler-title',
  Row = 'row', // children of dep. layout plugin
  Col = 'col', // children of dep. layout plugin
  Video = EditorPluginType.Video,
  Exercise = EditorPluginType.Exercise,
  ExerciseGroup = 'exercise-group',
  Solution = EditorPluginType.Solution,
  Text = EditorPluginType.Text,

  Math = 'math',
  InlineMath = 'inline-math',
  H = 'h',
  A = 'a',
  P = 'p',
  Ul = 'ul',
  Ol = 'ol',
  Li = 'li',
  SlateContainer = 'slate-container',
  SlateP = 'slate-p',
}

export type FrontendTextNode = CustomText & {
  type: FrontendNodeType.Text
  children?: undefined
}

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
  pluginId?: string
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

export interface FrontendImageNode {
  type: FrontendNodeType.Image
  src: string
  href?: string
  alt: string
  maxWidth?: number
  caption?: FrontendContentNode[]
  children?: undefined
  pluginId?: string
}

export interface FrontendSpoilerContainerNode {
  type: FrontendNodeType.SpoilerContainer
  children: [FrontendSpoilerTitleNode, FrontendSpoilerBodyNode]
  pluginId?: string
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
  mediaWidth: number
  media: FrontendContentNode[]
  children: FrontendContentNode[]
  pluginId?: string
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
  pluginId?: string
}

export type FrontendAnchorNode = EditorAnchorPlugin & {
  type: FrontendNodeType.Anchor
  children?: undefined
}

export interface FrontendSerloTableNode {
  type: FrontendNodeType.SerloTable
  children?: FrontendSerloTrNode[]
  tableType: keyof typeof TableType | string
  pluginId?: string
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

export type FrontendGeogebraNode = EditorGeogebraPlugin & {
  type: FrontendNodeType.Geogebra
  children?: undefined
  pluginId?: string
}

export type FrontendInjectionNode = EditorInjectionPlugin & {
  type: FrontendNodeType.Injection
  children?: undefined
  pluginId?: string
}

interface BareSolution {
  legacy?: FrontendContentNode[]
  edtrState?: SolutionEditorState
  license?: LicenseData
  trashed: boolean
}

export interface FrontendExerciseNode {
  type: FrontendNodeType.Exercise
  trashed?: boolean
  task: {
    legacy?: FrontendContentNode[]
    edtrState?: TaskEditorState
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
    revisionId: number
  }
  children?: undefined
  href?: string
  unrevisedRevisions?: number
  pluginId?: string
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

export interface TaskEditorState {
  content: FrontendContentNode[] // edtr-io plugin "exercise"
  interactive?:
    | EditorPluginScMcExercise
    | EditorPluginInputExercise
    | EditorH5PPlugin
}

export interface SolutionEditorState {
  // editor plugin "solution"
  prerequisite?: {
    id?: number
    href?: string // added, the resolved alias
    title: string
  }
  strategy: FrontendContentNode[]
  steps: FrontendContentNode[]
}

export interface EditorPluginScMcExercise {
  plugin: EditorPluginType.ScMcExercise // editor plugin
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

export interface EditorPluginInputExercise {
  plugin: EditorPluginType.InputExercise // editor plugin
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

export type FrontendVideoNode = EditorVideoPlugin & {
  license?: LicenseData
  type: FrontendNodeType.Video
  children?: undefined
  pluginId?: string
}

export type FrontendAudioNode = EditorAudioPlugin & {
  type: FrontendNodeType.Audio
  children?: undefined
  pluginId?: string
  src: string
  base64AudioRecording: string
}

export type FrontendCodeNode = EditorHighlightPlugin & {
  type: FrontendNodeType.Code
  children?: undefined
  pluginId?: string
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
  transformationTarget: 'term' | 'equation' | string
  children?: undefined
  pluginId?: string
}

export interface FrontendPageLayoutNode {
  type: FrontendNodeType.PageLayout
  column1: FrontendContentNode[]
  column2: FrontendContentNode[]
  widthPercent: number
  children?: undefined
  pluginId?: string
}

export type FrontendPageTeamNode = PageTeamRendererProps & {
  type: FrontendNodeType.PageTeam
  children?: undefined
  pluginId?: string
}

export interface FrontendPagePartnersNode {
  type: FrontendNodeType.PagePartners
  children?: undefined
  pluginId?: string
}

export type FrontendVoidNode =
  | FrontendInlineMathNode
  | FrontendMathNode
  | FrontendImageNode
  | FrontendAnchorNode
  | FrontendGeogebraNode
  | FrontendInjectionNode
  | FrontendExerciseNode
  | FrontendSolutionNode
  | FrontendVideoNode
  | FrontendAudioNode
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
  | FrontendUlNode
  | FrontendOlNode
  | FrontendRowNode
  | FrontendMultiMediaNode
  | FrontendTrNode
  | FrontendExerciseGroupNode
  | FrontendPageLayoutNode
  | FrontendPageTeamNode
  | FrontendPagePartnersNode

export type FrontendContentNode =
  | FrontendTextNode
  | FrontendVoidNode
  | FrontendElementNode
  | FrontendRestrictedElementNode
