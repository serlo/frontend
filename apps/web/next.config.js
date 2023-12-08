import bundleAnalyzer from '@next/bundle-analyzer'
import path from 'path'
import { fileURLToPath } from 'url'
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack(config, { isServer }) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    // fixes problem with frontend-client-base needs language data on server but document is not ready
    // resolve feature-i18n as empty module on client
    if (!isServer) {
      const featureI18nFile = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        'src',
        'helper',
        'feature-i18n-for-server-only.ts'
      )
      config.resolve.alias[featureI18nFile] = false
    }

    return config
  },
  i18n: {
    locales: ['de', 'en', 'ta', 'hi', 'fr', 'es'],
    defaultLocale: 'de',
    localeDetection: false,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  transpilePackages: ['ramda', '@serlo/editor'], // context: https://github.com/vercel/next.js/issues/40183
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.serlo.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'embed.serlo.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'community.serlo.org',
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
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
