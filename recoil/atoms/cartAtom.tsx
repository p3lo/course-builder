import { atom } from 'recoil';
import { FullCourse } from '../../types';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const cartAtom = atom({
  key: 'cartAtom',
  default: [] as FullCourse[],
  effects_UNSTABLE: [persistAtom],
});
