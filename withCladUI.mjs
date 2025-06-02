// NOTE: in case we need require.resolve back
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

const LINARIA_EXTENSION = '.linaria.module.css';

function traverse(rules) {
  for (const rule of rules) {
    if (typeof rule.loader === 'string' && rule.loader.includes('css-loader')) {
      if (
        rule.options &&
        rule.options.modules &&
        typeof rule.options.modules.getLocalIdent === 'function'
      ) {
        const nextGetLocalIdent = rule.options.modules.getLocalIdent;
        rule.options.modules.mode = 'local';
        rule.options.modules.auto = true;
        rule.options.modules.exportGlobals = true;
        rule.options.modules.exportOnlyLocals = false;
        rule.options.modules.getLocalIdent = (context, _, exportName, options) => {
          if (context.resourcePath.includes(LINARIA_EXTENSION)) {
            return exportName;
          }
          return nextGetLocalIdent(context, _, exportName, options);
        };
      }
    }
    if (typeof rule.use === 'object') {
      traverse(Array.isArray(rule.use) ? rule.use : [rule.use]);
    }
    if (Array.isArray(rule.oneOf)) {
      traverse(rule.oneOf);
    }
  }
}

const withCladUI = (nextConfig = {}) => ({
  ...nextConfig,
  transpilePackages: ['clad-ui', ...(nextConfig.transpilePackages ?? [])],
  webpack(config, options) {
    traverse(config.module.rules);
    config.module.rules.push({
      test: /\.(tsx|ts|js|mjs|jsx)$/,
      exclude: /node_modules(?!.*clad-ui)/,
      use: [
        {
          // loader: require.resolve('@linaria/webpack-loader'),
          loader: '@linaria/webpack-loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
            ...(nextConfig.linaria || {}),
            extension: LINARIA_EXTENSION,
          },
        },
      ],
    });

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, options);
    }
    return config;
  },
});

export default withCladUI;
