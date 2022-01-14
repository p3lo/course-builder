import { atom } from 'recoil';
import { CategoryType } from '../../types';

export const categoriesAtom = atom({
  key: 'categoriesAtom',
  default: [
    {
      id: 0,
      name: '',
      subcategories: [
        {
          id: 0,
          name: '',
        },
      ],
    },
  ] as CategoryType[],
});
