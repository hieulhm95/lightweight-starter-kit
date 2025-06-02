// below are modules that don't have type definitions
declare module 'cookie';
declare module 'ct-web-gtm';
declare module 'ct-components';
declare module 'ct-components/dist/components/RatingStar';
declare module 'ct-components/dist/components/ShareButtons/social/Facebook';
declare module 'ct-components/dist/components/ShareButtons/social/Zalo';
declare module 'ct-components/dist/components/ShareButtons/social/Viber';
declare module 'ct-components/dist/components/ShareButtons/social/SMS';
declare module 'ct-components/dist/components/ShareButtons/social/Messenger';
declare module 'ct-components/dist/components/ShareButtons/social/Copy';
declare module 'ct-react-common';
declare module 'ct-helpers';
declare module 'ct-helpers/Storage';
declare module 'ct-react-common/lib/components/TrustingSocial/TrustingSocialButton';
declare module 'ct-react-google-publisher-tag';
declare module 'react-components-marketplace';
declare module 'react-components-marketplace/dist/components/BuyerProtection';
declare module 'react-components-marketplace/dist/components/ChatDesktopButton';
declare module 'react-components-marketplace/dist/components/ManageAdButton';
declare module 'react-components-marketplace/dist/components/ShowPhoneButton/InlineShowPhoneButton';
declare module 'react-components-marketplace/dist/components/ShowPhoneButton/InlineShowPhoneMobile';
declare module 'react-components-marketplace/dist/components/ShowPhoneButton/ShowPhoneButton';
declare module 'prop-types';
declare module 'remote-component';
declare module '@chotot/appwrapper-placeholder';

// declare new property for the `window` global object
interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  BASE_DOMAIN: string;
  ENV: string;
  oldScroll: number;
}
