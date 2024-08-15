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
    format: config.format ?? 'cjs',
    tsconfig: config.tsconfig ?? 'tsconfig.json',
    whitelist: config.whitelist,
    dropDecorators: config.dropDecorators,
    tscAlias: config.tscAlias
  };
};
