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
        sectionTitle: '',
        lessons: [
          {
            lessonTitle: '',
            lessonDescription: '',
          },
        ],
      },
    ],
  },
});
