import { atom } from 'recoil';
import { Course } from '../../types';

export const courseBuildAtom = atom({
  key: 'courseBuildAtom',
  default: {
    courseName: 'First one',
    slug: '',
    courseDescription: '',
    isDraft: false,
    author: 'Danko',
    sections: [
      {
        sectionTitle: 'Introduction',
        lessons: [
          {
            lessonTitle: 'Lesson 1',
            lessonDescription: '',
          },
        ],
      },
    ],
  } as Course,
});
