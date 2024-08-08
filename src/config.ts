import { DropDecoratorsConfig } from './DropDecoratorsConfig';
import { DeepPartial, Preserve } from './types';
import { TscAliasConfig } from './TscAliasConfig';
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
  format: ModuleFormat;
  /**
   * Path to the tsconfig file.
   */
  tsconfig: string;
  /**
   * List of decorators that should not be removed.
   */
  whitelist?: string[];

  /**
   * Configuration for drop decorators plugin.
   */
  dropDecorators?: Preserve<DropDecoratorsConfig>;

  /**
   * Configuration for tsc alias plugin.
   */
  tscAlias?: Preserve<TscAliasConfig>;
}

export const createConfig = (config: DeepPartial<Config>): Config => {
  return {
    entryFile: config.entryFile,
    outDir: config.outDir,
    format: config.format ?? 'cjs',
    tsconfig: config.tsconfig ?? 'tsconfig.json',
    whitelist: config.whitelist,
    dropDecorators: config.dropDecorators,
    tscAlias: config.tscAlias,
  };
};
