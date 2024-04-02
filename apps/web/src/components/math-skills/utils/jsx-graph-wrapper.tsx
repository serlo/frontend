interface JSXGraphWrapperProps {
  id: string
  width: number
  height: number
}

export function JSXGraphWrapper({ id, width, height }: JSXGraphWrapperProps) {
  return (
    <div
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <div
        id={id}
        className="pointer-events-none mb-2 mt-6 rounded-2xl border border-gray-200"
        style={{ width, height }}
      ></div>
      <style jsx global>
        {`
          .JXGtext {
            font-family: Karla, sans-serif !important;
            font-weight: bold !important;
            font-size: 18px !important;
          }
        `}
      </style>
    </div>
  )
}
