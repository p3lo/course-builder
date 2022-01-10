import { courseBuildAtom } from '../../recoil/atoms/courseBuildAtom';
import { useRecoilState } from 'recoil';
import { Disclosure, Transition } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';
import { useState } from 'react';
import { BsCheck, BsX } from 'react-icons/bs';
import { BiMove } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import produce from 'immer';
import BuilderAccordionPanelItem from './BuilderAccordionPanelItem';
import { FullCourse } from '../../types';
import { Draggable } from 'react-beautiful-dnd';

const BuilderAccordionItem: React.FC<{ index: number; open: boolean }> = ({ index, open }) => {
  const [courseInfo, setCourseInfo] = useRecoilState<FullCourse>(courseBuildAtom);
  const [toggleCourseTitle, setToggleCourseTitle] = useState<boolean>(false);
  const [courseTitleInput, setCourseTitleInput] = useState<string>('');

  const updateSectionTitle = (): void => {
    setToggleCourseTitle(!toggleCourseTitle);
    const title = produce(courseInfo, (draft: FullCourse) => {
      draft.content[index].section = courseTitleInput;
    });
    setCourseInfo(title);
  };

  const deleteSection = (): void => {
    const sections = produce(courseInfo, (draft: FullCourse) => {
      draft.content.splice(index, 1);
    });
    setCourseInfo(sections);
  };

  const addLesson = (): void => {
    const lessons = produce(courseInfo, (draft: FullCourse) => {
      draft.content[index].lessons.push({ title: `Lesson ${draft.content[index].lessons.length}` });
    });
    setCourseInfo(lessons);
  };
  return (
    <Draggable draggableId={index.toString()} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div className="relative">
            <div className="flex items-center bg-black border-b hover:bg-gray-900">
              <Disclosure.Button className="flex justify-between w-full px-4 py-5 text-sm font-medium text-left text-white focus:outline-none">
                <span>{courseInfo.content[index].section}</span>
                <HiChevronDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5`} />
              </Disclosure.Button>
              <div className="flex mx-3 space-x-2 text-white">
                <AiOutlineEdit
                  onClick={() => {
                    setToggleCourseTitle(!toggleCourseTitle);
                    setCourseTitleInput(courseInfo.content[index].section);
                  }}
                  className="w-4 h-4 transition ease-in-out delay-150 cursor-pointer hover:scale-125 hover:text-blue-200"
                />
                <HiOutlineTrash
                  onClick={deleteSection}
                  className="w-4 h-4 transition ease-in-out delay-150 cursor-pointer hover:scale-125 hover:text-red-200"
                />
                <div {...provided.dragHandleProps}>
                  <BiMove className="w-4 h-4 transition ease-in-out delay-150 cursor-grab hover:scale-125" />
                </div>
              </div>
            </div>

            <Transition
              show={toggleCourseTitle}
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute flex w-3/4 top-2 left-2">
                <input
                  defaultValue={courseInfo.content[index].section}
                  className="flex-grow px-5 py-2 text-black bg-gray-200 rounded-l-full outline-none"
                  onChange={(e) => setCourseTitleInput(e.target.value)}
                  maxLength={120}
                  spellCheck="false"
                />
                <div className="relative w-10 bg-gray-300 ">
                  <span className="absolute flex items-center justify-center w-full h-full font-bold text-gray-500">
                    {120 - courseTitleInput.length}
                  </span>
                </div>
                <div className="relative w-16 bg-gray-300 rounded-r-full ">
                  <div className="absolute flex items-center top-2 left-1">
                    <BsCheck
                      className="w-6 h-6 transition ease-in-out delay-150 cursor-pointer hover:scale-125 hover:text-blue-600"
                      onClick={updateSectionTitle}
                    />
                    <BsX
                      onClick={() => setToggleCourseTitle(false)}
                      className="w-6 h-6 transition ease-in-out delay-150 cursor-pointer hover:scale-125 hover:text-red-600"
                    />
                  </div>
                </div>
              </div>
            </Transition>
          </div>
          <div>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="px-4 py-2 space-y-1 text-sm text-gray-500">
                {courseInfo.content[index].lessons.map((_, key) => (
                  <BuilderAccordionPanelItem key={key} index={index} lessonIndex={key} />
                ))}
                <div className="flex justify-center w-full">
                  <button
                    onClick={addLesson}
                    className="p-1 my-2 border border-gray-400 w-44 hover:shadow-sm hover:shadow-gray-300"
                  >
                    Add lesson
                  </button>
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default BuilderAccordionItem;
