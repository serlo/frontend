type ContentType =
  | RichText
  | Box
  | Video
  | Geogebra
  | Equations
  | Highlight
  | Image
  | Multimedia
  | Spoiler
  | Table
  | SerloInjection
  | Exercise

type SecondLevelContentType = RichText | Video | Image | Table | SerloInjection

interface SecondLevelListOfContent {
  plugin: 'rows'
  state: SecondLevelContentType[]
}

/**
 * The exercise plugin combines the task description and the responses
 */
interface Exercise {
  plugin: 'exercise'

  state: {
    /**
     * The axtucal task / exercise
     */
    content: SecondLevelListOfContent
    /**
     * The solution of this exercise.
     */
    solution: Solution
    /**
     * The responses, either of type scMcExercise or inputExercise
     */
    interactive?: ScMcExercise | InputExercise | BlankExercise
  }
}

/**
 * single or multiple choice exercise
 */
interface ScMcExercise {
  plugin: 'scMcExercise'

  /**
   * The scmc exercise contains only the response part of the exercise (the task is a separate content)
   */
  state: {
    /**
     * single or multiple choice
     */
    isSingleChoice: false
    /**
     * multiple answers can be entered
     */
    answers: ScMcExerciseAnswer[]
  }
}

interface ScMcExerciseAnswer {
  /**
   * each answer contains a text content
   */
  content: RichText
  /**
   * flag whether answer is correct or false
   */
  isCorrect: false
  /**
   * text feedback for the user when this solution is selected
   */
  feedback: RichText
}

/**
 * An exercise with blanks wich needs to be be filled out by the students with
 * the correct answer. The blanks are given in the text by blanks in the rich text. This exerciser can
 * e a fill ein the gap exercise when mode is "typing" and a drag and drop exercise when mode is
 * "drag-and-drop".
 */
interface BlankExercise {
  plugin: 'blanksExercise'
  state: {
    /** The text with the blanks */
    text: RichText
    /** The mode of the content type.
     * Set to "typing" for fill in the gap exercise.
     * Set to "drag-and-drop" for Drag & Drop Exercise
     */
    mode: 'typing' | 'drag-and-drop'
    /** Optional list of extra draggable answers which are all wrong for a drag & drop exercise. */
    extraDraggableAnswers?: Answer[]
  }
}

/**
 * An input exercise where the user has to enter a text, number or mathematical expression which is the right solution.
 */
interface InputExercise {
  plugin: 'inputExercise'

  /**
   * The input exercise contains only the response part of the
   * exercise (the task is a separate content)
   */
  state: {
    /**
     * response type: either text, number or mathematical expression
     */
    type:
      | 'input-number-exact-match-challenge'
      | 'input-expression-equal-match-challenge'
      | 'input-string-normalized-match-challenge'
    /**
     * option to specifiy unit for answer (e.g. "kg")
     */
    unit: string
    /**
     * multiple answers can be entered
     */
    answers: InputExerciseAnswer[]
  }
}

interface InputExerciseAnswer {
  /**
   * the answer as a string
   */
  value: string
  /**
   * whether the given answer is correct
   */
  isCorrect: boolean
  /**
   * customizable text feedback for the user, e.g. "Well done!"
   */
  feedback: RichText
}

/**
 * The solution of an exercise
 */
interface Solution {
  plugin: 'solution'
  state: {
    /**
     * prerequisites specified for understanding the exercise
     */
    prerequisite?: {
      // id of the referenced Serlo article
      id: string
      // title of the referenced Serlo article
      title: string
    }
    /**
     * solution strategy described textually
     */
    strategy: RichText
    /**
     * the solution is structured into different steps where each step can contain text, images or other content types
     */
    steps: SecondLevelListOfContent
  }
}

/**
 * A list of content elements like boy, richtext or exercises...
 */
export interface ListOfContent {
  plugin: 'rows'
  state: ContentType[]
}

/**
 * Represents the SerloInjection plugin.
 * @property plugin - The type of plugin, which is "injection".
 * @property state - The ID of the Serlo article that is injected.
 */
interface SerloInjection {
  plugin: 'injection'
  state: string
}

/**
 * A semantic box like an example, a definition, a theorem, a hint, etc.
 */
interface Box {
  plugin: 'box'

  state: {
    // type of box: "blank", "example", "citation", "approach", etc.
    type: string
    // optional title for the box (see text plugin)
    title: RichText
    // a box can contain text, code, equations, image, multimedia content or a table
    // any of the above is wrapped in a rows plugin
    content: SecondLevelListOfContent
  }
}

/**
 * A video element similar to <video> in HTML.
 */
interface Video {
  plugin: 'video'
  state: {
    /**
     * The url to the video's location
     */
    src: string
    /**
     * Alternative information for the video if the video cannot be viewed
     */
    alt: string
  }
}

/**
 * An integration from Geogebra hub.
 */
interface Geogebra {
  plugin: 'geogebra'

  /**
   * Id of the geogebra applet
   */
  state: string
}

// TODO: Better types for the equation plugin
// TODO: Define "left", "right", "sign", "transform" and "explanation" in the schema

/**
 * Represents a single transformation step in an equation.
 * @property left - The left-hand side of the equation.
 * @property sign - The sign between the left and right sides of the equation.
 * @property right - The right-hand side of the equation.
 * @property transform - The transformation applied to this step.
 * @property explanation - An inline textual explanation of the step.
 */
interface Step {
  left: string
  sign: string
  right: string
  transform: string
  explanation: RichText
}

/**
 * Represents the state of the Equations plugin.
 * @property steps - An array of steps, each containing the details of a transformation.
 * @property firstExplanation - The first explanation rendered above the equation sign of the first step.
 * @property transformationTarget - Indicates whether the "equation" or "term" is transformed.
 */
interface EquationsState {
  steps: Step[]
  firstExplanation: RichText
  transformationTarget: 'equation' | 'term'
}

/**
 * Represents the Equations plugin.
 * @property plugin - The type of plugin, which is "equations".
 * @property state - The state of the Equations plugin.
 */
interface Equations {
  plugin: 'equations'
  state: EquationsState
}

/**
 * Represents the state of the Highlight plugin.
 * @property code - The programming code.
 * @property language - The programming language of the code.
 * @property showLineNumbers - Option to show line numbers (similar to an IDE).
 */
interface HighlightState {
  code: string
  language: string
  showLineNumbers: boolean
}

/**
 * Represents the Highlight plugin.
 * @property plugin - The type of plugin, which is "highlight".
 * @property state - The state of the Highlight plugin.
 */
interface Highlight {
  plugin: 'highlight'
  state: HighlightState
}

/**
 * Represents the state of a link associated with an image.
 * @property href - The URL of the link.
 * @property openInNewTab - Option to open the link in a new tab.
 */
interface ImageLink {
  href: string
  openInNewTab: boolean
}

/**
 * Represents the state of the Image plugin.
 * @property src - The URL to the image's location.
 * @property link - Optional link that the image can be associated with.
 * @property alt - Optional alternative information for the image if it cannot be viewed.
 * @property maxWidth - Optional setting of the maximal width of the image.
 * @property caption - Optional caption that can be added to the image.
 */
interface ImageState {
  src: string
  link?: ImageLink
  alt?: string
  maxWidth?: number
  caption?: RichText
}

/**
 * Represents the Image plugin.
 * @property plugin - The type of plugin, which is "image".
 * @property state - The state of the Image plugin.
 */
interface Image {
  plugin: 'image'
  state: ImageState
}

/**
 * Represents the state of the Multimedia plugin.
 * @property explanation - The left-hand side of the multimedia object, containing various content types.
 * @property multimedia - The right-hand side of the multimedia object, containing either an image, a video, or a geogebra applet.
 * @property illustrating - Indicates whether the multimedia object is illustrating the explanation.
 * @property width - The width of the multimedia object.
 */
interface MultimediaState {
  explanation: SecondLevelListOfContent
  multimedia: Image | Video | Geogebra
  illustrating: boolean
  width: number
}

/**
 * Represents the Multimedia plugin.
 * @property plugin - The type of plugin, which is "multimedia".
 * @property state - The state of the Multimedia plugin.
 */
interface Multimedia {
  plugin: 'multimedia'
  state: MultimediaState
}

/**
 * Represents the state of the Spoiler plugin.
 */
interface SpoilerState {
  /**
   * The title of the spoiler.
   */
  title: string
  /**
   * The content of the spoiler.
   */
  content: SecondLevelListOfContent
}

/**
 * Represents the Spoiler plugin.
 */
interface Spoiler {
  plugin: 'spoiler'
  /**
   * The state of the Spoiler plugin.
   */
  state: SpoilerState
}

/**
 * A content type that can be used to store rich text content.
 */
interface RichText {
  plugin: 'text'
  state: SlateBlock[]
}

/**
 * Represents a table with rows and columns similar to <table> in HTML.
 */
interface Table {
  plugin: 'serloTable'

  // The Serlo Table is structured into rows where each row contains a column list. Each row-column entry is a text content.
  state: {
    rows: TableRow[]
    // Specifies whether only column headers or
    // only row headers or both are displayed
    tableType: string
  }
}

interface TableRow {
  columns: TableCell[]
}

interface TableCell {
  content: RichText
}

type SlateBlock = Paragraph | Heading | UnorderedList | OrderedList
type SlateInline = CustomText | MathElement | Link | Blank

/**
 * Represents a blank space in the editor in a blank exercise.
 */
interface Blank {
  /**
   * The type of the content, which must be 'textBlank'.
   */
  type: 'textBlank'

  /**
   * The correct answer for this blank.
   */
  children: CustomText[]

  /**
   * The unique identifier for the blank.
   */
  blankId: string

  /**
   * List of correct answers for this blank.
   */
  correctAnswers: Answer[]

  /**
   * Optional: Specifies whether math equivalents are accepted.
   */
  acceptMathEquivalents?: boolean
}

interface Answer {
  /**
   * The answer to the question.
   */
  answer: string
}

/**
 * A heading similar to an h1, h2, h3, etc.
 */
interface Heading {
  type: 'h'
  /**
   * The level of the heading. 1 is the highest level.
   * Use 1 for h1, 2 for h2, etc.
   */
  level: 1 | 2 | 3
  /**
   * The content of the heading.
   */
  children: SlateInline[]
}

/**
 * A paragraph of text similar to a <p> tag in HTML.
 */
interface Paragraph {
  type: 'p'
  /**
   * The content of the paragraph.
   */
  children: SlateInline[]
}

/**
 * A link similar to an <a> tag in HTML.
 */
interface Link {
  type: 'a'
  /**
   * The URL that the link points
   */
  href: string
  children: CustomText[]
}

/**
 * An unordered list similar to an <ul> tag in HTML.
 */
interface UnorderedList {
  type: 'unordered-list'
  children: ListItem[]
}

/**
 * An ordered list similar to an <ol> tag in HTML.
 */
interface OrderedList {
  type: 'ordered-list'
  children: ListItem[]
}

/**
 * A list item similar to an <li> tag in HTML.
 */
interface ListItem {
  type: 'list-item'
  /**
   * @minItems 1
   * @maxItems 1
   */
  children: ListItemText[]
}

/**
 * A list item child which only contains text elements (similar to the body of an <li> tag in HTML).
 */
interface ListItemText {
  type: 'list-item-child'
  children: CustomText[]
}

/**
 * A math element similar to a <math> tag in HTML.
 */
interface MathElement {
  type: 'math'
  /**
   * The LaTeX source code of the math element.
   */
  src: string
  /**
   * Set to true if the math element should be displayed inline like $...$ in LaTeX.
   * Set to false if the math element should be displayed as a block like $$...$$ in LaTeX.
   */
  inline: boolean
  /**
   * @minItems 1
   * @maxItems 1
   */
  children: EmptyText[]
}

interface EmptyText {
  text: ''
}

/**
 * A custom text element that can be styled with different text styles.
 */
interface CustomText {
  text: string
  /**
   * Set to true if the text should be displayed in bold like <b> or <strong> in HTML.
   */
  strong?: true
  /**
   * Set to true if the text should be displayed in italic like <i> or <em> in HTML.
   */
  em?: true
  /**
   * Set to true if the text should be displayed in code like <code> in HTML.
   */
  code?: true
}
