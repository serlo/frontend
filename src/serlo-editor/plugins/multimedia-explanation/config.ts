import * as R from 'ramda'

import {
  MultimediaExplanationConfig,
  MultimediaExplanationPluginConfig,
} from '.'

export function useMultimediaExplanationConfig(
  config: MultimediaExplanationConfig
): MultimediaExplanationPluginConfig {
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
