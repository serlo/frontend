import { useSWRConfig } from 'swr'

export function useSWRCacheMutate() {
  const { mutate, cache } = useSWRConfig()

  function mutateSWRCaches(shouldBeMutated: (key: string) => boolean) {
    // see https://swr.vercel.app/docs/advanced/cache#mutate-multiple-keys-from-regex

    if (!(cache instanceof Map)) {
      throw new Error(
        'matchMutate requires the cache provider to be a Map instance'
      )
    }

    const keys = []
    for (const key of cache.keys() as IterableIterator<string>) {
      if (shouldBeMutated(key)) {
        keys.push(key)
      }
    }

    keys.forEach((key) => {
      void mutate(key)
    })
  }

  return mutateSWRCaches
}
