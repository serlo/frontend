export function revalidatePath(path: string) {
  // call revalidation api route
  void fetch(`/api/frontend/revalidate-path?path=${encodeURIComponent(path)}`)
}
