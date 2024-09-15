import { Embed, EmbeddingRenderer, Hosting, ResourceResolver } from '../types'

export const geogebraResourceResolver: ResourceResolver<
  Hosting.GeoGebra,
  Embed.GeoGebraApplet
> = (resource) => {
  return {
    type: Embed.GeoGebraApplet,
    appletId: resource.appletId,
  }
}

export const GeogebraRenderer: EmbeddingRenderer<Embed.GeoGebraApplet> = ({
  appletId,
}) => {
  return (
    <div className="rounded border bg-green-50">
      Here would be the embedding for GeoGebra applet <code>{appletId}</code>
    </div>
  )
}
