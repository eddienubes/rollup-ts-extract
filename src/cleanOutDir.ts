import fs from 'node:fs/promises';
import type { Plugin } from 'rollup';

/**
 * Delete everything for a folder except for the file paths in the preserve array.
 * @param preserve
 * @param folder
 */
export const cleanOutDir = (preserve: string[], folder: string): Plugin => {
  return {
    name: 'clean-out-dir',
    writeBundle: async () => {
      for (const file of await fs.readdir(folder, { recursive: false })) {
        console.log('Cleaning folder: ', folder);
        if (!preserve.includes(file)) {
          await fs.rm(`${folder}/${file}`, {
            force: true,
            recursive: true
          });
        }
      }
    }
  };
};
