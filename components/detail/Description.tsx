import { useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { FullCourse } from '../../types';

const Description: React.FC<{ course: FullCourse }> = ({ course }) => {
  const ref = useRef<HTMLInputElement>();
  const [lineClamp, setLineClamp] = useState(false);

  const style = lineClamp ? { height: ref.current?.scrollHeight } : { height: 100 };
  function createMarkup() {
    return { __html: course.description };
  }
  console.log(ref.current?.scrollHeight);
  return (
    <div className="pb-3">
      <h1 className="pb-3 text-xl font-bold text-white">Description</h1>
      <div
        ref={ref}
        className="overflow-hidden text-sm text-white duration-300 md:overflow-x-hidden transition-height ease"
        style={style}
      >
        <p
          className={
            lineClamp
              ? ''
              : 'text-transparent bg-clip-text bg-gradient-to-t from-transparent via-transparent to-gray-200'
          }
        >
          <div dangerouslySetInnerHTML={createMarkup()} />
        </p>
      </div>
      <div className="flex items-center py-2 text-blue-400 cursor-pointer">
        <a className="text-sm font-bold " onClick={() => setLineClamp(!lineClamp)}>
          Read more
        </a>
        <HiChevronDown className="h-5 w-5" />
      </div>
    </div>
  );
};

export default Description;
