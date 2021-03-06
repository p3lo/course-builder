import { atom } from 'recoil';
import { FullCourse } from '../../types';

export const courseBuildAtom = atom({
  key: 'courseBuildAtom',
  default: {
    title: '',
    slug: '',
    description: '<p></p>',
    isDraft: false,
    author: { id: '' },
    what_youll_learn: [],
    image: '',
    preview: '',
    price: 0,
    discount_price: 0,
    subcategory: {
      id: 2,
      main_category: { id: 2 },
    },
    content: [
      {
        id: 'this-is-first-section',
        section: 'Introduction',
        lessons: [],
      },
    ],
  } as FullCourse,
});
