import { Config } from './Config';

export interface ExternalizeDepsConfig {
  /**
   * Input package.json file path to reference external dependencies' versions for inclusion.
   * @default 'package.json'
   */
  inputPackageJson: string;

  /**
   * Output path to generate package.json with included external dependencies at.
   * @default 'package.json'
   */
  outputPackageJson: string;
}

export const createExternalizeDepsConfig = (
  config?: ExternalizeDepsConfig,
  topLevelConfig?: Config
): ExternalizeDepsConfig => {
  return {
    inputPackageJson:
      config?.inputPackageJson ||
      topLevelConfig?.inputPackageJson ||
      'package.json',
    outputPackageJson:
      config?.outputPackageJson ||
      topLevelConfig?.outputPackageJson ||
      'package.json'
  };
};
