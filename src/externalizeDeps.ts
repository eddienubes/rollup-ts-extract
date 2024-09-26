import { Plugin } from 'rollup';
import path from 'node:path';
import fs from 'node:fs';
import { AnyObject } from './types';
import { createRequire, builtinModules } from 'node:module';
import {
  createExternalizeDepsConfig,
  ExternalizeDepsConfig
} from './ExternalizeDepsConfig';

export const includeExternalDeps = (opts?: ExternalizeDepsConfig): Plugin => {
  const config = createExternalizeDepsConfig(opts);

  const unresolvedDeps = new Set<string>();

  return {
    name: 'externalize-deps',
    resolveId: {
      order: 'pre',
      async handler(id, importer) {
        // Ignore node_modules and built-in modules
        if (!importer || importer.includes('node_modules')) return null;

        const require = createRequire(importer);

        id = id.replace('node:', '');

        if (builtinModules.includes(id)) {
          return { external: true, id };
        }

        try {
          const packageName = id.split('/')[0];

          if (['.', '/'].includes(packageName)) {
            return null;
          }

          unresolvedDeps.add(packageName);

          return null;
        } catch (e) {
          console.log('Unresolved package: ', id, e);
        }

        return null;
      }
    },

    buildEnd() {
      if (unresolvedDeps.size > 0) {
        updatePackageJson(
          Array.from<string>(unresolvedDeps),
          config.inputPackageJson,
          config.outputPackageJson
        );
      }
    }
  };
};

export const updatePackageJson = (
  unresolvedDeps: string[],
  inputPackageJson: string,
  outputPackageJson: string
): void => {
  const inputPackageJsonPath = path.resolve(process.cwd(), inputPackageJson);
  let inputPackageJsonContent;
  try {
    inputPackageJsonContent = JSON.parse(
      fs.readFileSync(inputPackageJsonPath, 'utf-8')
    );
  } catch (e) {
    console.error(
      `Error reading input package.json at ${inputPackageJsonPath}`
    );
    throw e;
  }

  const updatedDeps = unresolvedDeps.reduce((deps, dep) => {
    if (inputPackageJsonContent.dependencies[dep]) {
      deps[dep] = inputPackageJsonContent.dependencies[dep];
    } else if (inputPackageJsonContent.devDependencies[dep]) {
      deps[dep] = inputPackageJsonContent.devDependencies[dep];
    }

    return deps;
  }, {} as AnyObject);

  const outputPackageJsonPath = path.resolve(process.cwd(), outputPackageJson);
  let outputPackageJsonContent: AnyObject = {};

  try {
    outputPackageJsonContent = JSON.parse(
      fs.readFileSync(outputPackageJsonPath, 'utf-8')
    );
  } catch (e) {
    console.warn(
      `Could not find output package.json at ${outputPackageJsonPath}`
    );
  }

  if (Object.keys(updatedDeps).length) {
    outputPackageJsonContent.dependencies = {
      ...(outputPackageJsonContent.dependencies || {}),
      ...updatedDeps
    };

    fs.writeFileSync(
      path.resolve(process.cwd(), outputPackageJson),
      JSON.stringify(outputPackageJsonContent, null, 2),
      'utf-8'
    );
  }
};
