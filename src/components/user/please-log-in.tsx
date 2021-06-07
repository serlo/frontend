import { Link } from '../content/link'
import { useInstanceData } from '@/contexts/instance-context'

export function PleaseLogIn() {
  const { strings } = useInstanceData()
  return (
    <p className="serlo-p">
      <Link href="/api/auth/login" path={[]}>
        {strings.login.pleaseLogInLink}
      </Link>{' '}
      {strings.login.pleaseLogInText}
    </p>
  )
}
