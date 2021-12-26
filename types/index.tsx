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

export interface CourseType extends CourseName {
  _id?: ObjectId;
  courseDescription: string;
  isDraft?: boolean;
  author?: string | ObjectId;
  sections: Section[];
}
