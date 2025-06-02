/**
 * Allow to safely write condition that need to run on Server or Client side
 * ```
 * // example
 * import isServer from '~/src/helpers/isServer';
 * if (isServer()) {
 *   // server only stuff
 * } else {
 *   // client only stuiff
 * }
 * ```
 * @return {boolean} whether current context in at server or not
 */
export default function isServer(): boolean {
  // note: `process.browser` is deprecated and not recommended as per https://github.com/zeit/next.js/pull/7651
  if (typeof window === 'undefined') return true;
  return false;
}
