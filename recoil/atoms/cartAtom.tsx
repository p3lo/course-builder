import { atom } from 'recoil';
import { FullCourse } from '../../types';

export const cartAtom = atom({
  key: 'cartAtom',
  default: [] as FullCourse[],
});
