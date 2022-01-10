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
        section: 'Introduction',
        lessons: [
          {
            title: 'Lesson 1',
            description: '',
            content_url: '',
          },
        ],
      },
    ],
  } as FullCourse,
});
