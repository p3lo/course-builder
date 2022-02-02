import { atom } from 'recoil';
import { CourseDetails } from '../../types';

export const courseDetailsAtom = atom({
  key: 'courseDetailsAtom',
  default: {
    sectionId: '',
    lessonId: '',
    title: '',
    url: '',
  } as CourseDetails,
});
