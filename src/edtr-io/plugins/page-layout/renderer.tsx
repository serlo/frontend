export interface PageLayoutRendererProps {
  widthPercent: number // for first col
  column1: JSX.Element
  column2: JSX.Element
}

export const PageLayoutRenderer = ({
  widthPercent,
  column1,
  column2,
}: PageLayoutRendererProps) => {
  const column1Width = widthPercent
  const column2Width = 100 - widthPercent

  return (
    <div className="sm:flex sm:flex-row sm:flex-wrap sm:items-start">
      <div style={{ width: `${column1Width}%` }}>{column1}</div>
      <div style={{ width: `${column2Width}%` }}>{column2}</div>
    </div>
  )
}
