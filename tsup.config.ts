import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  entry: [
    ...['config/aliases/index.ts'],
    ...['config/components/index.ts'],
    ...['config/globals/index.ts'],
    ...['config/index.ts'],
    ...['config/themes/dark/aliases/index.ts'],
    ...['config/themes/dark/components/index.ts'],
    ...['config/themes/dark/globals/index.ts'],
    ...['config/themes/dark/index.ts'],
    ...['config/themes/densedDark/aliases/index.ts'],
    ...['config/themes/densedDark/components/index.ts'],
    ...['config/themes/densedDark/globals/index.ts'],
    ...['config/themes/densedDark/index.ts'],
    ...['config/themes/densedLight/aliases/index.ts'],
    ...['config/themes/densedLight/components/index.ts'],
    ...['config/themes/densedLight/globals/index.ts'],
    ...['config/themes/densedLight/index.ts'],
  ],
  format: ['esm'],
  minify: 'terser',
  outDir: 'dist'
});
