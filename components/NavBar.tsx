import Link from 'next/link';
import { CgMenuGridO } from 'react-icons/cg';
import { HiSearch } from 'react-icons/hi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Profile from './navbar/Profile';
import { CategoryType, FullCourse, ProfileType } from '../types';
import Category from './navbar/Category';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { categoriesAtom } from '../recoil/atoms/categoriesAtom';
import { userProfileAtom } from '../recoil/atoms/userProfileAtom';
import { cartAtom } from '../recoil/atoms/cartAtom';
import Cart from './navbar/Cart';
import { enrolledAtom } from '../recoil/atoms/enrolledAtom';

const NavBar: React.FC<{}> = () => {
  const [categories, setCategories] = useRecoilState<CategoryType[]>(categoriesAtom);
  const [cart, setCart] = useRecoilState<FullCourse[]>(cartAtom);
  const [user, setUser] = useRecoilState<ProfileType>(userProfileAtom);
  const [enrolled, setEnrolled] = useRecoilState<any[]>(enrolledAtom);
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  useEffect(() => {
    supabase
      .from('categories')
      .select('id,name, subcategories!inner(id, name)')
      .then((result) => {
        setCategories(result.data);
      });
    if (session) {
      supabase
        .from('profiles')
        .select('id, username, avatar_url, email')
        .eq('id', session.user.id)
        .then((result) => {
          setUser(result.data[0]);
        });
      supabase
        .from('enrolled_courses')
        .select(`course`)
        .eq('person', session.user.id)
        .then((result: any) => {
          setEnrolled(result.data);
        });
    }
  }, [session]);

  return (
    <header className="sticky inset-0 top-0 z-10 grid grid-cols-3 px-5 py-2 text-gray-100 bg-gray-500 shadow-md">
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
        <Cart />
        {user ? (
          <div className="flex items-center">
            <IoMdNotificationsOutline className="w-[22px] h-[22px] transition duration-150 ease-out transform cursor-pointer hover:scale-125 mr-5" />
            <Profile user_data={user} />
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
    </header>
  );
};

export default NavBar;
