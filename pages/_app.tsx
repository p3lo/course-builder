import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import type { AppProps /*, AppContext */ } from 'next/app';
import memoize from 'memoizee';
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
        <ToastContainer autoClose={4000} limit={3} position="bottom-center" closeOnClick={true} theme="colored" />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
