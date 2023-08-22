export function MaintenanceBanner() {
  const today = new Date().toISOString().slice(0, 10)
  const relativeDay = today === '2023-08-24' ? 'Heute' : 'Am Donnerstag 24.08.'

  return (
    <div className="bg-truegray-200 absolute left-0 right-0 top-0 hidden h-10 sm:block">
      <p className="p-2 text-right">
        Vorsicht: {relativeDay} ab 22:30 machen wir Wartungsarbeit. Serlo wird
        für einige Stunden nicht verfügbar sein 🧑‍🔧
      </p>
      <style jsx global>
        {`
          body {
            margin-top: 2.5rem;
          }
        `}
      </style>
    </div>
  )
}
