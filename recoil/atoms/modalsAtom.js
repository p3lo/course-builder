import { atom } from 'recoil';

export const modalCourseNameAtom = atom({
  key: 'modalCourseNameAtom',
  default: {
    isOpen: false,
  },
});
