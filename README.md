# Installation
```bash
yarn install
```

## Build
>[!note]
You can use `yarn storybook` to view all the tokens we have available

```bash
yarn generate
yarn storybook
```

You should see something like this output:
```
==============================================
Theme: light

js
✔︎ dist/tokens-nested.es6.js
✔︎ dist/tokens-nested.d.ts
✔︎ dist/tokens.d.ts
✔︎ dist/tokens.es6.js

scss
✔︎ dist/tokens.scss

css
✔︎ dist/tokens.css
==============================================
```

This should have created a build directory and it should look like this:
```
├── dist/
│   ├── dark
│       ├── ...
│   ├── highContrast
│       ├── ...
│   ├── index.d.ts
│   ├── index.js
│   ├── theme.d.ts
│   ├── theme.es6.js
│   ├── tokens.css
│   ├── tokens.d.js
│   ├── tokens.es6.js
│   ├── tokens.scss
```

If you open `style-dictionary/build.ts` you will see there is 1 platforms defined for web (however, we can build for android, compose, ios, and ios-swift). Each platform has a transformGroup, buildPath, and files. The buildPath and files of the platform should match up to the files what were built. The files built should look like these:

**JS**
```js
// tokens.es6.js
export const TokenColorNeutrals5 = "#F7F7FA";
export const TokenColorNeutrals10 = "#EDEDF2";
export const TokenColorNeutrals20 = "#E5E5EA";
export const TokenColorNeutrals30 = "#D6D6DD";
export const TokenColorNeutrals40 = "#C2C2CA";
export const TokenColorNeutrals50 = "#A3A3AB";
export const TokenColorNeutrals60 = "#83838C";
export const TokenColorNeutrals70 = "#717178";
export const TokenColorNeutrals80 = "#5E5E65";
export const TokenColorNeutrals90 = "#4B4B51";
export const TokenColorNeutrals100 = "#3A3A3F";
```

**JS Nested**
```js
export default {
  Color: {
    Neutrals: {
      5: "#F7F7FA",
      10: "#EDEDF2",
      20: "#E5E5EA",
      30: "#D6D6DD",
      40: "#C2C2CA",
      50: "#A3A3AB",
      60: "#83838C",
      70: "#717178",
      80: "#5E5E65",
      90: "#4B4B51",
      100: "#3A3A3F"
    },
  }
}
```

**SCSS**
```scss
// tokens.scss
$token-color-neutrals-5: #F7F7FA;
$token-color-neutrals-10: #EDEDF2;
$token-color-neutrals-20: #E5E5EA;
$token-color-neutrals-30: #D6D6DD;
$token-color-neutrals-40: #C2C2CA;
$token-color-neutrals-50: #A3A3AB;
$token-color-neutrals-60: #83838C;
$token-color-neutrals-70: #717178;
$token-color-neutrals-80: #5E5E65;
$token-color-neutrals-90: #4B4B51;
$token-color-neutrals-100: #3A3A3F;
```

**CSS**
```css
// tokens.css
--token-color-neutrals-5: #F7F7FA;
--token-color-neutrals-10: #EDEDF2;
--token-color-neutrals-20: #E5E5EA;
--token-color-neutrals-30: #D6D6DD;
--token-color-neutrals-40: #C2C2CA;
--token-color-neutrals-50: #A3A3AB;
--token-color-neutrals-60: #83838C;
--token-color-neutrals-70: #717178;
--token-color-neutrals-80: #5E5E65;
--token-color-neutrals-90: #4B4B51;
--token-color-neutrals-100: #3A3A3F;
```

This shows a few things happening:
1. The build system does a deep merge of all the token JSON files defined in the `source` attribute of `style-dictionary/build.ts`. This allows you to split up the token JSON files however you want.
2. The build system resolves references to other design tokens in other files as well. For example in `tokens/alias/light.json` the value `{color.neutrals.white}` gets resolved properly.

## Example Usage in Apps

You may import each tier of tokens: `Global, Alias, Component`
```
import { Global, Alias, Component } from '@linode/design-language-system';
```

You may alternately access any token set under each tier:
```
import { Color, Interaction, Button } from '@linode/design-language-system';
```

You selectively import tokens by extending the path:
```
import { Button } from '@linode/design-language-system/components';
```

All of the above applies to themes:
```
import { Global, Alias, Component } from '@linode/design-language-system/themes/dark';
```