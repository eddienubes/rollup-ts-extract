import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  forceExit: true,
  detectOpenHandles: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.[t]s$': [
      'ts-jest',
      {
        isolatedModules: true,
        diagnostics: false,
        tsconfig: './tsconfig.json'
      }
    ]
  },
  maxWorkers: '95%',
  workerIdleMemoryLimit: '400MB',
  collectCoverage: false,
  coverageReporters: ['text-summary', 'lcov'],
  coverageThreshold: {
    global: {
      lines: 1
    }
  },
  collectCoverageFrom: ['<rootDir>/src/**', '!**/*.test.ts'],
  coverageProvider: 'v8'
};

export default config;
