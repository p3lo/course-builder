import BuilderAccordion from '../../components/BuilderAccordion';
import axios from 'axios';
import { courseBuildAtom } from '../../recoil/atoms/courseBuildAtom';
import { useRecoilState } from 'recoil';
import { CourseType } from '../../types';
import { GetServerSideProps } from 'next';
import dbConnect from '../../lib/dbConnect';
import course from '../../models/course';
import { useEffect } from 'react';
import Link from 'next/link';
import { Tab } from '@headlessui/react';

const Builder: React.FC<{ courses: CourseType }> = ({ courses }) => {
  const [courseInfo, setCourseInfo] = useRecoilState<CourseType>(courseBuildAtom);

  useEffect(() => {
    if (courses) setCourseInfo(courses);
  }, [setCourseInfo, courses]);

  const saveData = (): void => {
    if (courses) {
      axios.put(`/api/courseBuilder/${courseInfo.slug}`, { courseInfo }).then((response) => console.log(response));
    } else {
      axios
        .post('/api/courseBuilder', {
          courseInfo,
        })
        .then((response) => {
          console.log(response);
        });
    }
  };

  return (
    <div className="w-full screen-h">
      <h1 className="mx-auto my-3 text-2xl text-center">{courseInfo.courseName}</h1>
      <Tab.Group>
        <Tab.List className="space-x-10 m-3 ">
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm text-gray-600'
                : 'bg-white p-3 text-sm text-gray-600'
            }
          >
            Build course
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 text-sm font-bold text-gray-600'
                : 'bg-white p-3 text-sm text-gray-600'
            }
          >
            Course details
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm text-gray-600'
                : 'bg-white p-3 text-sm text-gray-600'
            }
          >
            Price settings
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div>
              <BuilderAccordion />
            </div>
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <div>
        <button onClick={saveData} className="p-3 border">
          Save course
        </button>
        <Link href="/">
          <a className="p-3 border">Home</a>
        </Link>
      </div>
    </div>
  );
};
export default Builder;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params.slug;
  await dbConnect();
  const courses: CourseType = await course.findOne({ slug }).select('-_id -__v -sections._id -sections.lessons._id');

  return {
    props: {
      courses: JSON.parse(JSON.stringify(courses)),
    },
  };
};
