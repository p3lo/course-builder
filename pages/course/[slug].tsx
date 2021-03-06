import produce from 'immer';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import CourseList from '../../components/course/CourseList';
import Details from '../../components/course/Details';
import VideoPlayer from '../../components/course/VideoPlayer';
import { supabase } from '../../lib/supabaseClient';
import { courseDetailsAtom } from '../../recoil/atoms/courseDetailsAtom';
import { enrolledCourseQAAtom } from '../../recoil/atoms/enrolledCourseQAAtom';
import { CommentsQuestions, CourseDetails, EnrolledCourse, FullCourse, ToggleWithVideo } from '../../types';

const LearnCourse: React.FC<{ course: FullCourse; own_course: EnrolledCourse }> = ({ course, own_course }) => {
  const [video, setVideo] = useRecoilState<CourseDetails>(courseDetailsAtom);
  const resetList = useResetRecoilState(courseDetailsAtom);
  const setQAState = useSetRecoilState<CommentsQuestions[]>(enrolledCourseQAAtom);

  useEffect(() => {
    resetList();
    const vid = produce(video, (draft) => {
      draft.url = course.content[0].lessons[0].content_url;
      draft.title = course.content[0].lessons[0].title;
      draft.lessonId = course.content[0].lessons[0].id;
      draft.sectionId = course.content[0].id;
    });
    setVideo(vid);
    setQAState(course.comments_questions);
  }, []);

  return (
    <div className="grid flex-grow grid-cols-4">
      <div className="flex flex-col col-span-3 space-y-5">
        <div className="w-full ">
          <VideoPlayer videoUrl={video.url} videoTitle={video.title} course_content={course.content} />
        </div>
        <div>
          <Details course={course} />
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="px-2 py-2 text-gray-300 border border-gray-500">{course.title}</h1>
        <div className="h-full overflow-y-scroll border-b border-l border-gray-500 scrollbar-hide">
          <CourseList course_content={course.content} own_course={own_course} />
        </div>
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
    .select(
      `*, author(*), subcategory(id, main_category(id)), comments_questions!inner(id, created_at, question, author(username, avatar_url), comments_answers!inner(id, created_at, answer, author(username, avatar_url)))`
    )
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
      own_course: JSON.parse(JSON.stringify(own_course)),
    },
  };
};
