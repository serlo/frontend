export function MaintenanceBanner() {
  return (
    <div className="hidden sm:block absolute top-0 left-0 right-0 bg-amber-400 h-10">
      <p className="text-right p-2">
        Vorsicht: Heute Nacht sind keine Logins möglich. Lernen könnt ihr
        weiter, aber einloggen/bearbeiten geht erst morgen wieder. 🦉
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
