import { atom } from 'recoil';
import { FullCourse } from '../../types';

export const courseBuildAtom = atom({
  key: 'courseBuildAtom',
  default: {
    title: 'First one',
    slug: '',
    description: '',
    isDraft: false,
    author: { username: 'Danko' },
    subcategory: {
      id: 2,
    },
    content: [
      {
        section: 'Introduction',
        lessons: [
          {
            title: 'Lesson 1',
            description: '',
          },
        ],
      },
    ],
  } as FullCourse,
});
