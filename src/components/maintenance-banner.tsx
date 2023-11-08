export function MaintenanceBanner() {
  return (
    <div className="absolute left-0 right-0 top-0 z-20 hidden h-10 bg-brand-200 sm:block">
      <p className="p-2 text-right">
        <span className="font-bold">Vorsicht:</span> Heute (Mittwoch, 08.11.) ab
        22 Uhr wird Serlo gewartet und für einige Stunden nicht verfügbar sein
        🧑‍🔧
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
