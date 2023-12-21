declare namespace NodeJS {
  interface ProcessEnv {
    // Environment to use
    NEXT_PUBLIC_ENV: 'production' | 'staging' | 'local'
    // Sentry DSN (defined in preview & production)
    NEXT_PUBLIC_SENTRY_DSN: string | undefined
    // The GitHub SHA of the commit the deployment was triggered by (defined in preview & production)
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: string | undefined
    // The public facing url of the deployment (defined in preview & production)
    NEXT_PUBLIC_VERCEL_URL: string | undefined
  }
}
