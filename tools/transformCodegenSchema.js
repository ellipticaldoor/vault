/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const currentPath = path.resolve(__dirname, '..');
const schemaFilePath = `${currentPath}/src/api/graphql.ts`;

async function main() {
  let schema = await readFile(schemaFilePath, 'utf8');

  schema = "import { DeepPartial } from 'ts-essentials';\n" + schema;

  schema = schema.replace(
    'export type ResolverTypeWrapper<T> = Promise<T> | T;',
    'export type ResolverTypeWrapper<T> = Promise<DeepPartial<T>> | DeepPartial<T>;',
  );

  await writeFile(schemaFilePath, schema, 'utf8');
}

try {
  main();
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error);
}
