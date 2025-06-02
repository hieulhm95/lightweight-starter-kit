// import the theme to use for this web app
import theme from 'clad-ui/theme/chotot';

// new from clad-ui@1.2
export type * from 'clad-ui/theme';

/**
 * extend and override custom tokens for theme here
 */
// const { colors } = theme;
const appTheme = {
  ...theme,
  // colors: {
  //   ...colors,
  //   primary: colors.red2,
  //   secondary: colors.blue2,
  // },
};

export default appTheme;
