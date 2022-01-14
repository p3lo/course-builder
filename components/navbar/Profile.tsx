import { Session } from '@supabase/supabase-js';
import Tippy from '@tippyjs/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'tippy.js/dist/tippy.css';
import { supabase } from '../../lib/supabaseClient';

const Profile: React.FC<{ session: Session }> = ({ session }) => {
  const router = useRouter();
  const profile = (
    <div className="flex flex-col items-center mx-3 my-1 space-y-2 w-60 ">
      <div className="flex items-center w-full space-x-2">
        <div className="flex items-center rounded-full left-5 ring-1 ring-gray-200">
          <Image
            src={session?.user.user_metadata.avatar_url}
            alt="Profile"
            width={55}
            height={55}
            objectFit="fill"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col mb-2">
          <p className="font-bold">{session?.user.app_metadata.fullname}</p>
          <p className="text-xs text-gray-200">{session?.user.user_metadata.email}</p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full mt-3 space-y-3 tracking-wide text-gray-200">
        <div className="w-full border-t border-gray-200"></div>
        <Link href={`/user/${session.user.id}`}>My profile</Link>
        <div className="w-full border-t border-gray-200"></div>
        <Link href="#">My learning</Link>
        <Link href="#">My cart</Link>
        <Link href="#">Teach on Udemy</Link>
        <div className="w-full border-t border-gray-200"></div>
        <Link href="#">Notifications</Link>
        <div className="w-full border-t border-gray-200"></div>
        <button
          className="tracking-wider"
          onClick={() => {
            supabase.auth.signOut();
            router.push('/');
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
          onClick={() => router.push(`/user/${session.user.id}`)}
        >
          <Image
            src={session?.user.user_metadata.avatar_url}
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
