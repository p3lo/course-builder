import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import memoize from 'memoizee';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import 'react-toastify/dist/ReactToastify.min.css';
import NavBar from '../components/NavBar';
import { CategoryType } from '../types';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [categories, setCategories] = useState<CategoryType[]>();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      fetch('/api/set-auth-cookie', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      }).then((res) => res.json());
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);
  useEffect(() => {
    supabase
      .from('categories')
      .select('id,name, subcategories!inner(id, name)')
      .then((result) => {
        setCategories(result.data);
      });
    console.log(categories);
  }, []);
  const mutedConsole = memoize((console) => ({
    ...console,
    warn: (...args) => (args[0].includes('Duplicate atom key') ? null : console.warn(...args)),
  }));
  global.console = mutedConsole(global.console);
  return (
    <RecoilRoot>
      <NextNProgress />
      <NavBar categories={categories} />
      <Component {...pageProps} />
      <ToastContainer autoClose={4000} limit={3} position="bottom-center" closeOnClick={true} theme="colored" />
    </RecoilRoot>
  );
}

export default MyApp;
