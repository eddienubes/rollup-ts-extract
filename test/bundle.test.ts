import { rollup } from 'rollup';
import { tsExtract } from '../src/tsExtract.js';
import path from 'node:path';
import fs from 'node:fs/promises';

describe('Rollup Bundle', () => {
  describe('ts-extractor', () => {
    it('should be defined', async () => {
      const dir = 'test/fixtures/dist';
      await fs.rm(dir, { recursive: true, force: true });

      const config = tsExtract({
        entryFile: 'test/fixtures/index.ts',
        outDir: dir
      });

      const jsBundle = await rollup(config[0]);
      await jsBundle.write({
        file: path.join(dir, 'index.js'),
        format: 'cjs'
      });

      const dtsBundle = await rollup(config[1]);
      await dtsBundle.write({
        file: path.join(dir, 'index.d.ts'),
        format: 'es'
      });

      const jsContent = await fs.readFile(path.join(dir, 'index.js'), 'utf-8');
      const dtsContent = await fs.readFile(
        path.join(dir, 'index.d.ts'),
        'utf-8'
      );

      const expectedJsContent = await fs.readFile(
        'test/fixtures/expected.js',
        'utf-8'
      );
      const expectedDtsContent = await fs.readFile(
        'test/fixtures/expected.d.ts',
        'utf-8'
      );

      console.log(jsContent);

      console.log(expectedJsContent);

      expect(jsContent).toEqual(expectedJsContent);
      expect(dtsContent).toEqual(expectedDtsContent);
    });
  });
});
