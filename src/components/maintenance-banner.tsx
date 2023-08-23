export function MaintenanceBanner() {
  const today = new Date().toISOString().slice(0, 10)
  const relativeDay = today === '2023-08-24' ? 'Heute' : 'Am Donnerstag 24.08.'

  return (
    <div className="absolute left-0 right-0 top-0 z-20 hidden h-10 bg-brand-200 sm:block">
      <p className="p-2 text-right">
        <b>Vorsicht:</b> {relativeDay} ab 22:30 wird Serlo gewartet und für
        einige Stunden nicht verfügbar sein 🧑‍🔧
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
