import { atom } from 'recoil';

export interface toggleNextVideoAtom {
  toggle: boolean;
}

export const toggleNextVideoAtom = atom({
  key: 'toggleNextVideoAtom',
  default: {
    toggle: false,
  } as toggleNextVideoAtom,
});
