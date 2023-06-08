import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  entry: [
    ...['config/akamai/index.ts', 'config/cloudmanager/index.ts'],
    ...['config/akamai/dark/index.ts', 'config/cloudmanager/dark/index.ts']
  ],
  format: ['esm'],
  minify: 'terser',
  outDir: 'dist',
});
