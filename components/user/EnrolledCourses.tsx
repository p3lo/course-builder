import { EnrolledCourse } from '../../types';
import CourseCard from '../CourseCard';

const EnrolledCourses: React.FC<{ courses: EnrolledCourse[] }> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 xl:grid-cols-4">
      {courses.map((item) => (
        <div className="relative space-y-1 w-60" key={item.id}>
          <CourseCard course={item.course} />
        </div>
      ))}
    </div>
  );
};

export default EnrolledCourses;
