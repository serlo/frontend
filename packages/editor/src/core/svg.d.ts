declare module '*.svg?raw' {
  // This lets TypeScript know that we import raw svg strings. This is specific to
  // vite.

  const content: string
  export default content
}
