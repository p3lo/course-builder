import { FullCourse } from '../../types';
import { HiOutlinePencilAlt, HiOutlineGlobeAlt, HiOutlineAnnotation } from 'react-icons/hi';

const CourseHeader: React.FC<{ course: FullCourse }> = ({ course }) => {
  console.log(course);
  return (
    <div className="space-y-2 ">
      <div>
        <p className="text-sm font-bold text-blue-300">
          {course.subcategory.main_category.name} {'>'} {course.subcategory.name}
        </p>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white">{course.title}</h1>
      </div>
      <div>
        <h1 className="text-xl text-white">{course.brief_description}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm text-blue-300">(388,795 ratings)</p>
        <p className="text-sm text-white">1,398,738 students</p>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm text-white">Created by</p>
        <p className="text-sm text-white">{course.author.username}</p>
      </div>
      <div className="flex items-center space-x-5 text-white">
        <div className="flex items-center space-x-1">
          <HiOutlinePencilAlt className="w-4 h-4" />
          <p className="text-sm text-white">
            Last updated{' '}
            {new Date(course.updated_at).getMonth() + 1 + '/' + (new Date(course.updated_at).getFullYear() + 1)}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <HiOutlineGlobeAlt className="w-4 h-4" />
          <p className="text-sm text-white">{course.language}</p>
        </div>
        <div className="flex items-center space-x-2">
          <HiOutlineAnnotation className="w-4 h-4" />
          <p className="text-sm text-white">{course.language}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
