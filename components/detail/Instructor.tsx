import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ProfileType } from '../../types';
import { HiOutlineAnnotation, HiOutlineStar, HiOutlineUsers, HiOutlinePlay, HiChevronDown } from 'react-icons/hi';
import parse from 'html-react-parser';

const Instructor: React.FC<{ profile: ProfileType }> = ({ profile }) => {
  const [lineClamp, setLineClamp] = useState(false);

  return (
    <div className="pb-3">
      <h1 className="pb-3 text-xl font-bold text-white">Instructor</h1>
      <Link href="#">
        <a className="font-semibold text-blue-500 underline text-md">{profile.username}</a>
      </Link>
      <p className="pb-2 text-xs text-gray-300">{profile.headline}</p>
      <div className="flex space-x-3">
        <Image className="rounded-full " alt="Profile image" src={profile.avatar_url} width={100} height={100} />
        <div className="pt-1 space-y-1 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <HiOutlineAnnotation className="w-3 h-3" />
            <p>4.6 Instructor Rating</p>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlineStar className="w-3 h-3" />
            <p>816,777 Reviews</p>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlineUsers className="w-3 h-3" />
            <p>2,535,169 Students</p>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlinePlay className="h-3" />
            <p>39 Courses</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden text-sm text-white duration-300 md:overflow-x-hidden transition-height ease ">
        <div
          className={
            lineClamp
              ? 'line-clamp-none'
              : 'line-clamp-4 text-transparent bg-clip-text bg-gradient-to-t from-transparent via-gray-500 to-gray-200'
          }
        >
          {parse(profile.description)}
        </div>
      </div>
      <div className="flex items-center py-2 text-blue-400 cursor-pointer" onClick={() => setLineClamp(!lineClamp)}>
        <a className="text-sm font-bold ">Read more</a>
        <HiChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
};

export default Instructor;
