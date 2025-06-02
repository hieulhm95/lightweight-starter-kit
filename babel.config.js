/* eslint import/no-commonjs: off */
const path = require('path');

module.exports = (api) => {
  api.cache(true);

  return {
    presets: ['next/babel', '@linaria'],
    plugins: [
      [
        'babel-plugin-module-resolver',
        {
          root: [path.resolve(__dirname, './')],
          alias: {
            '~': './src',
            // change alias target to change the theme
            '@clad-ui/theme': './src/theme/index.ts',
          },
        },
      ],
    ],
  };
};
