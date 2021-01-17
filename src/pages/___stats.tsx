// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
//@ts-ignore
import md5 from 'md5'
import React from 'react'

export default function Stats() {
  React.useEffect(() => {
    void (async () => {
      const parameters = new URLSearchParams(window.location.search)
      const pw = parameters.get('pw')
      if (pw) {
        const hash = md5(pw)
        try {
          const res = await fetch(
            `https://arrrg.uber.space/serlo-stats/${hash}.json`
          )
          await res.json()
          localStorage.setItem('experiment_stats_filekey', hash)
          window.location.href = '/'
        } catch (e) {
          alert('Falsches Passwort.')
        }
      }
    })()
  }, [])
  return 'Statistikdaten werden geladen ...'
}
