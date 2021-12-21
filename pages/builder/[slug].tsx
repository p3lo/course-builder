import BuilderAccordion from '../../components/BuilderAccordion';
import axios from 'axios';
import { courseBuildAtom } from '../../recoil/atoms/courseBuildAtom';
import { useRecoilState } from 'recoil';
import { Course } from '../../types';
import { GetServerSideProps } from 'next';
import dbConnect from '../../lib/dbConnect';
import CourseBuilder from '../../models/CourseBuilder';
import { useEffect } from 'react';
import Link from 'next/link';

const Builder: React.FC<{ course: Course }> = ({ course }) => {
  const [courseInfo, setCourseInfo] = useRecoilState<Course>(courseBuildAtom);

  useEffect(() => {
    if (course) setCourseInfo(course);
  }, [setCourseInfo, course]);

  const saveData = (): void => {
    console.log(courseInfo.slug);
    if (course) {
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
      <div>
        <BuilderAccordion />
      </div>
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
  const course: Course = await CourseBuilder.findOne({ slug }).select('-_id -__v -sections._id -sections.lessons._id');

  return {
    props: {
      course: JSON.parse(JSON.stringify(course)),
    },
  };
};
