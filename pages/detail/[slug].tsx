import { supabase } from '../../lib/supabaseClient';
import { GetServerSideProps } from 'next';
import { FullCourse, ProfileType } from '../../types';
import CourseHeader from '../../components/detail/CourseHeader';
import WhatYoullLearn from '../../components/detail/WhatYoullLearn';
import RightPanel from '../../components/detail/RightPanel';
import VideoPreviewModal from '../../components/builder/VideoPreviewModal';
import Description from '../../components/detail/Description';
import Instructor from '../../components/detail/Instructor';
import CourseContent from '../../components/detail/CourseContent';

const CourseDetail: React.FC<{ course: FullCourse }> = ({ course }) => {
  return (
    <div className="w-full ">
      <div className="grid grid-cols-3 gap-x-5">
        <div className="col-span-2">
          <div className="px-20 py-5 bg-gray-800 ">
            <CourseHeader course={course} />
          </div>
          <div className="px-20 py-5 space-y-5">
            <WhatYoullLearn course={course} />
            <CourseContent course_content={course.content} />
            {/* <Requirements /> */}
            <Description course={course} />
            <Instructor profile={course.author} />
          </div>
        </div>
        <div>
          <RightPanel course={course} />
        </div>
        {/* Feedback */}
        {/* Reviews */}
      </div>
      <VideoPreviewModal />
    </div>
  );
};

export default CourseDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params.slug;
  const { data: course } = await supabase
    .from('courses')
    .select(`*, author(*), subcategory(name, main_category(name))`)
    .match({ slug });
  if (!course) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/login', permanent: false } };
  }
  return {
    props: {
      course: JSON.parse(JSON.stringify(course[0])),
    },
  };
};
