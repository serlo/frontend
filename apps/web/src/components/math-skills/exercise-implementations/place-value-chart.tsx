import { arrayOfLength } from '@/helper/array-of-length'

interface PlaceValueChartProps {
  T: number
  H: number
  Z: number
  E: number
}

export function PlaceValueChart({ T, H, Z, E }: PlaceValueChartProps) {
  return (
    <div className="-ml-2 pb-3">
      <table className="w-[26rem] table-fixed text-left">
        <thead>
          <tr className="divide-x-2 divide-gray-200 text-xl">
            <th className="w-24 pl-2.5 pt-3">T</th>
            <th className="w-24 pl-2.5 pt-3">H</th>
            <th className="w-24 pl-2.5 pt-3">Z</th>
            <th className="w-24 pl-2.5 pt-3">E</th>
          </tr>
        </thead>
        <tbody>
          <tr className="divide-x-2 divide-gray-200 break-all text-sm">
            <td className="h-[65px] px-2 pb-3 align-top text-brand-500">
              {arrayOfLength(T).map((_) => '⬤ ')}
            </td>
            <td className="px-2 pb-3 align-top text-newgreen">
              {arrayOfLength(H).map((_) => '⬤ ')}
            </td>
            <td className="px-2 pb-3 align-top text-orange-300">
              {arrayOfLength(Z).map((_) => '⬤ ')}
            </td>
            <td className="px-2 pb-3 align-top text-red-400">
              {arrayOfLength(E).map((_) => '⬤ ')}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
