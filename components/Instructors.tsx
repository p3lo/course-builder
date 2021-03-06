import Image from 'next/image';
import { Author } from '../types';

const Instructors: React.FC<{ instructor: Author }> = ({ instructor }) => {
  return (
    <div className="flex px-5 pb-5 bg-zinc-600">
      <div className="flex flex-col items-center space-y-2">
        <div className="rounded-full overflow-hidden border border-gray-500 w-[100px] h-[100px]">
          <Image src={instructor.avatar_url} alt={instructor.username} width={100} height={100} objectFit="cover" />
        </div>
        <div className="flex flex-col items-center">
          <p>{instructor.username}</p>
          <p className="text-xs text-gray-400">{instructor.headline}</p>
        </div>
      </div>
    </div>
  );
};

export default Instructors;
