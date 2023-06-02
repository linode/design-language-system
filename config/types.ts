export type Brands = 'akamai' | 'cloudmanager';
export type Platforms = 'web' | 'ios' | 'android';

export interface BrandTypes {
  name: Brands;
  outputDir?: `./dist/${Brands}`;
}

export interface PlatformTypes {
  name: Platforms;
}