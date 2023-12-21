import { useAuth } from '@/auth/use-auth'

export function useAuthentication() {
  const { authenticationPayload } = useAuth()
  return authenticationPayload
}
