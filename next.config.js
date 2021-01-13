const withSourceMaps = require('@zeit/next-source-maps')()
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withSourceMaps(
  withBundleAnalyzer({
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
            },
          },
        ],
      })

      for (const plugin of config.plugins) {
        if (plugin.constructor.name === 'UglifyJsPlugin') {
          plugin.options.sourceMap = true
          break
        }
      }

      return config
    },
    devIndicators: {
      autoPrerender: false,
    },
    async rewrites() {
      return [{ source: '/user/public', destination: '/user/me' }]
    },
    i18n: {
      locales: ['de', 'en', 'ta', 'hi', 'fr', 'es'],
      defaultLocale: 'de',
      localeDetection: false,
    },
  })
)
