import { readdir } from 'fs/promises';
import { join } from 'path';
import { Utils } from './utils.js';

async function registerSubdirs(this: Utils, source: URL | string) {

  if (`${source}`.endsWith('.js')) {
    source = new URL('./', source);
  }

  const subdirs = (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  await Promise.all(
    subdirs.map(async (subdir) => {
      const plugin = await import(new URL(join(subdir, 'index.js'), source).href);
      await this.fastify.register(plugin, { prefix: `/${subdir}` });
    })
  );
}

declare module './utils' {
  interface Utils {
    registerSubdirs: typeof registerSubdirs;
  }
}

Utils.prototype.registerSubdirs = registerSubdirs;
