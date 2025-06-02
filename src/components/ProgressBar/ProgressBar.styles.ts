import { css } from '@linaria/core';
import theme from '@clad-ui/theme';

const { colors, borderWidths, zIndices } = theme;

const progressBarClass = css`
  :global() {
    /* div#nprogress wrapper has hardcoded id */
    /* stylelint-disable-next-line selector-max-specificity */
    #nprogress {
      pointer-events: none;
    }
  }

  pointer-events: none;
  background: ${colors.green200};
  position: fixed;
  z-index: ${zIndices.notification + 1};
  top: 0;
  left: 0;
  width: 100%;
  height: ${borderWidths.lg};

  .peg {
    display: block;
    position: absolute;
    right: 0;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${colors.green200}, 0 0 5px ${colors.green200};
    opacity: 1;
    transform: rotate(3deg) translate(0, -4px);
  }
`;

export default progressBarClass;
