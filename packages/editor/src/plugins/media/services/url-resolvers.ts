import { edusharingUrlResolver } from './edu-sharing'
import { geogebraUrlResolver } from './geogebra'
import { imageUrlResolver } from './html-image'
import { videoUrlResolver } from './html-video'

export const urlResolvers = [
  imageUrlResolver,
  videoUrlResolver,
  geogebraUrlResolver,
  edusharingUrlResolver,
] as const
