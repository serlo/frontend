import {
  Embed,
  EmbeddingRenderer,
  Hosting,
  ResourceResolver,
  URLResolver,
} from '../types'

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

export const geogebraUrlResolver: URLResolver = {
  resolvableEmbeddings: [Embed.GeoGebraApplet],
  resolve(url) {
    if (url.hostname === 'www.geogebra.org' && url.pathname.startsWith('/m/')) {
      return {
        type: 'resourceFound',
        resource: {
          hostingService: Hosting.GeoGebra,
          embeddingType: Embed.GeoGebraApplet,
          appletId: url.pathname.slice(3),
        },
      }
    } else {
      return { type: 'cannotResolve' }
    }
  },
}
