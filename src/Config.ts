import { DropDecoratorsConfig } from './DropDecoratorsConfig.js';
import { DeepPartial } from './types.js';
import { TscAliasConfig } from './TscAliasConfig.js';
import { ModuleFormat } from 'rollup';

export interface Config {
  /**
   * Path to the entry file.
   */
  entryFile: string;
  /**
   * Output directory to contain the bundled source and declaration files.
   */
  outDir: string;
  /**
   * Output format.
   * @default cjs
   */
  format?: ModuleFormat;
  /**
   * Path to the tsconfig file.
   */
  tsconfig?: string;
  /**
   * List of decorators that should not be removed.
   */
  whitelist?: string[];

  /**
   * Path to package.json file to update with external dependencies.
   * @default 'package.json'
   */
  outputPackageJson?: string;

  /**
   * Path to take external dependencies' version from.
   * @default 'package.json'
   */
  inputPackageJson?: string;

  /**
   * Configuration for drop decorators plugin.
   */
  dropDecorators?: DropDecoratorsConfig;

  /**
   * Configuration for tsc alias plugin.
   */
  tscAlias?: TscAliasConfig;
}

export const createConfig = (config: Config): Config => {
  return {
    entryFile: config.entryFile,
    outDir: config.outDir,
    format: config.format || 'cjs',
    tsconfig: config.tsconfig || 'tsconfig.json',
    whitelist: config.whitelist,
    dropDecorators: config.dropDecorators,
    tscAlias: config.tscAlias,
    outputPackageJson: config.outputPackageJson,
    inputPackageJson: config.inputPackageJson
  };
};
