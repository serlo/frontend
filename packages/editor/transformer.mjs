import _tsJest from 'ts-jest'
import { defaultImport } from 'default-import'

const defaultTransformer = defaultImport(_tsJest).createTransformer()

export default {
  ...defaultTransformer,
  process: (sourceText, sourcePath, config, options) => {
    sourceText = sourceText.replace('__EDITOR_VERSION__', '"1.0.0"')

    return defaultTransformer.process(sourceText, sourcePath, config, options)
  },
}
