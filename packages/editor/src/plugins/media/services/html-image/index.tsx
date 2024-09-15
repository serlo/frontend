import { EmbeddingRenderer, Embed } from '../types'

export const ImageRenderer: EmbeddingRenderer<Embed.HTMLImage> = ({
  contentUrl,
}) => <img src={contentUrl} />
