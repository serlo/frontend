import { Link } from '../content/link'
import { useInstanceData } from '@/contexts/instance-context'

export function PleaseLogIn() {
  const { strings } = useInstanceData()
  return (
    <p className="serlo-p">
      <Link href="/auth/login" path={[]}>
        {strings.auth.pleaseLogInLink}
      </Link>{' '}
      {strings.auth.pleaseLogInText}
    </p>
  )
}
