import { Embed, Hosting, ResourceResolver } from '../types'

export const geogebraResourceResolver: ResourceResolver<
  Hosting.GeoGebra,
  Embed.GeoGebraApplet
> = (resource) => {
  return {
    type: Embed.GeoGebraApplet,
    appletId: resource.appletId,
  }
}
