import { atom } from 'recoil';
import { CommentsQuestions } from '../../types';

export const enrolledCourseQAAtom = atom({
  key: 'enrolledCourseQAAtom',
  default: [] as CommentsQuestions[],
});
