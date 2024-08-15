import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  test: {
    globals: true,
    reporters: ['verbose'],
    disableConsoleIntercept: true,
    include: ['**/*.test.ts', '**/*.test.ts', '**/*.e2e-test.ts'],
    // timeout for test
    testTimeout: 9999999,
    // timeout for afterAll, afterEach, beforeEach, beforeAll
    hookTimeout: 9999999
  },
  plugins: [
    // This is required to build the test files with SWC.
    // Vite (which uses esbuild) doesn't support typescript metadata.
    // This metadata is required for decorators and nestjs DI.
    swc.vite({
      module: { type: 'es6' }
    })
  ]
});
