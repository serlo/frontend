/**
 * Identifiers for the kind of hosting of a resource.
 */
export enum Hosting {
  CDN = 'cdn',
  GeoGebra = 'geogebra',
}

/**
 * Stores per hosting type additional information next to the hosting service
 * which need to defined in order to describe a resource on this hosting
 * service. For example in order to describe a resource on GeoGebra we need the
 * additional information `{ appletId: string }`.
 */
interface ResourceAdditonalInformation {
  [Hosting.CDN]: {
    embeddingType: Embed.HTMLImage | Embed.HTMLVideo
    contentUrl: string
  }
  [Hosting.GeoGebra]: { appletId: string }
}

/**
 * Type function which creates the union of all resource types for the
 * given union of hosting types. For example `Resouce<Hosting.GeoGebra>`
 * describes a resource on GeoGebra. It is equal to
 *
 * interface GeoGebraResource {
 *   hostingService: Hosting.GeoGebra
 *   appletId: string
 * }
 */
export type Resource<H extends Hosting = Hosting> = {
  [T in H]: ResourceAdditonalInformation[T] & { hostingService: T }
}[H]

/**
 * Identifiers for the different types a resource (like image, applet, etc)
 * can be embedded in the content.
 */
export enum Embed {
  HTMLImage = 'imageTag',
  HTMLVideo = 'videoTag',
  GeoGebraApplet = 'geogebraApplet',
}

/**
 * Stores per embedding type additional information which need to be provided
 * for doing this kind of embedding.
 */
interface EmbeddingAdditonalInformation {
  [Embed.HTMLImage]: { contentUrl: string }
  [Embed.HTMLVideo]: { contentUrl: string }
  [Embed.GeoGebraApplet]: { appletId: string }
}

/**
 * Generic type which creates given the list of embed Identifiers the
 * union of its embedding types. For example Embedding<Embed.GeoGebraApplet> is
 * equivalent to:
 *
 * interface HTMLImageEmbedding {
 *   type: Embed.HTMLImage,
 *   appletId: GeoGebraApplet
 * }
 */
export type EmbeddingType<
  Hosts extends Hosting = Hosting,
  Types extends Embed = Embed,
> = {
  [T in Types]: EmbeddingAdditonalInformation[T] & {
    type: T
    resourceLocation: Resource<Hosts>
  }
}[Types]
