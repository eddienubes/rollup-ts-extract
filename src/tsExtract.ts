import { Config, createConfig } from './Config.js';
import { RollupOptions } from 'rollup';
import { tscAlias } from './tscAlias.js';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import path from 'path';
import { dropDecorators } from './dropDecorators.js';
import dts from 'rollup-plugin-dts';
import { cleanOutDir } from './cleanOutDir.js';
import { includeExternalDeps } from './externalizeDeps';

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
        format: config.format,
        sourcemap: false
      },
      plugins: [
        dropDecorators(config.dropDecorators),
        // @ts-ignore
        json(),
        // @ts-ignore
        typescript({
          tsconfig: config.tsconfig,
          tsconfigOverride: {
            declaration: false
          }
        }),
        // @ts-ignore
        commonjs({}),
        tscAlias(config.tscAlias)
      ]
    },
    {
      input: config.entryFile,
      treeshake: 'smallest',
      output: {
        file: outputDeclarationFilePath,
        format: config.format,
        sourcemap: false
      },
      plugins: [
        // @ts-ignore
        json(),
        dts({
          tsconfig: config.tsconfig,
          respectExternal: true
        }),
        cleanOutDir(
          [
            // index.d.ts or index.js
            path.basename(outputDeclarationFilePath),
            path.basename(outputFilePath)
          ],
          config.outDir
        ),
        includeExternalDeps({
          inputPackageJson: config.inputPackageJson as string,
          outputPackageJson: config.outputPackageJson as string
        })
      ]
    }
  ];
};
