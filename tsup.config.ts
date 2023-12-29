import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  entry: [
    ...['config/index.ts'],
    ...['config/dark/index.ts'],
    ...['config/densedDark/index.ts'],
    ...['config/densedLight/index.ts'],
  ],
  format: ['esm'],
  minify: 'terser',
  outDir: 'dist',
});
