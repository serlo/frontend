declare module '*.svg?raw' {
  // This lets TypeScript know that we import raw svg strings. This is specific to
  // vite.

  const content: string
  // eslint-disable-next-line import/no-default-export
  export default content
}
