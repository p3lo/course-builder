import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import type { AppProps /*, AppContext */ } from 'next/app';
import memoize from 'memoizee';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  const mutedConsole = memoize((console) => ({
    ...console,
    warn: (...args) => (args[0].includes('Duplicate atom key') ? null : console.warn(...args)),
  }));
  global.console = mutedConsole(global.console);
  return (
    <RecoilRoot>
      <NextNProgress />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
