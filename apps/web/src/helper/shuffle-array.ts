export function shuffleArray<T>(sourceArray: T[]) {
  // Durstenfeld shuffle https://stackoverflow.com/a/12646864 probably overkill, but hey it's all about the performance right?
  const array = Array.from(sourceArray)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
