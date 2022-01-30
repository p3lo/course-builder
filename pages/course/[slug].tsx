import { GetServerSideProps } from 'next';
import { useState } from 'react';
import VideoPlayer from '../../components/builder/VideoPlayer';
import { supabase } from '../../lib/supabaseClient';
import { FullCourse } from '../../types';

const LearnCourse: React.FC<{ course: FullCourse }> = ({ course }) => {
  const [video, setVideo] = useState({
    url: 'https://kamamoja-test.s3.eu-central-1.wasabisys.com/another/details/sample-30s.mp4',
    title: '',
  });
  return (
    <div className="grid flex-grow grid-cols-4">
      <div className="flex flex-col col-span-3">
        <div className="w-full h-3/4">
          <VideoPlayer videoUrl={video.url} videoTitle={video.title} />
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="px-2 py-2 border border-gray-500 text">{course.title}</h1>
        <div className="min-h-screen overflow-y-scroll border-b border-l border-gray-500"></div>
      </div>
    </div>
  );
};

export default LearnCourse;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/login', permanent: false } };
  }
  // if (user?.app_metadata?.role !== 'admin') {
  //   return { props: {}, redirect: { destination: '/', permanent: false } };
  // }

  const slug = context.params.slug;
  const { data: course } = await supabase
    .from('courses')
    .select(`*, author(*), subcategory(id, main_category(id))`)
    .match({ slug })
    .single();
  if (course.length === 0) {
    return { props: {}, redirect: { destination: '/login', permanent: false } };
  }
  const { data: own_course } = await supabase
    .from('enrolled_courses')
    .select(`*`)
    .eq('person', user.id)
    .eq('course', course.id)
    .single();
  if (!own_course) {
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }
  return {
    props: {
      course: JSON.parse(JSON.stringify(course)),
    },
  };
};
