export enum EditorPluginType {
  Anchor = 'anchor',
  Article = 'article',
  Audio = 'audio',
  ArticleIntroduction = 'articleIntroduction',
  Box = 'box',
  Course = 'course',
  Equations = 'equations',
  Geogebra = 'geogebra',
  H5p = 'h5p',
  Highlight = 'highlight',
  Image = 'image',
  ImageGallery = 'imageGallery',
  Injection = 'injection',
  Multimedia = 'multimedia',

  PageLayout = 'pageLayout',
  PagePartners = 'pagePartners',
  PageTeam = 'pageTeam',
  PasteHack = 'pasteHack',

  Rows = 'rows',
  SerloTable = 'serloTable',
  Spoiler = 'spoiler',

  Text = 'text',
  Video = 'video',

  DropzoneImage = 'dropzoneImage',
  ExerciseGroup = 'exerciseGroup',
  Exercise = 'exercise',
  ScMcExercise = 'scMcExercise',
  InputExercise = 'inputExercise',
  TextAreaExercise = 'textAreaExercise',
  BlanksExercise = 'blanksExercise',
  Solution = 'solution',

  SerloInjection = 'serloInjection',
  EdusharingAsset = 'edusharingAsset',

  Unsupported = 'unsupported',

  // This is a hack to make the prototype work as fast as possible => We simulate
  // to hava a plugin "aiGeneratedContent" which does not exist in the editor.
  // When this is selected we know that AI content shall be generated.
  AiGeneratedContent = 'aiGeneratedContent',
}
