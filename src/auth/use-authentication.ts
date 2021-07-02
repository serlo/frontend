import { useAuth } from '@/auth/auth-provider'

export function useAuthentication() {
  const { authenticationPayload } = useAuth()
  return authenticationPayload
}
