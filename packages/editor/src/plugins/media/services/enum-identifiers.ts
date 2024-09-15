/**
 * Identifiers for the kind of hosting of a resource.
 */
export enum Hosting {
  CDN = 'cdn',
  GeoGebra = 'geogebra',
}

/**
 * Identifiers for the different types a resource (like image, applet, etc)
 * can be embedded in the content.
 */
export enum Embedding {
  HTMLImage = 'imageTag',
  HTMLVideo = 'videoTag',
  GeoGebraApplet = 'geogebraApplet',
}
