const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  env: {
    SENTRY_DSN:
      'https://b7a5f46510b945b7a3a78c47c6a6048a@o115070.ingest.sentry.io/5206333',
    GA_TRACKING_ID: 'UA-20283862-3'
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false
          }
        }
      ]
    })

    return config
  },
  devIndicators: {
    autoPrerender: false
  }
})
