import { CookieBar } from '@/components/content/cookie-bar'
import { Footer } from '@/components/navigation/footer'
import { Header } from '@/components/navigation/header'

export function addLayout(comp: JSX.Element) {
  return (
    <>
      <Header />
      {comp}
      <Footer />
      <CookieBar />
    </>
  )
}
