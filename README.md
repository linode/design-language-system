# Basic Style Dictionary

This example code is bare-bones to show you what this framework can do. If you have the style-dictionary module installed globally, you can `cd` into this directory and run:
```bash
yarn install
yarn generate
```

You should see something like this output:
```
==============================================

Processing... 1 of 4
 - theme: akamai
 - Platform: web

web/js
✔︎ dist/akamai/tokens.es6.js
✔︎ dist/akamai/theme.es6.js
✔︎ dist/akamai/theme.d.ts
✔︎ dist/akamai/tokens.d.ts

web/scss
✔︎ dist/akamai/tokens.scss

End processing

==============================================
```

Good for you! You have now built your first style dictionary! Moving on, take a look at what we have built. This should have created a build directory and it should look like this:
```
├── dist/
│   ├── akamai/
│      ├── index.js
│      ├── theme.es6.js
│      ├── tokens.es6.js
│   ├── cloudmanager/
│      ├── index.js
│      ├── theme.es6.js
│      ├── tokens.es6.js
```

If you open `config.json` you will see there are 5 platforms defined: scss, android, compose, ios, and ios-swift. Each platform has a transformGroup, buildPath, and files. The buildPath and files of the platform should match up to the files what were built. The files built should look like these:

**JS**
```js
// tokens.es6.js
export const TokenColorNeutralsBlack = "#222222";
export const TokenColorNeutralsGrey10 = "#32363C";
export const TokenColorNeutralsGrey09 = "#444444";
export const TokenColorNeutralsGrey08 = "#606469";
export const TokenColorNeutralsGrey07 = "#8C929D";
export const TokenColorNeutralsGrey06 = "#ABADAF";
export const TokenColorNeutralsGrey05 = "#C9CACB";
export const TokenColorNeutralsGrey04 = "#E7E7E7";
export const TokenColorNeutralsGrey03 = "#EEEEEE";
export const TokenColorNeutralsGrey02 = "#F5F5F5";
export const TokenColorNeutralsGrey01 = "#FAFAFA";
export const TokenColorNeutralsWhite = "#ffffff";
```

Pretty nifty! This shows a few things happening:
1. The build system does a deep merge of all the token JSON files defined in the `source` attribute of `config.json`. This allows you to split up the token JSON files however you want. There are 2 JSON files with `color` as the top level key, but they get merged properly.
1. The build system resolves references to other design tokens. `{size.font.medium.value}` gets resolved properly.
1. The build system handles references to token values in other files as well as you can see in `tokens/color/font.json`.

Now let's make a change and see how that affects things. Open up `tokens/color/base.json` and change `"#111111"` to `"#000000"`. After you make that change, save the file and re-run the build command `style-dictionary build`. Open up the build files and take a look.

**Huzzah!**

Now go forth and create! Take a look at all the built-in [transforms](https://amzn.github.io/style-dictionary/#/transforms?id=pre-defined-transforms) and [formats](https://amzn.github.io/style-dictionary/#/formats?id=pre-defined-formats).
