import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import type { AppProps /*, AppContext */ } from 'next/app';
import memoize from 'memoizee';
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const mutedConsole = memoize((console) => ({
    ...console,
    warn: (...args) => (args[0].includes('Duplicate atom key') ? null : console.warn(...args)),
  }));
  global.console = mutedConsole(global.console);
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <NextNProgress />
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
