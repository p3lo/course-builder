import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { useRecoilState } from 'recoil';
import { Disclosure } from '@headlessui/react';
import produce from 'immer';
import BuilderAccordionItem from './BuilderAccordionItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';

function BuilderAccordion() {
  const [courseInfo, setCourseInfo] = useRecoilState(courseBuildAtom);
  const [winReady, setwinReady] = useState(false);

  useEffect(() => {
    setwinReady(true);
  }, []);

  const addSection = () => {
    const section = produce(courseInfo, (draft) => {
      draft.content.push({ section: `Section ${draft.content.length}`, lessons: [{ title: 'Lesson' }] });
    });
    setCourseInfo(section);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const moveData = produce(courseInfo, (draft) => {
      const getItem = courseInfo.content[source.index];

      draft.content.splice(source.index, 1);
      draft.content.splice(destination.index, 0, getItem);
    });
    setCourseInfo(moveData);
  };

  return (
    <div className="flex flex-col justify-center w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        {winReady ? (
          <div>
            <Droppable droppableId={'1'}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {courseInfo.content.map((_, key: number) => (
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
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ) : null}
      </DragDropContext>
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
