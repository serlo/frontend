import { cookies } from 'next/headers'

export default function Page() {
  const cookieStore = cookies()
  console.log(JSON.stringify(cookieStore))
  return '...'
}
