import type {
  EditorAudioDocument,
  EditorExerciseDocument,
  EditorExerciseGroupDocument,
  EditorGeogebraDocument,
  EditorImageDocument,
  EditorInputExerciseDocument,
  EditorMultimediaDocument,
  EditorScMcExerciseDocument,
  EditorSolutionDocument,
  EditorVideoDocument,
} from '@editor/package'
import dynamic from 'next/dynamic'

import type { EditorH5PDocument } from './h5p'

const GeogebraSerloStaticRenderer = dynamic<EditorGeogebraDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/geogebra-serlo-static-renderer'
  ).then((mod) => mod.GeogebraSerloStaticRenderer)
)
const ImageSerloStaticRenderer = dynamic<EditorImageDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/image-serlo-static-renderer'
  ).then((mod) => mod.ImageSerloStaticRenderer)
)
const MultimediaSerloStaticRenderer = dynamic<EditorMultimediaDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/multimedia-serlo-static-renderer'
  ).then((mod) => mod.MultimediaSerloStaticRenderer)
)
const VideoSerloStaticRenderer = dynamic<EditorVideoDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/video-serlo-static-renderer'
  ).then((mod) => mod.VideoSerloStaticRenderer)
)
const H5pSerloStaticRenderer = dynamic<EditorH5PDocument>(
  () =>
    import('@/serlo-editor-integration/h5p/h5p-serlo-static').then(
      (mod) => mod.H5pSerloStaticRenderer
    ),
  { ssr: false }
)
const AudioSerloStaticRenderer = dynamic<EditorAudioDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/audio-serlo-static-renderer'
  ).then((mod) => mod.AudioSerloStaticRenderer)
)
const ExerciseSerloStaticRenderer = dynamic<EditorExerciseDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/exercise-serlo-static-renderer'
  ).then((mod) => mod.ExerciseSerloStaticRenderer)
)
const ScMcSerloStaticRenderer = dynamic<EditorScMcExerciseDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/sc-mc-serlo-static-renderer'
  ).then((mod) => mod.ScMcSerloStaticRenderer)
)
const SolutionSerloStaticRenderer = dynamic<EditorSolutionDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/solution-serlo-static-renderer'
  ).then((mod) => mod.SolutionSerloStaticRenderer)
)
const InputSerloStaticRenderer = dynamic<EditorInputExerciseDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/input-serlo-static-renderer'
  ).then((mod) => mod.InputSerloStaticRenderer)
)
const ExerciseGroupSerloStaticRenderer = dynamic<EditorExerciseGroupDocument>(
  () =>
    import(
      '@/serlo-editor-integration/serlo-plugin-wrappers/exercise-group-serlo-static-renderer'
    ).then((mod) => mod.ExerciseGroupSerloStaticRenderer)
)

export const extraSerloRenderers = {
  audio: AudioSerloStaticRenderer,
  exerciseGroup: ExerciseGroupSerloStaticRenderer,
  exercise: ExerciseSerloStaticRenderer,
  geogebra: GeogebraSerloStaticRenderer,
  h5p: H5pSerloStaticRenderer,
  image: ImageSerloStaticRenderer,
  input: InputSerloStaticRenderer,
  multimedia: MultimediaSerloStaticRenderer,
  scMc: ScMcSerloStaticRenderer,
  solution: SolutionSerloStaticRenderer,
  video: VideoSerloStaticRenderer,
}
