import {
  Embed,
  EmbeddingRenderer,
  Hosting,
  ResourceResolver,
  URLResolver,
} from '../types'

export const geogebraResourceResolver: ResourceResolver<Hosting.GeoGebra> = {
  resolvableEmbeds: [Embed.GeoGebraApplet] as const,
  resolve(resource) {
    return {
      type: 'success',
      result: {
        type: Embed.GeoGebraApplet,
        appletId: resource.appletId,
      },
    }
  },
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
  resolvableHostings: [Hosting.GeoGebra] as const,
  resolve(url) {
    if (url.hostname === 'www.geogebra.org' && url.pathname.startsWith('/m/')) {
      return {
        type: 'success',
        result: {
          hostingService: Hosting.GeoGebra,
          embeddingType: Embed.GeoGebraApplet,
          appletId: url.pathname.slice(3),
        },
      }
    } else {
      return { type: 'useNextResolver' }
    }
  },
}
