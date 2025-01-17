import { H5pSerloStaticRenderer } from './h5p/h5p-serlo-static'
import { AudioSerloStaticRenderer } from './serlo-plugin-wrappers/audio-serlo-static-renderer'
import { ExerciseGroupSerloStaticRenderer } from './serlo-plugin-wrappers/exercise-group-serlo-static-renderer'
import { ExerciseSerloStaticRenderer } from './serlo-plugin-wrappers/exercise-serlo-static-renderer'
import { GeogebraSerloStaticRenderer } from './serlo-plugin-wrappers/geogebra-serlo-static-renderer'
import { ImageSerloStaticRenderer } from './serlo-plugin-wrappers/image-serlo-static-renderer'
import { InputSerloStaticRenderer } from './serlo-plugin-wrappers/input-serlo-static-renderer'
import { MultimediaSerloStaticRenderer } from './serlo-plugin-wrappers/multimedia-serlo-static-renderer'
import { ScMcSerloStaticRenderer } from './serlo-plugin-wrappers/sc-mc-serlo-static-renderer'
import { SolutionSerloStaticRenderer } from './serlo-plugin-wrappers/solution-serlo-static-renderer'
import { VideoSerloStaticRenderer } from './serlo-plugin-wrappers/video-serlo-static-renderer'

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
