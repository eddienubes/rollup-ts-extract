import * as fs from 'node:fs/promises';
import type { Plugin } from 'rollup';

/**
 * Delete everything for a folder except for the file paths in the preserve array.
 * @param preserve
 * @param folder
 */
export const cleanOutDir = (preserve: string[], folder: string): Plugin => {
  return {
    name: 'clean-out-dir',
    buildEnd: async () => {
      for await (const file of fs.glob(`${folder}/**/*`)) {
        if (!preserve.includes(file)) {
          await fs.rm(file, {
            force: true,
            recursive: true
          });
        }
      }
    }
  };
};
