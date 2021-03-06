import Image from 'next/image';
import { FullCourse } from '../types';
import { AiOutlineEye } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CourseCard: React.FC<{ course: FullCourse }> = ({ course }) => {
  const router = useRouter();
  return (
    <Link href={`/detail/${course.slug}`}>
      <a>
        <div className="relative space-y-1 h-[320px] w-[240px] cursor-pointer hover:shadow-md hover:shadow-gray-800 group">
          <div className="h-40 overflow-hidden border border-gray-500 w-60 group-hover:opacity-50">
            <Image
              src={
                course.image
                  ? course.image
                  : 'https://kamamoja-test.s3.eu-central-1.wasabisys.com/another/details/53b6a04a-0cc0-46cf-adc4-7bddb4eb832c.png'
              }
              alt={course.title}
              width={240}
              height={160}
              objectFit="cover"
            />
          </div>
          <div className="px-1 space-y-1">
            <h2 className="font-bold break-normal text-md line-clamp-2">{course.title}</h2>
            <h3 className="text-xs text-gray-400">{course.author.username}</h3>
            <div className="flex items-center gap-1 text-gray-400">
              <AiOutlineEye className="w-3 h-3" />
              <h3 className="text-xs">(0)</h3>
            </div>
            <div className="flex gap-2">
              {course.price === 0 ? (
                <h2 className="text-lg font-bold">Free</h2>
              ) : course.discount_price !== 0 ? (
                <>
                  <h2 className="text-lg font-bold">${course.discount_price}</h2>
                  <h3 className="text-xs text-gray-400 line-through">${course.price}</h3>
                </>
              ) : (
                <h3 className="text-lg font-bold">${course.price}</h3>
              )}
            </div>
            <h2 className="absolute p-1 text-xs font-bold text-red-800 bg-red-200 bottom-2">Bestseller</h2>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CourseCard;
