import produce from 'immer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import slugify from 'slugify';
import { supabase } from '../../lib/supabaseClient';
import { courseBuildAtom } from '../../recoil/atoms/courseBuildAtom';
import { FullCourse } from '../../types';
import CourseCard from '../CourseCard';

const MyCourses: React.FC<{ courses: FullCourse[] }> = ({ courses }) => {
  const [myCourses, setMyCourses] = useState(courses);
  const [courseTitle, setCourseTitle] = useState<string>('');
  const router = useRouter();
  const [courseInfo, setCourseInfo] = useRecoilState<FullCourse>(courseBuildAtom);

  const createCourse = () => {
    if (!courseTitle) {
      return;
    }

    const slug = slugify(courseTitle, { lower: true });
    const setSlug = produce(courseInfo, (draft) => {
      draft.slug = slug;
      draft.title = courseTitle;
    });
    setCourseInfo(setSlug);
    router.push(`/builder/${slug}`);
  };

  const deleteCourse = async (id: number) => {
    const { data, error } = await supabase.from('courses').delete().match({ id });
    console.log(data, error);
    if (!error) {
      const index = myCourses.findIndex((item) => item.id === id);
      const removeItem = produce(myCourses, (draft) => {
        draft = draft.splice(index, 1);
      });
      setMyCourses(removeItem);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <input
          type="text"
          className="px-3 py-2 my-5 text-gray-800 placeholder-gray-500 bg-gray-100 border outline-none"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          spellCheck="false"
          placeholder="Course name"
        />
        <button className="px-3 py-2 border" onClick={createCourse}>
          Create course
        </button>
      </div>
      <div className="flex p-5 space-x-5">
        {myCourses.map((item) => (
          <div className="relative space-y-1" key={item.id}>
            <CourseCard course={item} />
            <div className="grid grid-cols-2 text-sm ">
              <Link href={`/builder/${item.slug}`}>
                <a className="text-center border hover:shadow-sm hover:shadow-blue-400 hover:text-blue-400 hover:border-blue-400">
                  Edit
                </a>
              </Link>
              <button
                onClick={() => deleteCourse(item.id)}
                className="border hover:shadow-sm hover:shadow-red-400 hover:text-red-400 hover:border-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
