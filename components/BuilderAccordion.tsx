import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { useRecoilState } from 'recoil';
import { Disclosure } from '@headlessui/react';
import produce from 'immer';
import BuilderAccordionItem from './BuilderAccordionItem';

function BuilderAccordion() {
  const [courseInfo, setCourseInfo] = useRecoilState(courseBuildAtom);

  const addSection = () => {
    const section = produce(courseInfo, (draft) => {
      draft.sections.push({ sectionTitle: `Section ${draft.sections.length}`, lessons: [{ lessonTitle: 'Lesson' }] });
    });
    setCourseInfo(section);
  };

  return (
    <div className="flex flex-col justify-center w-full">
      {courseInfo.sections.map((_, key) => (
        <div key={key}>
          <Disclosure>
            {({ open }) => (
              <>
                <BuilderAccordionItem index={key} open={open} />
              </>
            )}
          </Disclosure>
        </div>
      ))}
      <div className="flex justify-center w-full">
        <button
          onClick={addSection}
          className="w-48 p-3 my-2 border border-gray-400 hover:shadow-sm hover:shadow-gray-300"
        >
          Add section
        </button>
      </div>
    </div>
  );
}

export default BuilderAccordion;
