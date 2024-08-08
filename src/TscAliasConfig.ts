import { DeepPartial } from './types';

export interface TscAliasConfig {
  /**
   * Path to the tsconfig file.
   */
  tsconfig: string;
}

export const createTscAliasConfig = (
  options?: DeepPartial<TscAliasConfig>
): TscAliasConfig => {
  return {
    tsconfig: options?.tsconfig ?? 'tsconfig.json'
  };
};
