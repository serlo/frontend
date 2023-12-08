export interface HSpaceProps {
  amount?: number
}

export function HSpace({ amount }: HSpaceProps) {
  return <div style={{ height: `${amount || 30}px` }} />
}
