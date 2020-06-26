declare namespace NodeJS {
  interface ProcessEnv {
    // Environment to use
    NEXT_PUBLIC_ENV: 'production' | 'staging'
    // Serlo domain for production environment
    NEXT_PUBLIC_SERLO_DOMAIN_PRODUCTION: string
    // Serlo domain to be used in staging environment
    NEXT_PUBLIC_SERLO_DOMAIN_STAGING: string
    // Sentry DSN (defined in preview & production)
    NEXT_PUBLIC_SENTRY_DSN: string | undefined
    // Google Analytics Tracking ID (defined in production)
    NEXT_PUBLIC_GA_TRACKING_ID: string | undefined
    // The GitHub SHA of the commit the deployment was triggered by (defined in preview & production)
    NEXT_PUBLIC_COMMIT_SHA: string | undefined

    // Hydra client id for production environment (defined in preview & production, only exposed to server)
    HYDRA_CLIENT_ID_PRODUCTION: string | undefined
    // Hydra client id for staging environment (only exposed to server)
    HYDRA_CLIENT_ID_STAGING: string
    // Hydra client secret for production environment (defined in preview & production, only exposed to server)
    HYDRA_CLIENT_SECRET_PRODUCTION: string | undefined
    // Hydra client secret for staging environment (only exposed to server)
    HYDRA_CLIENT_SECRET_STAGING: string
    // Hydra host for production environment (defined in preview & production, only exposed to server)
    HYDRA_HOST_PRODUCTION: string | undefined
    // Hydra host for staging environment (only exposed to server)
    HYDRA_HOST_STAGING: string
  }
}
