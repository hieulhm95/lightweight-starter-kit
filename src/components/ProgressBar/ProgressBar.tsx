import React, { useEffect, memo } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';

import progressBarClass from './ProgressBar.styles';

const CONFIG = {
  stopDelayMs: 200,
  startPosition: 0.5,
};

NProgress.configure({
  // just default template with hashed className
  template: `<div class="${progressBarClass}" role="bar"><div class="peg"></div></div></div>`,
});

const NextNProgress = memo(() => {
  let timer: number | null = null;
  const { stopDelayMs, startPosition } = CONFIG;

  const routeChangeStart = () => {
    NProgress.set(startPosition);
    NProgress.start();
  };

  const routeChangeEnd = () => {
    if (typeof timer === 'number') window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      NProgress.done(true);
    }, stopDelayMs);
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // just a hidden progress bar as a placeholder
  return <progress hidden />;
});

export default NextNProgress;
