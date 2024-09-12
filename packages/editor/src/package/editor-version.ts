export function getEditorVersion() {
  try {
    return __EDITOR_VERSION__
  } catch {
    throw new Error(
      'The __EDITOR_VERSION__ variable is not defined which needs to be set by the build system.'
    )
  }
}

// In order to reduce bundle size we set the __EDITOR_VERSION__ variable at build time
// Importing package.json would include it in the bundle which we want to avoid.
declare const __EDITOR_VERSION__: string
