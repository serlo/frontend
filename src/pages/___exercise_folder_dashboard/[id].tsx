import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  return <p>Ordner: {router.query.id}</p>
}
