const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  webpack(config, { isServer }) {
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

    // fixes problem with outdated react-dnd version
    // see https://github.com/react-dnd/react-dnd/issues/3433
    // can be removed if edtr is on react-dnd 16
    config.resolve.alias['react/jsx-runtime.js'] = 'react/jsx-runtime'
    config.resolve.alias['react/jsx-dev-runtime.js'] = 'react/jsx-dev-runtime'

    // fixes problem with frontend-client-base needs language data on server but document is not ready
    if (!isServer) {
      // resolve feature-i18n as empty module on client
      config.resolve.alias['src/helper/feature-i18n'] = false
    }

    return config
  },
  i18n: {
    locales: ['de', 'en', 'ta', 'hi', 'fr', 'es'],
    defaultLocale: 'de',
    localeDetection: false,
  },
  // TODO: reactStrictMode with react18 breaks edtr.io atm
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  /*experimental: {
    fallbackNodePolyfills: false,
  },*/ // breaks styled-components unfortunately, see https://github.com/serlo/frontend/issues/2010
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.serlo.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
  modularizeImports: {
    // reduces bundle size by preventing import of barrel file and allow tree shaking / code chunking
    '@fortawesome/free-solid-svg-icons': {
      transform: '@fortawesome/free-solid-svg-icons/{{member}}',
      skipDefaultConversion: true,
    },
    '@fortawesome/free-brands-svg-icons': {
      transform: '@fortawesome/free-brands-svg-icons/{{member}}',
      skipDefaultConversion: true,
    },
    '@fortawesome/free-regular-svg-icons': {
      transform: '@fortawesome/free-regular-svg-icons/{{member}}',
      skipDefaultConversion: true,
    },
  },
})
