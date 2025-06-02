/* This config is used for both server-side and client-side */

type UniversalEnv = {
  [key: string]: string | undefined;
  BASE_DOMAIN: string;
  ENV: string;
  GTM_CONTAINER: string;
  ASSET_DOMAIN?: string;
  VERSION?: string;
};
/**
 * These environment vars will be available for both server and client.
 * Add more if needed
 *
 * @example
 * import { universalEnv } from '~config';
 * console.log(universalEnv.VERSION);
 *
 */
const universalEnv: UniversalEnv = Object.fromEntries([
  getUniversalEnv('BASE_DOMAIN', 'com'), // this is the TLD, due to historical reasons, we call it BASE_DOMAIN
  getUniversalEnv('ENV', 'production'),
  getUniversalEnv('GTM_CONTAINER', 'GTM-NZKHXF7'),
  getUniversalEnv('ASSET_DOMAIN', '', 'NEXT_PUBLIC_ASSET_PREFIX'),
  getUniversalEnv('VERSION', '2.5.1', 'npm_package_version'), // i.e: server side's process.env.npm_package_version
]) as UniversalEnv;

const baseDomain = universalEnv.BASE_DOMAIN;
const env = String(universalEnv.ENV).toLowerCase();
const isDev = process.env.NODE_ENV === 'development';

const legacyEnvMap = {
  dev: 'development',
  uat: 'uat',
  prod: 'production',
};

export const legacyEnv = legacyEnvMap[env];

// TODO: update by service
const siteDomain = 'chotot';
// use this for PTY
// const siteDomain = env === 'dev' ? 'nha-tot' : 'nhatot';

const config = {
  /* TODO: add your own configs */
  universalEnv,
  baseDomain,
  siteDomain,
  env, // dev, uat, prod
  cookieConfig: {
    path: '/',
    domain: isDev ? 'localhost' : `.${siteDomain}.${baseDomain}`,
    expires: 365,
  },
  chototId: {
    endpoint: `https://id.chotot.${baseDomain}/api`,
    clientId: 'ct_web_client',
  },
  baseUrl: `https://www.chotot.${baseDomain}`,
  vehBaseUrl: `https://xe.chotot.${baseDomain}`,
  propBaseUrl:
    env === 'dev' ? `https://www.nha-tot.${baseDomain}` : `https://www.nhatot.${baseDomain}`,
  iconUrl: 'https://static.chotot.com/storage/icons/logos/ad-param/',
  gatewayUrl: `https://gateway.chotot.${baseDomain}`,
  gtmContainerId: universalEnv.GTM_CONTAINER,
  publicProfileUrl: `https://www.chotot.${baseDomain}/user`,
  shopUrl: {
    vehicle: `https://xe.chotot.${baseDomain}/cua-hang`,
    property: `https://nhatot.${baseDomain}/chuyen-trang`,
    electronic: `https://www.chotot.${baseDomain}/cua-hang-dien-tu`,
  },
  chatBaseUrl: `https://chat.chotot.${baseDomain}`,
  app: {
    title: 'Chợ Tốt - Website Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt - Chợ Tốt',
    head: {
      meta: [
        {
          key: 'meta_charSet',
          charSet: 'utf-8',
        },
        {
          key: 'meta_name',
          name: 'name',
          content: 'Chợ Tốt - Website Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt',
        },
        {
          key: 'meta_description',
          name: 'description',
          content:
            'Chợ Tốt - Website mua bán rao vặt của người Việt với hàng ngàn món hời đang được rao bán mỗi ngày. Đăng tin mua bán UY TÍN, NHANH CHÓNG, AN TOÀN.',
        },
        {
          key: 'meta_image',
          property: 'image',
          content: 'https://static.chotot.com/storage/marketplace/ct_orange_c2c_200.jpg',
        },
        {
          key: 'meta_fb_admins',
          property: 'fb:admins',
          content: '100003537963527',
        },
        {
          key: 'meta_fb_app_id',
          property: 'fb:app_id',
          content: '221564734660253',
        },
        {
          key: 'meta_og_title',
          property: 'og:title',
          content: 'Chợ Tốt - Website Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt',
        },
        {
          key: 'meta_og_image',
          property: 'og:image',
          content: 'https://static.chotot.com/storage/marketplace/ct_orange_c2c_200.jpg',
        },
        {
          key: 'meta_og_description',
          property: 'og:description',
          content:
            'Chợ Tốt - Website mua bán rao vặt của người Việt với hàng ngàn món hời đang được rao bán mỗi ngày. Đăng tin mua bán UY TÍN, NHANH CHÓNG, AN TOÀN.',
        },
        {
          key: 'meta_og_url',
          property: 'og:url',
          content: 'https://www.chotot.com',
        },
        {
          key: 'meta_og_type',
          property: 'og:type',
          content: 'website',
        },
        {
          key: 'meta_viewport',
          name: 'viewport',
          content:
            'width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0',
        },
        {
          key: 'meta_mobile_web_app_capable',
          name: 'mobile-web-app-capable',
          content: 'yes',
        },
        {
          key: 'meta_apple_mobile_web_app_capable',
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          key: 'meta_application_name',
          name: 'application-name',
          content: 'Chotot',
        },
        {
          key: 'meta_apple_mobile_web_app_status_bar_style',
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black',
        },
        {
          key: 'meta_apple_mobile_web_app_title',
          name: 'apple-mobile-web-app-title',
          content: 'Chotot.com',
        },
        {
          key: 'meta_theme_color',
          name: 'theme-color',
          content: '#FDCE09',
        },
      ],
    },
  },
};

export default config;

/**
 * @param key The universal key used to access `process.env[key]` or `window[key]`
 * @param defaultValue fallback value
 * @param processEnvKey server side process.env[key] if we want to use different client env name
 */
function getUniversalEnv<K extends keyof UniversalEnv>(
  key: K,
  defaultValue = '',
  processEnvKey = ''
): [K, string] {
  if (processEnvKey != null && process?.env[processEnvKey] != null) {
    // server side key different from client side global env
    return [key, String(process.env[processEnvKey])];
  } else if (process?.env[key] != null) {
    // server side
    return [key, String(process.env[key])];
  }
  if (typeof window !== 'undefined' && window[key as string] != null) {
    // client side
    return [key, window[key as string]];
  }
  // fallback
  return [key, defaultValue];
}
