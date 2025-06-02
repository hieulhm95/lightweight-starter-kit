import React from 'react';
import ContentLoader from 'react-content-loader';
import theme from '@clad-ui/theme';

const { colors } = theme;

/**
 * @param {object} props
 * @param {object} [props.style] extra style
 * @param {string} [props.id] Use the same value of prop key, set this to solve inconsistency on the SSR and client
 */
const BoxLoading = ({ style = {}, id = '' }: { style?: object; id?: string }) => (
  <ContentLoader
    style={style}
    height={400}
    width={400}
    speed={2}
    uniqueKey={id}
    foregroundColor={colors.background}
    backgroundColor={colors.neutral}
  >
    <rect x="75" y="233" rx="4" ry="4" width="100" height="13" />
    <rect x="75" y="260" rx="4" ry="4" width="50" height="8" />
    <rect x="0" y="210" rx="5" ry="5" width="400" height="10" />
    <rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
  </ContentLoader>
);

export default BoxLoading;
