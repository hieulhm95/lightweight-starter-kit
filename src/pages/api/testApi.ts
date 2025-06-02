/**
 * TODO: remove me in real app
 * Test server side environment variables
 */
import config from '~/config';

const { universalEnv } = config;

export default function handler(req, res) {
  // Note: these environments are available throu
  return res.status(200).json({
    ENV: universalEnv.ENV,
    BASE_DOMAIN: universalEnv.BASE_DOMAIN,
    ASSET_DOMAIN: universalEnv.ASSET_DOMAIN,
    GTM_CONTAINER: universalEnv.GTM_CONTAINER,
    VERSION: universalEnv.VERSION,
  });
}
