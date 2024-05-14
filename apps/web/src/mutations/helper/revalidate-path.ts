export async function revalidatePath(path: string): Promise<boolean> {
  try {
    const response = await fetch(
      `/api/frontend/revalidate-path?path=${encodeURIComponent(path)}`
    )
    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error('Fetch failed', response.status, response.statusText)
      return false
    }
    console.log('revalidatePath ran successfully')
    // delay for 500ms to allow the cache to update
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log('after delay')
    return true
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return false
  }
}
