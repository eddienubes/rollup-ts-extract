import { Config, createConfig } from './Config';
import { RollupOptions } from 'rollup';
import { tscAlias } from './tscAlias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import * as path from 'node:path';
import { cleanOutDir } from './cleanOutDir';

/**
 * Bundles typescript source project into a single file with types.
 * Supports tree-shaking decorators.
 * This is not a rollup plugin but rather a collection of preconfigured plugins.
 * @param config
 */
export const tsExtract = (opts: Config): RollupOptions[] => {
  const config = createConfig(opts);

  const filename = path.basename(config.entryFile);

  return [
    {
      input: config.entryFile,
      output: {
        file: path.join(config.outDir, filename),
        format: config.format,
        sourcemap: false
      },
      plugins: [
        typescript({
          tsconfig: config.tsconfig
        }),
        json(),
        commonjs(),
        tscAlias(config.tscAlias),
        cleanOutDir([filename], config.outDir)
      ]
    }
  ];
};
