import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { useRecoilState } from 'recoil';
import { Disclosure, Transition } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';
import { useState } from 'react';
import { BsCheck, BsX } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

function BuilderAccordionItem({ index, open }) {
  const [courseInfo, setCourseInfo] = useRecoilState(courseBuildAtom);
  const [toggleCourseTitle, setToggleCourseTitle] = useState(false);
  const [courseTitleInput, setCourseTitleInput] = useState('');

  const updateSectionTitle = () => {
    let title = JSON.parse(JSON.stringify(courseInfo));
    title.sections[index].sectionTitle = courseTitleInput;
    setCourseInfo(title);
    setToggleCourseTitle(!toggleCourseTitle);
  };
  return (
    <div className="relative">
      <div className="bg-black flex items-center border-b hover:bg-gray-900">
        <Disclosure.Button className="flex justify-between w-full px-4 py-5 text-sm font-medium text-left text-white  focus:outline-none">
          <span>{courseInfo.sections[index].sectionTitle}</span>
          <HiChevronDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5`} />
        </Disclosure.Button>
        <AiOutlineEdit
          onClick={() => {
            setToggleCourseTitle(!toggleCourseTitle);
            setCourseTitleInput(courseInfo.sections[index].sectionTitle);
          }}
          className="mx-3 w-5 h-5 text-white cursor-pointer"
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
        <div className="flex absolute top-2 left-2 w-3/4">
          <input
            defaultValue={courseInfo.sections[index].sectionTitle}
            className="bg-gray-200 flex-grow px-5 py-2 rounded-l-full text-black outline-none"
            onChange={(e) => setCourseTitleInput(e.target.value)}
          />
          <div className="bg-gray-300 w-16 rounded-r-full relative ">
            <div className="absolute flex top-1 items-center">
              <BsCheck className="w-7 h-7  text-green-700 cursor-pointer" onClick={updateSectionTitle} />
              <BsX onClick={() => setToggleCourseTitle(false)} className="w-7 h-7 text-red-700 cursor-pointer" />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default BuilderAccordionItem;
