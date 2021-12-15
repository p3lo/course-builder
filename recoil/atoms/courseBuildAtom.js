import { atom } from 'recoil';

export const courseBuildAtom = atom({
  key: 'courseBuildAtom',
  default: {
    courseName: '',
    courseDescription: '',
    isDraft: false,
    author: '',
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
        sectionTitle: 'Section 1',
        lessons: [
          {
            lessonTitle: 'Lesson 2',
            lessonDescription: '',
          },
        ],
      },
    ],
  },
});
