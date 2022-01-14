import Link from 'next/link';
import { CgMenuGridO } from 'react-icons/cg';
import { HiSearch } from 'react-icons/hi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Session } from '@supabase/supabase-js';
import Profile from './navbar/Profile';
import { CategoryType } from '../types';
import Category from './navbar/Category';

const NavBar: React.FC<{ categories: CategoryType[] }> = ({ categories }) => {
  const [session, setSession] = useState(null);
  const router = useRouter();
  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <div className="sticky inset-0 top-0 z-10 grid grid-cols-3 px-5 py-2 text-gray-100 bg-gray-500 shadow-md">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <a className="font-mono text-xl antialiased font-extrabold tracking-tighter">Coursemy</a>
        </Link>
        <div className="h-5 border-r border-gray-300" />
        <Category categories={categories} />
      </div>

      <div className="flex items-center pl-3 pr-1 rounded-full md:border-2">
        <input
          type="text"
          placeholder="Search..."
          spellCheck="false"
          className="w-full py-2 text-sm text-gray-200 placeholder-gray-300 bg-transparent outline-none active:border-none"
        />
        <HiSearch className="hidden p-1 text-white transition duration-150 ease-out transform bg-gray-700 rounded-full cursor-pointer w-7 h-7 md:inline-flex hover:scale-125" />
      </div>
      <div className="flex items-center justify-end space-x-5 text-sm ">
        <Link href="#">
          <a className="hidden p-2 xl:inline-flex hover:text-white">Become teacher</a>
        </Link>
        <div>
          <AiOutlineShoppingCart className="w-5 h-5 transition duration-150 ease-out transform cursor-pointer hover:scale-125" />
        </div>
        {session ? (
          <div className="flex items-center">
            <IoMdNotificationsOutline className="w-[22px] h-[22px] transition duration-150 ease-out transform cursor-pointer hover:scale-125 mr-5" />
            <Profile session={session} />
          </div>
        ) : (
          <div className="hidden md:inline-flex gap-x-2">
            <Link href="/login">
              <a className="w-[70px] p-2 rounded-md border border-gray-300 shadow-md text-center ">Log in</a>
            </Link>
            <Link href="#">
              <a className="w-[70px] p-2 bg-gray-300 text-gray-800 rounded-md border border-gray-700 shadow-md text-center">
                Sign up
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
