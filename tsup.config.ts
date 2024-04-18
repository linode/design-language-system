import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  entry: [
    ...['config/index.ts'],
    ...['config/themes/dark/index.ts'],
    ...['config/themes/densedDark/index.ts'],
    ...['config/themes/densedLight/index.ts'],
    ...['config/globals/index.ts'],
    ...['config/aliases/index.ts'],
    ...['config/components/index.ts'],
  ],
  format: ['esm'],
  minify: 'terser',
  outDir: 'dist',
});
