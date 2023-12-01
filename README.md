# Installation
```bash
yarn install
yarn generate
```

You should see something like this output:
```
==============================================

Processing... 1 of 3
 - theme: default
 - Platform: web

web/js
✔︎ dist/tokens.es6.js
✔︎ dist/theme.es6.js
✔︎ dist/theme.d.ts
✔︎ dist/tokens.d.ts

web/scss
✔︎ dist/tokens.scss

web/css
✔︎ dist/tokens.css

End processing

==============================================
```

Good for you! You have now built your first style dictionary! Moving on, take a look at what we have built. This should have created a build directory and it should look like this:
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

If you open `config/build.ts` you will see there is 1 platforms defined for web (however, we can build for android, compose, ios, and ios-swift). Each platform has a transformGroup, buildPath, and files. The buildPath and files of the platform should match up to the files what were built. The files built should look like these:

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
1. The build system does a deep merge of all the token JSON files defined in the `source` attribute of `config/build.ts`. This allows you to split up the token JSON files however you want.
2. The build system resolves references to other design tokens in other files as well. For example in `tokens/alias/light.json` the value `{color.neutrals.white}` gets resolved properly.

**Huzzah!**

Now go forth and create! Take a look at all the built-in [transforms](https://amzn.github.io/style-dictionary/#/transforms?id=pre-defined-transforms) and [formats](https://amzn.github.io/style-dictionary/#/formats?id=pre-defined-formats).
