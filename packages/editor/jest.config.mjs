import { pathsToModuleNameMapper } from 'ts-jest'
import tsConfig from './tsconfig.json' with { type: 'json' }

const jestConfig = {
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  roots: ['<rootDir>/__tests__'],
  testEnvironment: 'jsdom',
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
}

export default jestConfig
