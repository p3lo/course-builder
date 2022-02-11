import Image from 'next/image';
import { FullCourse } from '../../types';

const DetailsTab: React.FC<{ course: FullCourse }> = ({ course }) => {
  const description = () => {
    return { __html: course.description };
  };
  const author = () => {
    return { __html: course.author.description };
  };

  return (
    <div className="pb-5">
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-bold">Description</h2>
        <div dangerouslySetInnerHTML={description()} />
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-bold">Author</h2>
        <div className="">
          <div className="flex flex-col space-y-1 items-center float-left pr-5 pb-5">
            <div className="w-[100px] h-[100px] border rounded-full overflow-hidden ">
              <Image
                src={course.author.avatar_url}
                alt={course.author.username}
                width={100}
                height={100}
                objectFit="scale-down"
              />
            </div>
            <p className="text-sm">{course.author.username}</p>
            <p className="text-xs">{course.author.headline}</p>
          </div>
          <div dangerouslySetInnerHTML={author()} />
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
