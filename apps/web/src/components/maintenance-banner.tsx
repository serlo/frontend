import { useEffect, useState } from 'react'

const startDate = new Date('2024-07-09T20:00:00+02:00')
const endDate = new Date('2024-07-10T02:00:00+02:00')

export function MaintenanceBanner() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const now = Date.now()
    if (now > startDate.getTime() && now < endDate.getTime()) {
      setShow(true)
    }
  }, [])

  if (!show) return null

  return (
    <div className="absolute left-0 right-0 top-0 z-20 hidden h-10 bg-brand-200 sm:block">
      <p className="p-2 text-center">
        <span className="font-bold">Info:</span> Heute (Dienstag) ab 22 Uhr kann
        es zu längeren Ladezeiten oder kurzzeitigen Problemen kommen. 🧑‍🔧
      </p>
      <style jsx global>
        {`
          body {
            margin-top: 2.5rem;
          }
          #__next > header .flex-wrap > button.serlo-button-green {
            margin-top: 2rem;
          }
        `}
      </style>
    </div>
  )
}
