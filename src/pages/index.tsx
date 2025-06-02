import React, { useEffect } from 'react';
import { wrapper } from '~/store';
import Link from 'next/link';
import BoxLoading from '~/components/PreLoading/BoxLoading/BoxLoading';
import {
  loadConfig as loadOnServer,
  loadAllMapping as loadOnClient,
} from '~/helpers/api/adFeatureActions';
import { useDispatch, useSelector } from 'react-redux';
import config from '~/config';
import { css } from '@linaria/core';
import type { NextPageWithLayout } from './_app';

const classTable = css`
  border: 1px solid #cccccc;
  border-collapse: collapse;

  td {
    padding: 0.5rem;
    border: 1px solid #cccccc;
  }
`;

const Home: NextPageWithLayout = () => {
  // @ts-expect-error ts(2339)
  const adFeatureConfig = useSelector((state) => state.adFeatures.config);
  // @ts-expect-error ts(2339)
  const adFeatureMapping = useSelector((state) => state.adFeatures.mapping);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOnClient());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>Welcome to Chotot Next.js Framework 2.5 with Next.js 14!</h2>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/123.htm">Detail - clad-ui demo</Link>
        </li>
        <li>
          <Link href="/api/testApi">API endpoint demo</Link>
        </li>
      </ul>
      <p>Version: {config.universalEnv.VERSION}</p>
      <h2>Universal environment variables</h2>
      <table className={classTable}>
        <tbody>
          <tr>
            <td>ENV</td>
            <td>{String(config.universalEnv.ENV)}</td>
          </tr>
          <tr>
            <td>BASE_DOMAIN</td>
            <td>{String(config.universalEnv.BASE_DOMAIN)}</td>
          </tr>
          <tr>
            <td>GTM_CONTAINER</td>
            <td>{String(config.universalEnv.GTM_CONTAINER)}</td>
          </tr>
          <tr>
            <td>ASSET_DOMAIN</td>
            <td>{String(config.universalEnv.ASSET_DOMAIN)}</td>
          </tr>
          <tr>
            <td>VERSION</td>
            <td>{String(config.universalEnv.VERSION)}</td>
          </tr>
        </tbody>
      </table>
      <div className="row">
        <div className="col-md-6">
          <h4>Data Api Fetched From Server:</h4>
          <summary className="beauty-block">
            <details>
              <pre>{JSON.stringify(adFeatureConfig, null, 2)}</pre>
            </details>
          </summary>
        </div>
        <div className="col-md-6">
          <h4>Data Api Fetched From Client:</h4>
          <div className="beauty-block">
            {adFeatureMapping ? (
              <summary className="beauty-block">
                <details>
                  <pre>{JSON.stringify(adFeatureMapping, null, 2)}</pre>
                </details>
              </summary>
            ) : (
              <BoxLoading id="client=fetch" style={{ width: '100%', height: '300px' }} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(loadOnServer());
  return {
    props: {},
  };
});

export default Home;
