import { DeepPartial } from './types';
import { Config } from './Config';

export interface DropDecoratorsConfig {
  /**
   * List of decorators that should not be removed.
   */
  whitelist: string[];
  /**
   * Path to the tsconfig file.
   */
  tsconfig: string;
}

export const createDropDecoratorsConfig = (
  config: DeepPartial<DropDecoratorsConfig>,
  topLevelConfig?: Config
): DropDecoratorsConfig => {
  return {
    whitelist: config.whitelist || topLevelConfig.whitelist || [],
    tsconfig: config.tsconfig || topLevelConfig?.tsconfig || 'tsconfig.json'
  };
};
