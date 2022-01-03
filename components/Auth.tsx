import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  async function signInWithGithub() {
    setLoading(true);
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'github',
    });
    if (error) throw error;
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-3 ">
      <div className="flex flex-col items-center justify-center w-full min-h-screen col-start-2 space-y-4">
        <h1 className="mb-10 text-3xl font-extrabold ">Supabase + Next.js</h1>
        <p className="">Log in with github</p>
        <button onClick={signInWithGithub} className="py-3 border px-7">
          GitHub
        </button>
        <div className="w-full border-b border-white" />
        <p className="">Sign in via magic link with your email below</p>
        <div className="w-full ">
          <input
            className="w-full p-2 text-sm text-gray-700 placeholder-gray-500 bg-gray-300 border outline-none"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            className="p-3 border"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
