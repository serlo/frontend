import { useLeaveConfirm } from '@serlo/frontend/src/helper/use-leave-confirm'

export function LeaveConfirmationRenderNull({
  isChanged,
}: {
  isChanged: boolean
}) {
  useLeaveConfirm(isChanged)
  return null
}
