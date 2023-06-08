export type Platforms = 'web' | 'ios' | 'android';

export interface PlatformTypes {
  name: Platforms;
}

export interface StyleDictionaryOptions {
  theme: any;
  platform: PlatformTypes;
}