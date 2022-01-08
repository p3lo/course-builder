import { atom } from 'recoil';

export interface Toggle {
  isOpen: boolean;
  title: string;
  url: string;
}

export const modalLessonVideoAtom = atom({
  key: 'modalLessonVideoAtom',
  default: {
    isOpen: false,
    title: '',
    url: '',
  } as Toggle,
});
