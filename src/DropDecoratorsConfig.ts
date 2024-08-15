import { Config } from './Config.js';

export interface DropDecoratorsConfig {
  /**
   * List of decorators that should not be removed.
   */
  whitelist?: string[];
  /**
   * Path to the tsconfig file.
   */
  tsconfig?: string;
}

export const createDropDecoratorsConfig = (
  config?: DropDecoratorsConfig,
  topLevelConfig?: Config
): DropDecoratorsConfig => {
  return {
    whitelist: config?.whitelist || topLevelConfig?.whitelist || [],
    tsconfig: config?.tsconfig || topLevelConfig?.tsconfig || 'tsconfig.json'
  };
};
