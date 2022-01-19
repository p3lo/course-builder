import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai';

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

  async function signInWithGoogle() {
    setLoading(true);
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    });
    if (error) throw error;
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-3 py-10">
      <div className="flex flex-col items-center justify-center w-full max-h-screen col-start-2 space-y-4">
        <h1 className="mb-10 text-3xl font-extrabold ">Supabase + Next.js</h1>
        <div className="relative">
          <button onClick={signInWithGithub} className="py-3 border w-[200px]">
            GitHub
          </button>
          <AiFillGithub className="absolute w-7 h-7 inset-3" />
        </div>
        <div className="relative">
          <button onClick={signInWithGoogle} className="py-3 border w-[200px]">
            Google
          </button>
          <AiFillGoogleCircle className="absolute w-7 h-7 inset-3" />
        </div>
        <div className="w-full border-b border-white" />
        <p className="">Sign in via magic link with your email below</p>
        <div className="w-full ">
          <label className="input-group">
            <span>Email</span>
            <input
              type="email"
              className="w-full input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
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
