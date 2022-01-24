import { Lesson, Section, ToggleWithVideo } from '../../types';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { Disclosure } from '@headlessui/react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { modalLessonVideoAtom } from '../../recoil/atoms/modalsAtom';
import produce from 'immer';

const Panel: React.FC<{ lessons: Lesson[] }> = ({ lessons }) => {
  const [videoModal, setVideoModal] = useRecoilState<ToggleWithVideo>(modalLessonVideoAtom);
  function openModal(item: Lesson) {
    const close = produce(videoModal, (draft) => {
      draft.isOpen = true;
      draft.url = item.content_url;
      draft.title = item.title;
    });
    setVideoModal(close);
  }
  return (
    <Disclosure.Panel className="px-4 py-2 space-y-2 text-sm text-gray-300">
      {lessons.map((item, index) => (
        <div key={item.title + index.toString()} className="flex items-center space-x-2">
          <AiFillPlayCircle className="w-4 h-4" />
          <p>{item.title}</p>
          {item.is_preview && (
            <button onClick={() => openModal(item)} className="text-blue-500 underline underline-offset-2">
              ( Preview )
            </button>
          )}
        </div>
      ))}
    </Disclosure.Panel>
  );
};

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
