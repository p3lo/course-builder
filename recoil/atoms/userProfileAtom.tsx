import { atom } from 'recoil';
import { ProfileType } from '../../types';

export const userProfileAtom = atom({
  key: 'userProfileAtom',
  default: {
    id: '',
    username: '',
    avatar_url: '',
    website: '',
    role: '',
    headline: '',
    description: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
  } as ProfileType,
});
