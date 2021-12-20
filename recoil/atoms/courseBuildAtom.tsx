import { atom } from 'recoil';

export interface Lesson {
  lessonTitle: string;
  lessonDescription?: string;
}

export interface Section {
  sectionTitle: string;
  lessons: Lesson[];
}

export interface Course {
  courseName: string;
  courseDescription: string;
  isDraft?: boolean;
  author?: string;
  sections: Section[];
}

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
