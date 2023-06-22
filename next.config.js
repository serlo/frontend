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
  // TODO: reactStrictMode with react18 breaks edtr.io atm (inside react-hotkeys)
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
