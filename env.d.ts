declare namespace NodeJS {
  interface ProcessEnv {
    // Serlo domain (defined in preview & production)
    NEXT_PUBLIC_SERLO_DOMAIN: string | undefined
    // Sentry DSN (defined in preview & production)
    NEXT_PUBLIC_SENTRY_DSN: string | undefined
    // Google Analytics Tracking ID (defined in production)
    NEXT_PUBLIC_GA_TRACKING_ID: string | undefined
    // The GitHub SHA of the commit the deployment was triggered by (defined in preview & production)
    VERCEL_GITHUB_COMMIT_SHA: string | undefined

    // Hydra client id (defined in preview & production, only exposed to server)
    HYDRA_CLIENT_ID: string | undefined
    // Hydra client secret (defined in preview & production, only exposed to server)
    HYDRA_CLIENT_SECRET: string | undefined
  }
}
