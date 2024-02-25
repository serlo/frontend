interface NumberLabelsProps {
  maxValue: number // highest value of number line
  labeledValue: number
  isChecked?: boolean
}

export function NumberLabels({
  maxValue,
  labeledValue,
  isChecked,
}: NumberLabelsProps) {
  const step = maxValue / 40

  return (
    <div className="pointer-events-none absolute -left-4 -right-4 top-0 max-w-[100vw] overflow-clip">
      <div className="relative flex items-center justify-between px-8 pb-6 text-xs">
        {Array.from({ length: 5 }).map((_, i) => {
          const value = step * i * 10
          const showLabel = isChecked
            ? true
            : 0 === value
              ? true
              : labeledValue === value

          return (
            <div
              key={i}
              className="relative text-center text-base text-gray-700"
            >
              {showLabel ? (
                <b className="absolute -ml-40 w-80">{value}</b>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
