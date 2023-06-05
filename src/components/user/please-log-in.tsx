import { Link } from '../content/link'
import { useInstanceData } from '@/contexts/instance-context'

export function PleaseLogIn({ noWrapper }: { noWrapper?: boolean }) {
  const { strings } = useInstanceData()

  if (noWrapper) return renderText()
  return <p className="serlo-p">{renderText()}</p>

  function renderText() {
    return (
      <>
        <Link href="/auth/login">{strings.auth.pleaseLogInLink}</Link>{' '}
        {strings.auth.pleaseLogInText}
      </>
    )
  }
}
