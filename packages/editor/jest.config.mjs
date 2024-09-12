import { pathsToModuleNameMapper } from 'ts-jest'
import tsConfig from './tsconfig.json' with { type: 'json' }

const jestConfig = {
  transform: { '^.+\\.tsx?$': '<rootDir>/transformer.mjs' },
  roots: ['<rootDir>/__tests__'],
  testEnvironment: 'jsdom',
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
}

export default jestConfig
