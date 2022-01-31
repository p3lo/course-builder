import { Session } from '@supabase/supabase-js';
import Tippy from '@tippyjs/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'tippy.js/dist/tippy.css';
import { supabase } from '../../lib/supabaseClient';
import { ProfileType } from '../../types';

const Profile: React.FC<{ user_data: ProfileType }> = ({ user_data }) => {
  const router = useRouter();

  const profile = (
    <div className="flex flex-col items-center mx-3 my-1 space-y-2 w-60 ">
      <div className="flex items-center w-full space-x-2">
        <div className="flex items-center rounded-full left-5 ring-1 ring-gray-200">
          <Image
            src={user_data.avatar_url}
            alt="Profile"
            width={55}
            height={55}
            objectFit="fill"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col mb-2">
          <p className="font-bold">{user_data.username}</p>
          <p className="text-xs text-gray-200">{user_data.email}</p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full mt-3 space-y-3 tracking-wide text-gray-200">
        <div className="w-full border-t border-gray-200"></div>
        <Link href={`/user/${user_data.id}`}>My profile</Link>
        <div className="w-full border-t border-gray-200"></div>
        <Link href="#">My learning</Link>
        <Link href="/user/cart">My cart</Link>
        <Link href="#">Teach on Coursemy</Link>
        <div className="w-full border-t border-gray-200"></div>
        <Link href="#">Notifications</Link>
        <div className="w-full border-t border-gray-200"></div>
        <button
          className="tracking-wider"
          onClick={() => {
            supabase.auth.signOut();
            router.push('/');
            router.reload();
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
  return (
    <div>
      <Tippy
        content={profile}
        animation="fade"
        interactive={true}
        arrow={false}
        theme="dark"
        placement="bottom-end"
        offset={[0, 10]}
      >
        <div
          className="flex items-center rounded-full cursor-pointer ring-1 ring-gray-200"
          onClick={() => router.push(`/user/${user_data.id}`)}
        >
          <Image
            src={user_data.avatar_url}
            alt="Profile image"
            width={40}
            height={40}
            objectFit="fill"
            className="overflow-hidden rounded-full"
          />
        </div>
      </Tippy>
    </div>
  );
};

export default Profile;
