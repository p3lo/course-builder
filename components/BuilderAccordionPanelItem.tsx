import { useRecoilState } from 'recoil';
import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { AiOutlineEdit } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import produce from 'immer';
import { Course } from '../types';

const BuilderAccordionPanelItem: React.FC<{ index: number; lessonIndex: number }> = ({ index, lessonIndex }) => {
  const [courseInfo, setCourseInfo] = useRecoilState(courseBuildAtom);
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [lessonTitle, setLessonTitle] = useState<string>(courseInfo.sections[index].lessons[lessonIndex].lessonTitle);

  const updateLesson = (): void => {
    const lesson = produce(courseInfo, (draft: Course) => {
      draft.sections[index].lessons[lessonIndex].lessonTitle = lessonTitle;
    });
    setCourseInfo(lesson);
    setEditToggle(false);
  };

  const deleteLesson = (): void => {
    const lessons = produce(courseInfo, (draft: Course) => {
      draft.sections[index].lessons.splice(lessonIndex, 1);
      // draft.sections[index].lessons.map((item, key) => (item.lessonTitle = `Lesson ${key}`));
    });
    setCourseInfo(lessons);
  };

  return (
    <div className="px-4 border">
      <div className="flex items-center justify-between ">
        <p className="py-1 ">{courseInfo.sections[index].lessons[lessonIndex].lessonTitle}</p>
        <div className="flex space-x-2">
          <AiOutlineEdit
            className="w-4 h-4 transition ease-in-out delay-150 cursor-pointer hover:scale-125 hover:text-blue-800"
            onClick={() => setEditToggle(!editToggle)}
          />
          <HiOutlineTrash
            onClick={deleteLesson}
            className="w-4 h-4 transition ease-in-out delay-150 cursor-pointer hover:scale-125 hover:text-red-600"
          />
        </div>
      </div>

      <Transition
        show={editToggle}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="w-full border-b border-gray-400" />
        <div className="flex flex-col my-2 space-y-2">
          <div className="relative flex w-full mx-auto sm:w-3/4 md:w-1/2">
            <input
              className="flex-grow px-3 py-1 border outline-none rounded-l-md focus:border-blue-400 focus:shadow-sm focus:shadow-blue-200"
              defaultValue={courseInfo.sections[index].lessons[lessonIndex].lessonTitle}
              placeholder="Lesson title"
              onChange={(e) => setLessonTitle(e.target.value)}
              maxLength={40}
              spellCheck="false"
            />
            <span className="flex items-center justify-center w-10 h-full py-1 font-bold text-gray-500 bg-gray-300 border rounded-r-md">
              {40 - lessonTitle.length}
            </span>
          </div>
          <button onClick={updateLesson} className="w-40 p-2 mx-auto border border-gray-400 shadow-sm shadow-gray-300">
            Save lesson
          </button>
        </div>
      </Transition>
    </div>
  );
};

export default BuilderAccordionPanelItem;
