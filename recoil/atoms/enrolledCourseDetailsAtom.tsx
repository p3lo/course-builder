import { atom } from 'recoil';
import { EnrolledCourse } from '../../types';

export const enrolledCourseDetailsAtom = atom({
  key: 'enrolledCourseDetailsAtom',
  default: [] as EnrolledCourse,
});
