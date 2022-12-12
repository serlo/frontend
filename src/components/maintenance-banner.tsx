export function MaintenanceBanner() {
  return (
    <div className="hidden sm:block absolute top-0 left-0 right-0 bg-truegray-200 h-10">
      <p className="text-right p-2">
        Vorsicht: Ab 20:30 arbeiten wir am Login-System. Lernen könnt ihr
        weiter, aber einloggen/bearbeiten geht heute Nacht nicht. 🦉
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
