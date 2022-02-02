import { atom } from 'recoil';

export interface ToggleTime {
  isOpen: boolean;
}

export const toggleTimeAtom = atom({
  key: 'toggleTimeAtom',
  default: {
    isOpen: false,
  } as ToggleTime,
});
