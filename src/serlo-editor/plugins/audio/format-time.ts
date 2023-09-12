/**
 * Outputs mm:ss format. e.g 01:20 after 80 seconds of recording
 */
export function formatTime(
  seconds: number,
  yieldHyphensInsteadOfZero?: boolean
): string {
  if (seconds === 0 && yieldHyphensInsteadOfZero) {
    return '--:--'
  }

  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const secs = (seconds % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}
