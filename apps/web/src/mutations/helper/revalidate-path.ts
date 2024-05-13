export async function revalidatePath(path: string) {
  // call revalidation api route
  await fetch(
    `/api/frontend/revalidate-path?path=${encodeURIComponent(path)}`
  ).then(() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500) // 500 seems to work, but it's a guess
    }).catch((e) => {
      // eslint-disable-next-line no-console
      console.error('problem revalidating', path, e)
      return new Promise<void>((_resolve, reject) => {
        reject()
      })
    })
  })
}
