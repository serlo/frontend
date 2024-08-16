import { type SerloInjectionConfig, type SerloInjectionPluginConfig } from '.'

export function useSerloInjectionConfig(
  config: SerloInjectionConfig
): SerloInjectionPluginConfig {
  const { i18n = {} } = config

  return {
    i18n: {
      label:
        'URL von einem serlo.org Inhalt (z.B. "https://de.serlo.org/mathe/1717/gleichung")',
      placeholder: 'https://de.serlo.org/mathe/1717/gleichung',
      ...i18n,
    },
  }
}
