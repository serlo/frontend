import { NextApiResponse } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { ErrorPage } from '@/components/pages/error-page'

interface ErrorProps {
  statusCode: number
  message: string
}

export default function CustomError(props: ErrorProps) {
  return (
    <FrontendClientBase>
      <ErrorPage code={props.statusCode} message={props.message} />
    </FrontendClientBase>
  )
}

interface InitialProps {
  res: NextApiResponse
  err: Error
}

CustomError.getInitialProps = ({ res, err }: InitialProps) => {
  console.log('calling getInitialProps', err.message)
  //const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  /*

    const message = `Error while fetching data: ${(e as Error).message ?? e}`
    const code = message.includes('Code: 503') ? 503 : 500
    return { kind: 'error', errorData: { code, message } }

    */
  res.statusCode = 503
  return { statusCode: 500, message: err.message }
}
