import { Config, createConfig } from './Config';
import { RollupOptions } from 'rollup';
import { tscAlias } from './tscAlias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import path from 'node:path';
import { dropDecorators } from './dropDecorators';
import dts from 'rollup-plugin-dts';
import { cleanOutDir } from './cleanOutDir';

/**
 * Bundles typescript source project into a single file with types.
 * Supports tree-shaking decorators.
 * This is not a rollup plugin but rather a collection of preconfigured plugins.
 * @param opts
 */
export const tsExtract = (opts: Config): RollupOptions[] => {
  const config = createConfig(opts);

  const entryFile = path.parse(config.entryFile);
  const outputFilePath = path.join(config.outDir, `${entryFile.name}.js`);

  const entryDeclarationFilePath = path.join(
    config.outDir,
    entryFile.dir,
    `${entryFile.name}.d.ts`
  );

  const outputDeclarationFilePath = path.join(
    config.outDir,
    `${entryFile.name}.d.ts`
  );

  return [
    {
      input: config.entryFile,
      treeshake: 'smallest',
      output: {
        file: outputFilePath,
        format: 'cjs',
        sourcemap: false
      },
      plugins: [
        dropDecorators(config.dropDecorators),
        // @ts-ignore
        typescript({
          tsconfig: config.tsconfig
        }),
        commonjs(),
        json(),
        tscAlias(config.tscAlias)
      ]
    },
    {
      input: entryDeclarationFilePath,
      treeshake: 'smallest',
      output: {
        file: outputDeclarationFilePath,
        format: config.format,
        sourcemap: false
      },
      plugins: [
        dts(),
        cleanOutDir(
          [
            // index.d.ts or index.js
            path.basename(outputDeclarationFilePath),
            path.basename(outputFilePath)
          ],
          config.outDir
        )
      ]
    }
  ];
};
