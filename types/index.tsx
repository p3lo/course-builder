import { ObjectId } from 'mongoose';

export interface Toggle {
  isOpen: boolean;
}

export interface Lesson {
  lessonTitle: string;
  lessonDescription?: string;
}

export interface Section {
  sectionTitle: string;
  lessons: Lesson[];
}

export interface CourseName {
  courseName: string;
  slug: string;
}

export interface Course extends CourseName {
  courseDescription: string;
  isDraft?: boolean;
  author?: string;
  sections: Section[];
}
