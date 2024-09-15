import { Embed, EmbeddingRenderer } from '../types'

export const VideoRenderer: EmbeddingRenderer<Embed.HTMLVideo> = ({
  contentUrl,
}) => <video src={contentUrl} controls />
