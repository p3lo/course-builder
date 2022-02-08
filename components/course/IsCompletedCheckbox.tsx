import produce from 'immer';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { supabase } from '../../lib/supabaseClient';
import { courseDetailsAtom } from '../../recoil/atoms/courseDetailsAtom';
import { enrolledAtom } from '../../recoil/atoms/enrolledAtom';
import { enrolledCourseDetailsAtom } from '../../recoil/atoms/enrolledCourseDetailsAtom';
import { CourseDetails, EnrolledCourse } from '../../types';

const IsCompletedCheckbox: React.FC<{ thisLesson: string }> = ({ thisLesson }) => {
  const [enrolledCourse, setEnrolledCourse] = useRecoilState<EnrolledCourse>(enrolledCourseDetailsAtom);
  const [completed, setCompleted] = useState<boolean>(false);
  const [video, setVideo] = useRecoilState<CourseDetails>(courseDetailsAtom);

  useEffect(() => {
    setCompleted(enrolledCourse.completed?.includes(thisLesson));
  }, [enrolledCourse.completed]);

  useEffect(() => {
    if (!enrolledCourse.completed?.includes(video.completed_lesson) && video.completed_lesson !== '') {
      let prepare_data: string[] = [...enrolledCourse.completed];
      prepare_data.push(video.completed_lesson);
      supabase
        .from('enrolled_courses')
        .update({ completed: prepare_data })
        .eq('id', enrolledCourse.id)
        .then(() => {
          const update_completed = produce(enrolledCourse, (draft) => {
            draft.completed.push(video.completed_lesson);
          });
          setEnrolledCourse(update_completed);
        });

      console.log(video.completed_lesson, enrolledCourse.completed, prepare_data);
    }
  }, [video.completed_lesson]);

  const lessonCompletition = () => {
    let prepare_data: string[] = [...enrolledCourse.completed];
    completed
      ? (prepare_data = enrolledCourse.completed.filter((item) => item !== thisLesson))
      : prepare_data.push(thisLesson);
    supabase
      .from('enrolled_courses')
      .update({ completed: prepare_data })
      .eq('id', enrolledCourse.id)
      .then(() => {
        const update_completed = produce(enrolledCourse, (draft) => {
          draft.completed = prepare_data;
        });
        setEnrolledCourse(update_completed);
      });
  };
  return (
    <input
      type="checkbox"
      checked={completed}
      onChange={lessonCompletition}
      className="checkbox checkbox-accent h-4 w-4"
    />
  );
};

export default IsCompletedCheckbox;
