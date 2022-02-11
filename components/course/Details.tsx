import { Tab } from '@headlessui/react';
import { FullCourse } from '../../types';
import DetailsTab from './DetailsTab';
import QA from './QA';

const Details: React.FC<{ course: FullCourse }> = ({ course }) => {
  return (
    <div className="px-5">
      <Tab.Group>
        <Tab.List className="flex items-center space-x-1">
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm outline-none text-gray-200 bg-gray-600 w-56'
                : 'p-3 text-sm w-56 text-white hover:bg-gray-500 hover:shadow-md shadow-gray-800'
            }
          >
            Details
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm outline-none text-gray-200 bg-gray-600 w-56'
                : 'p-3 text-sm w-56 text-white hover:bg-gray-500 hover:shadow-md shadow-gray-800'
            }
          >
            Q/A
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-5">
          <Tab.Panel className="outline-none">
            <DetailsTab course={course} />
          </Tab.Panel>
          <Tab.Panel className="outline-none">
            <QA course_id={course.id} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Details;
