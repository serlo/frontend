const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
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

    // INFO: THIS IS HACKY
    // very raw hack to avoid including react-dom/server into the client
    // which is loaded by slate-html-sanitizer
    const cgs = config.optimization.splitChunks.cacheGroups
    if (cgs) {
      // original: (?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]
      cgs.framework.test =
        /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/](?!(server|cjs[\\/]react-dom-server))/
      // code for debugging
      /*cgs.framework.test = function (module) {
        const isMatch =
          /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/](?!(server|cjs[\\/]react-dom-server))/.test(
            module.nameForCondition() || ''
          )
        if (isMatch) console.log(module.nameForCondition())
        return isMatch
      }*/
    }

    return config
  },
  devIndicators: {
    autoPrerender: false,
  },
  i18n: {
    locales: ['de', 'en', 'ta', 'hi', 'fr', 'es'],
    defaultLocale: 'de',
    localeDetection: false,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
})
