import { atom } from 'recoil';

export interface Toggle {
  isOpen: boolean;
}

export const modalCourseNameAtom = atom({
  key: 'modalCourseNameAtom',
  default: {
    isOpen: false,
  } as Toggle,
});
