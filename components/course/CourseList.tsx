import { Disclosure } from '@headlessui/react';
import { CourseDetails, FullCourse, Lesson, Section, ToggleWithVideo } from '../../types';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { modalLessonVideoAtom } from '../../recoil/atoms/modalsAtom';
import produce from 'immer';
import { courseDetailsAtom } from '../../recoil/atoms/courseDetailsAtom';
import { toggleNextVideoAtom } from '../../recoil/atoms/toggleNextVideoAtom';
import { useEffect } from 'react';

const Panel: React.FC<{ lessons: Lesson[]; sectionId: string }> = ({ lessons, sectionId }) => {
  const [video, setVideo] = useRecoilState<CourseDetails>(courseDetailsAtom);
  function setVideoF(item: Lesson) {
    const vid = produce(video, (draft) => {
      draft.url = item.content_url;
      draft.title = item.title;
      draft.lessonId = item.id;
      draft.sectionId = sectionId;
    });
    setVideo(vid);
  }

  return (
    <Disclosure.Panel className="px-1 py-1 space-y-1 text-sm text-gray-300 ">
      {lessons.map((item, index) => (
        <div key={item.title + index.toString()} className="flex items-center space-x-1">
          <input type="checkbox" className="checkbox checkbox-accent h-4 w-4" />
          <div
            className={`flex grow items-center p-1 space-x-2 border border-gray-500 ${
              video.lessonId === item.id && 'bg-gray-300 text-gray-800'
            }`}
          >
            <AiFillPlayCircle className="w-4 h-4" />
            <a
              className={`cursor-pointer  ${
                video.lessonId === item.id ? 'hover:text-blue-700' : 'hover:text-blue-300'
              }`}
              onClick={() => setVideoF(item)}
            >
              {item.title}
            </a>
          </div>
        </div>
      ))}
    </Disclosure.Panel>
  );
};

const CourseList: React.FC<{ course_content: Section[] }> = ({ course_content }) => {
  return (
    <div className="w-full">
      {course_content.map((item, index) => (
        <Disclosure key={item.section + index.toString()} defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-300 bg-gray-900 border-b hover:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>{item.section}</span>
                <HiChevronDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-300`} />
              </Disclosure.Button>
              <Panel lessons={item.lessons} sectionId={item.id} />
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default CourseList;
