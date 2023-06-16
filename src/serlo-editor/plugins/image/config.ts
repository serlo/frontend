import { ImageConfig, ImagePluginConfig } from '.'

export function useImageConfig(config: ImageConfig): ImagePluginConfig {
  return {
    ...config,
  }
}
