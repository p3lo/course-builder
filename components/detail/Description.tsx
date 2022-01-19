import { useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { FullCourse } from '../../types';
import parse from 'html-react-parser';

const Description: React.FC<{ course: FullCourse }> = ({ course }) => {
  const ref = useRef<HTMLInputElement>();
  const [lineClamp, setLineClamp] = useState(false);

  const style = lineClamp ? { height: ref.current?.scrollHeight } : { height: 100 };
  function createMarkup() {
    return { __html: course.description };
  }

  return (
    <div className="">
      <h1 className="pb-3 text-xl font-bold text-white">Description</h1>
      <div className="overflow-hidden text-sm text-white duration-300 md:overflow-x-hidden transition-height ease">
        <div
          className={
            lineClamp
              ? 'line-clamp-none'
              : 'line-clamp-4 text-transparent bg-clip-text bg-gradient-to-t  from-transparent via-gray-500  to-gray-200'
          }
        >
          {parse(course.description)}
        </div>
      </div>
      <div className="flex items-center py-2 text-blue-400 cursor-pointer" onClick={() => setLineClamp(!lineClamp)}>
        <a className="text-sm font-bold ">Read more</a>
        <HiChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
};

export default Description;
