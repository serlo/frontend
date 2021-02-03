import { Link } from '../content/link'
import { StyledP } from '@/components/tags/styled-p'
import { useInstanceData } from '@/contexts/instance-context'

export function PleaseLogIn() {
  const { strings } = useInstanceData()
  return (
    <StyledP>
      <Link href="/api/auth/login">{strings.login.pleaseLogInLink}</Link>{' '}
      {strings.login.pleaseLogInText}
    </StyledP>
  )
}
