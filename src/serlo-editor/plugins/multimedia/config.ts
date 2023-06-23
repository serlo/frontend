import * as R from 'ramda'

import { MultimediaConfig, MultimediaPluginConfig } from '.'

export function useMultimediaConfig(
  config: MultimediaConfig
): MultimediaPluginConfig {
  const {
    features = {
      importance: true,
    },
    plugins,
  } = config

  return {
    plugins,
    features: R.mergeDeepRight(
      {
        link: false,
        importance: false,
      },
      features
    ),
  }
}
