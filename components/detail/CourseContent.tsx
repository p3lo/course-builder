import { Lesson, Section } from '../../types';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { Disclosure } from '@headlessui/react';

const Panel: React.FC<{ lessons: Lesson[] }> = ({ lessons }) => (
  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
    {lessons.map((item) => (
      <p key={item.title}>{item.title}</p>
    ))}
  </Disclosure.Panel>
);

const CourseContent: React.FC<{ course_content: Section[] }> = ({ course_content }) => {
  return (
    <div className="w-full p-2 mx-auto bg-white rounded-2xl">
      {course_content.map((item) => (
        <Disclosure key={item.section}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{item.section}</span>
                <HiChevronDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`} />
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
