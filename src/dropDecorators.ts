import type { Plugin } from 'rollup';
import { Decorator, Project } from 'ts-morph';
import {
  createDropDecoratorsConfig,
  DropDecoratorsConfig
} from './DropDecoratorsConfig';

/**
 * Removes typescript decorators to facilitate tree-shaking.
 * Doesn't transpile the code, so it's recommended to use this plugin before any other plugins.
 */
export const dropDecorators = (opts?: DropDecoratorsConfig): Plugin => {
  const config = createDropDecoratorsConfig(opts);

  const proj = new Project({
    skipAddingFilesFromTsConfig: true,
    skipFileDependencyResolution: true,
    skipLoadingLibFiles: true,
    tsConfigFilePath: config.tsconfig
  });

  return {
    name: 'drop-decorators',
    transform: async (id) => {
      // Ignore non-typescript files
      if (!id.endsWith('.ts')) {
        return;
      }

      const sourceFile = proj.addSourceFileAtPath(id);

      // Traverse through all class declarations, methods, properties, etc.
      sourceFile.forEachDescendant((node) => {
        if (node instanceof Decorator) {
          node.remove();
        }
      });

      const text = sourceFile.getFullText();

      return text;
    }
  };
};
