import { useRecoilState } from 'recoil';
import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { AiOutlineEdit, AiFillPlayCircle } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import produce from 'immer';
import { FullCourse, ToggleWithVideo } from '../types';
import WasabiUpload from './WasabiUpload';
import { modalLessonVideoAtom } from '../recoil/atoms/modalsAtom';

const BuilderAccordionPanelItem: React.FC<{ index: number; lessonIndex: number }> = ({ index, lessonIndex }) => {
  const [videoModal, setVideoModal] = useRecoilState<ToggleWithVideo>(modalLessonVideoAtom);
  const [courseInfo, setCourseInfo] = useRecoilState<FullCourse>(courseBuildAtom);
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [lessonTitle, setLessonTitle] = useState<string>(courseInfo.content[index].lessons[lessonIndex].title);

  const updateLesson = (): void => {
    const lesson = produce(courseInfo, (draft: FullCourse) => {
      draft.content[index].lessons[lessonIndex].title = lessonTitle;
    });
    setCourseInfo(lesson);
    setEditToggle(false);
  };

  const deleteLesson = (): void => {
    const lessons = produce(courseInfo, (draft: FullCourse) => {
      draft.content[index].lessons.splice(lessonIndex, 1);
      // draft.sections[index].lessons.map((item, key) => (item.lessonTitle = `Lesson ${key}`));
    });
    setCourseInfo(lessons);
  };

  function openModal() {
    const close = produce(videoModal, (draft) => {
      draft.isOpen = true;
      draft.url = courseInfo.content[index].lessons[lessonIndex].content_url;
      draft.title = courseInfo.content[index].lessons[lessonIndex].title;
    });
    setVideoModal(close);
  }

  return (
    <div className="px-4 border">
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-3">
          {courseInfo.content[index].lessons[lessonIndex].content_url && (
            <>
              <AiFillPlayCircle className="w-4 h-4" />
              <button onClick={openModal} className="text-blue-400 hover:text-blue-800 hover:underline ">
                ( Play )
              </button>
            </>
          )}
          <p className="py-1 ">{courseInfo.content[index].lessons[lessonIndex].title}</p>
        </div>
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
        <div className="flex flex-col mb-2 space-y-2">
          <div className="flex flex-col bg-gray-50">
            <label className="mt-2 ml-4 text-xs">Lesson title</label>
            <div className="relative flex w-full px-2 mb-2">
              <input
                className="flex-grow px-3 py-1 border outline-none rounded-l-md focus:border-blue-400 focus:shadow-sm focus:shadow-blue-200"
                defaultValue={courseInfo.content[index].lessons[lessonIndex].title}
                placeholder="Lesson title"
                onChange={(e) => setLessonTitle(e.target.value)}
                maxLength={40}
                spellCheck="false"
              />
              <span className="flex items-center justify-center w-10 h-full py-1 font-bold text-gray-500 bg-gray-300 border rounded-r-md">
                {40 - lessonTitle.length}
              </span>
            </div>
            <label className="mt-2 ml-4 text-xs">Content upload</label>
            <div className="flex flex-col items-center justify-center w-full px-2 mb-4 border">
              <WasabiUpload
                type={['video/*']}
                uppyId={`${index.toString()}-${lessonIndex.toString()}`}
                path={`${courseInfo.slug}/content/`}
              />
            </div>
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
