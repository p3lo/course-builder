import { Lesson, Section } from '../../types';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { Disclosure } from '@headlessui/react';

const Panel: React.FC<{ lessons: Lesson[] }> = ({ lessons }) => (
  <Disclosure.Panel className="px-4 py-2 space-y-2 text-sm text-gray-300">
    {lessons.map((item, index) => (
      <p key={item.title + index.toString()}>{item.title}</p>
    ))}
  </Disclosure.Panel>
);

const CourseContent: React.FC<{ course_content: Section[] }> = ({ course_content }) => {
  return (
    <div className="w-full">
      <h1 className="pb-3 text-xl font-bold text-white">Course content</h1>
      {course_content.map((item, index) => (
        <Disclosure key={item.section + index.toString()}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-300 bg-gray-900 border-b hover:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>{item.section}</span>
                <HiChevronDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-300`} />
              </Disclosure.Button>
              <Panel lessons={item.lessons} />
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default CourseContent;
