import { arrayOfLength } from '@/helper/array-of-length'

interface PlaceValueChartProps {
  T: number
  H: number
  Z: number
  E: number
}

export function PlaceValueChart({ T, H, Z, E }: PlaceValueChartProps) {
  return (
    <table className="border-collapse border border-gray-400">
      <thead className="text-xl">
        <tr>
          <th className="w-24 border border-gray-400 p-2">T</th>
          <th className="w-24 border border-gray-400 p-2">H</th>
          <th className="w-24 border border-gray-400 p-2">Z</th>
          <th className="w-24 border border-gray-400 p-2">E</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="h-[57px] border border-gray-400 p-1 py-3 align-top">
            <div className="flex flex-wrap justify-start">
              {' '}
              {arrayOfLength(T).map((_, i) => (
                <div
                  key={i}
                  className="m-0.5 h-3 w-3 rounded-full bg-blue-500"
                ></div>
              ))}
            </div>
          </td>
          <td className="border border-gray-400 p-1 py-3 text-center align-top">
            <div className="flex flex-wrap justify-start">
              {' '}
              {arrayOfLength(H).map((_, i) => (
                <div
                  key={i}
                  className="m-0.5 h-3 w-3 rounded-full bg-green-500"
                ></div>
              ))}
            </div>
          </td>
          <td className="border border-gray-400 p-1 py-3 text-center align-top">
            <div className="flex flex-wrap justify-start">
              {' '}
              {arrayOfLength(Z).map((_, i) => (
                <div
                  key={i}
                  className="m-0.5 h-3 w-3 rounded-full bg-yellow-500"
                ></div>
              ))}
            </div>
          </td>
          <td className="border border-gray-400 p-1 py-3 text-center align-top">
            <div className="flex flex-wrap justify-start">
              {' '}
              {arrayOfLength(E).map((_, i) => (
                <div
                  key={i}
                  className="m-0.5 h-3 w-3 rounded-full bg-red-500"
                ></div>
              ))}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
