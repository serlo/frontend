const KRATOS_HOSTS = {
  production: process.env.KRATOS_HOST_PRODUCTION,
  staging: process.env.KRATOS_HOST_STAGING,
  local: process.env.KRATOS_HOST_LOCAL,
}

export const KRATOS_HOST = KRATOS_HOSTS[process.env.NEXT_PUBLIC_ENV || 'local']
