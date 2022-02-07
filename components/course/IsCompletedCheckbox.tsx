import produce from 'immer';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { supabase } from '../../lib/supabaseClient';
import { enrolledAtom } from '../../recoil/atoms/enrolledAtom';
import { enrolledCourseDetailsAtom } from '../../recoil/atoms/enrolledCourseDetailsAtom';
import { EnrolledCourse } from '../../types';

const IsCompletedCheckbox: React.FC<{ thisLesson: string }> = ({ thisLesson }) => {
  const [enrolledCourse, setEnrolledCourse] = useRecoilState<EnrolledCourse>(enrolledCourseDetailsAtom);
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    setCompleted(enrolledCourse.completed?.includes(thisLesson));
  }, [enrolledCourse.completed]);

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
