import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { useRecoilState } from 'recoil';
import { Disclosure, Transition } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';
import { useState } from 'react';
import { BsCheck, BsX } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import produce from 'immer';
import BuilderAccordionPanelItem from './BuilderAccordionPanelItem';

function BuilderAccordionItem({ index, open }) {
  const [courseInfo, setCourseInfo] = useRecoilState(courseBuildAtom);
  const [toggleCourseTitle, setToggleCourseTitle] = useState(false);
  const [courseTitleInput, setCourseTitleInput] = useState('');

  const updateSectionTitle = () => {
    setToggleCourseTitle(!toggleCourseTitle);
    const title = produce(courseInfo, (draft) => {
      draft.sections[index].sectionTitle = courseTitleInput;
    });
    setCourseInfo(title);
  };
  return (
    <div>
      <div className="relative">
        <div className="flex items-center bg-black border-b hover:bg-gray-900">
          <Disclosure.Button className="flex justify-between w-full px-4 py-5 text-sm font-medium text-left text-white focus:outline-none">
            <span>{courseInfo.sections[index].sectionTitle}</span>
            <HiChevronDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5`} />
          </Disclosure.Button>
          <AiOutlineEdit
            onClick={() => {
              setToggleCourseTitle(!toggleCourseTitle);
              setCourseTitleInput(courseInfo.sections[index].sectionTitle);
            }}
            className="w-5 h-5 mx-3 text-white cursor-pointer"
          />
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
              defaultValue={courseInfo.sections[index].sectionTitle}
              className="flex-grow px-5 py-2 text-black bg-gray-200 rounded-l-full outline-none"
              onChange={(e) => setCourseTitleInput(e.target.value)}
            />
            <div className="relative w-16 bg-gray-300 rounded-r-full ">
              <div className="absolute flex items-center top-1">
                <BsCheck className="text-green-700 cursor-pointer w-7 h-7" onClick={updateSectionTitle} />
                <BsX onClick={() => setToggleCourseTitle(false)} className="text-red-700 cursor-pointer w-7 h-7" />
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
          <Disclosure.Panel className="px-4 py-2 text-sm text-gray-500">
            {courseInfo.sections[index].lessons.map((_, key) => (
              <BuilderAccordionPanelItem key={key} index={index} lessonIndex={key} />
            ))}
          </Disclosure.Panel>
        </Transition>
      </div>
    </div>
  );
}

export default BuilderAccordionItem;
