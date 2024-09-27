import { Plugin } from 'rollup';
import path from 'node:path';
import fs from 'node:fs';
import { AnyObject } from './types.js';
import { createRequire, builtinModules } from 'node:module';
import {
  createExternalizeDepsConfig,
  ExternalizeDepsConfig
} from './ExternalizeDepsConfig.js';

export const includeExternalDeps = (opts?: ExternalizeDepsConfig): Plugin => {
  const config = createExternalizeDepsConfig(opts);

  const unresolvedDeps = new Set<string>();

  return {
    name: 'externalize-deps',
    generateBundle(_, bundle) {
      for (const [key, value] of Object.entries(bundle)) {
        // @ts-expect-error
        if (value.imports) {
          // @ts-expect-error
          for (const dep of value.imports) {
            if (
              dep.startsWith('.') ||
              dep.startsWith('/') ||
              dep.startsWith('node:') ||
              builtinModules.includes(dep)
            )
              continue;

            unresolvedDeps.add(dep);
          }
        }
      }
    },
    writeBundle() {
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
      outputPackageJsonPath,
      JSON.stringify(outputPackageJsonContent, null, 2),
      'utf-8'
    );
  }
};
