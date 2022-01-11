import Link from 'next/link';
import { FullCourse } from '../../types';
import CourseCard from '../CourseCard';

const MyCourses: React.FC<{ courses: FullCourse[] }> = ({ courses }) => {
  return (
    <div className="flex p-5 space-x-5">
      {courses.map((item) => (
        <div className="relative" key={item.id}>
          <CourseCard course={item} />
          <div className="grid grid-cols-2 text-sm">
            <Link href={`/builder/${item.slug}`}>
              <a className="text-center border hover:shadow-md">Edit</a>
            </Link>
            <button className="border hover:shadow-md">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
