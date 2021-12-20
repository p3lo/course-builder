import { atom } from 'recoil';
import { Course } from '../../types';

export const courseBuildAtom = atom({
  key: 'courseBuildAtom',
  default: {
    courseName: 'First one',
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
      {
        sectionTitle: 'Intro 2',
        lessons: [
          {
            lessonTitle: 'Lesson 2',
            lessonDescription: '',
          },
        ],
      },
    ],
  } as Course,
});
