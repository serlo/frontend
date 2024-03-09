
export function buildFrac(x: JSX.Element, y: JSX.Element) {
  return (
    <div className="relative mx-0.5 inline-block text-center align-middle">
      <span className="block p-0.5">{x}</span>
      <span className="block border-t border-black p-0.5">{y}</span>
    </div>
  )
}