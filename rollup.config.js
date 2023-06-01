import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
// import { BRANDS } from './config/build';

export const BRANDS = [
  {
    name: 'akamai',
    outputDir: 'dist/akamai'
  },
  {
    name: 'cloudmanager',
    outputDir: 'dist/cloudmanager'
  }
];

const rollupConfig = (brand) => ({
  input: `config/${brand.name}/index.ts`,
  output: {
    format: 'esm',
    dir: `dist/${brand.name}`
  },
  plugins: [
    typescript({
      tsconfig: `./tsconfig.${brand.name}.json`
    }),
    terser()
  ]
});

export default BRANDS.map((brand) => rollupConfig(brand));
