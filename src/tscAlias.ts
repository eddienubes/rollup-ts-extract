import type { Plugin } from 'rollup';
import { replaceTscAliasPaths } from 'tsc-alias';
import { Config } from './Config.js';
import { createTscAliasConfig, TscAliasConfig } from './TscAliasConfig.js';
import { DeepPartial } from './types.js';

/**
 * Replaces paths (aliases) in the transpiled code with the paths from the tsconfig.
 * Mostly useful for declaration files since rollup-plugin-typescript2 already handles paths in the source code.
 * @param opts
 */
export const tscAlias = (opts?: DeepPartial<TscAliasConfig>): Plugin => {
  const config = createTscAliasConfig(opts);

  return {
    name: 'tsc-alias',
    writeBundle: async () => {
      await replaceTscAliasPaths({
        configFile: config.tsconfig
      });
    }
  };
};
