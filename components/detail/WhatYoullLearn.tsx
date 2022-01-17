import { FullCourse } from '../../types';
import { HiOutlineCheck } from 'react-icons/hi';

const WhatYoullLearn: React.FC<{ course: FullCourse }> = ({ course }) => {
  return (
    <div className="px-4 py-6 mb-4 text-gray-300 border">
      <h1 className="pb-3 text-xl font-bold text-white">{`What you'll learn`}</h1>
      <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-2">
        <div className="flex items-start space-x-2">
          <HiOutlineCheck className="w-5 h-5" />
          <p>Learn to use Python professionally, learning both Python 2 and Python 3!</p>
        </div>
        <div className="flex items-start space-x-2">
          <HiOutlineCheck className="w-5 h-5" />
          <p>Create games with Python, like Tic Tac Toe and Blackjack!</p>
        </div>
        <div className="flex items-start space-x-2">
          <HiOutlineCheck className="w-5 h-5" />
          <p>Learn advanced Python features, like the collections module and how to work with timestamps!</p>
        </div>
        <div className="flex items-start space-x-2">
          <HiOutlineCheck className="w-5 h-5" />
          <p>Learn to use Object Oriented Programming with classes!</p>
        </div>
        <div className="flex items-start space-x-2">
          <HiOutlineCheck className="w-5 h-5" />
          <p>Understand complex topics, like decorators.</p>
        </div>
        <div className="flex items-start space-x-2">
          <HiOutlineCheck className="w-5 h-5" />
          <p>Understand how to use both the Jupyter Notebook and create .py files</p>
        </div>
      </div>
    </div>
  );
};

export default WhatYoullLearn;
