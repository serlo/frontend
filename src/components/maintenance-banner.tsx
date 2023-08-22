export function MaintenanceBanner() {
  const today = new Date().toISOString().slice(0, 10)
  const relativeDay = today === '2023-08-24' ? 'Heute' : 'Am Donnerstag 24.08.'

  return (
    <div className="hidden sm:block absolute top-0 left-0 right-0 bg-truegray-200 h-10">
      <p className="text-right p-2">
        Vorsicht: {relativeDay} ab 22:30 machen wir Wartungsarbeit. Serlo wird für einige Stunden nicht verfügbar sein 🧑‍🔧
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
