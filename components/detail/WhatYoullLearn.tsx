import { FullCourse } from '../../types';
import { HiOutlineCheck } from 'react-icons/hi';

const WhatYoullLearn: React.FC<{ course: FullCourse }> = ({ course }) => {
  return (
    <div className="px-4 py-6 mb-4 text-gray-300 border">
      <h1 className="pb-3 text-xl font-bold text-white">{`What you'll learn`}</h1>
      <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-2">
        {course.what_youll_learn.map((item) => (
          <div key={item.id} className="flex items-start space-x-2">
            <HiOutlineCheck className="w-5 h-5" />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatYoullLearn;
