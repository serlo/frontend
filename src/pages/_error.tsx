import { NextPage } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { ErrorPage } from '@/components/pages/error-page'

interface ErrorProps {
  statusCode: number
  message: string
}

const CustomError: NextPage<ErrorProps> = ({ statusCode, message }) => {
  return (
    <FrontendClientBase>
      <ErrorPage code={statusCode} message={message} />
    </FrontendClientBase>
  )
}

CustomError.getInitialProps = ({ res, err }) => {
  const message = err?.message ?? ''
  const statusCode = message.includes('Code: 503')
    ? 503
    : err?.statusCode ?? 500
  if (res) res.statusCode = statusCode
  return { statusCode, message }
}

export default CustomError
