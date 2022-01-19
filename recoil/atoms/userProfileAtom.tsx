import { atom } from 'recoil';
import { ProfileType } from '../../types';

export const userProfileAtom = atom({
  key: 'userProfileAtom',
  default: null as ProfileType,
});
