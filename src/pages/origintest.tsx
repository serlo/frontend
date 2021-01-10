import { getOrigin } from '@/helper/get-origin'

export default function OriginTest() {
  return `Statically determined origin: ${getOrigin()}`
}
