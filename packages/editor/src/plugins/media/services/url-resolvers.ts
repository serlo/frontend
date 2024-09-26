import { edusharingUrlResolver } from './edu-sharing'
import { geogebraUrlResolver } from './geogebra'
import { imageUrlResolver } from './html-image'
import { videoUrlResolver } from './html-video'
import { youtubeUrlResolver } from './youtube'

export const urlResolvers = [
  imageUrlResolver,
  videoUrlResolver,
  geogebraUrlResolver,
  edusharingUrlResolver,
  youtubeUrlResolver,
] as const
