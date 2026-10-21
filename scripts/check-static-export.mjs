import { stat } from 'node:fs/promises';

for (const [path, directory] of [['out/index.html', false], ['out/404.html', false], ['out/_next', true]]) {
  const entry = await stat(path).catch(() => null);
  if (!entry || (directory ? !entry.isDirectory() : !entry.isFile())) {
    throw new Error(`Static export is missing ${path}. Enable output: 'export' in next.config.ts.`);
  }
}

console.log('Static export verified: out/ is ready for Cloudflare Pages.');
