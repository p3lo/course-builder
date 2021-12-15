import { useRecoilState } from 'recoil';
import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { AiOutlineEdit } from 'react-icons/ai';
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import produce from 'immer';

function BuilderAccordionPanelItem({ index, lessonIndex }) {
  const [courseInfo, setCourseInfo] = useRecoilState(courseBuildAtom);
  const [editToggle, setEditToggle] = useState(false);
  const [lessonTitle, setLessonTitle] = useState(courseInfo.sections[index].lessons[lessonIndex].lessonTitle);

  const updateLesson = () => {
    const lesson = produce(courseInfo, (draft) => {
      draft.sections[index].lessons[lessonIndex].lessonTitle = lessonTitle;
    });
    setCourseInfo(lesson);
    setEditToggle(false);
  };

  return (
    <div className="px-4 border">
      <div className="flex items-center justify-between ">
        <p className="py-1 ">{courseInfo.sections[index].lessons[lessonIndex].lessonTitle}</p>
        <AiOutlineEdit className="w-4 h-4 cursor-pointer" onClick={() => setEditToggle(!editToggle)} />
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
          <input
            className="w-full px-3 py-1 mx-auto border rounded-md outline-none sm:w-3/4 md:w-1/2 focus:border-blue-400 focus:shadow-sm focus:shadow-blue-200"
            defaultValue={courseInfo.sections[index].lessons[lessonIndex].lessonTitle}
            placeholder="Lesson title"
            onChange={(e) => setLessonTitle(e.target.value)}
          />
          <button onClick={updateLesson} className="w-40 p-2 mx-auto border border-gray-400 shadow-sm shadow-gray-300">
            Save lesson
          </button>
        </div>
      </Transition>
    </div>
  );
}

export default BuilderAccordionPanelItem;
