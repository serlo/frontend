export function revalidatePath(path: string) {
  // call revalidation api route
  return fetch(`/api/frontend/revalidate-path?path=${encodeURIComponent(path)}`)
}
