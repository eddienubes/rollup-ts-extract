import { rollup } from 'rollup';
import { tsExtract } from '../tsExtract';

describe('Rollup Bundle', () => {
  describe('ts-extractor', () => {
    it('should be defined', async () => {
      for (const config of tsExtract({
        entryFile: 'src/test/fixtures/index.ts',
        outDir: 'src/test/fixtures/dist'
      })) {
        const bundle = await rollup(config);
        await bundle.write({
          dir: 'src/test/fixtures/dist'
        });
      }
    });
  });
});
