export interface Toggle {
  isOpen: boolean;
}

export interface ToggleWithVideo extends Toggle {
  url?: string;
  title?: string;
}

export interface Author {
  id?: string;
  username?: string;
  avatar_url?: string;
  email?: string;
  website?: string;
  role?: string;
  headline?: string;
  description?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
}

export interface ProfileType extends Author {}

export interface CategoryIndex {
  catIndex: number;
  subcatIndex: number;
}

export interface CategoryType {
  id?: number;
  created_at?: Date;
  name: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id?: number;
  created_at?: Date;
  name: string;
  main_category?: CategoryType;
}

export interface Lesson {
  id?: string;
  title: string;
  description?: string;
  content_url?: string;
  video_duration?: number;
  is_preview?: boolean;
}

export interface Section {
  id?: string;
  section: string;
  lessons?: Lesson[];
}

export interface WhatYoullLearn {
  id?: string;
  title?: string;
}

export interface CourseName {
  id?: number;
  title: string;
  slug: string;
  author: Author;
}

export interface FullCourse extends CourseName {
  created_at?: Date;
  language?: string;
  description: string;
  brief_description?: string;
  what_youll_learn?: WhatYoullLearn[];
  isDraft?: boolean;
  subcategory: Subcategory;
  image?: string;
  preview?: string;
  price?: number;
  discount_price?: number;
  updated_at?: Date;
  content?: Section[];
  comments_questions?: CommentsQuestions[];
}

export interface CommentsQuestions {
  id?: number;
  created_at?: string;
  question?: string;
  author?: Author;
  comments_answers?: CommentsAnswers[];
}

export interface CommentsAnswers {
  id?: number;
  created_at?: string;
  answer?: string;
  author?: Author;
}

export interface EnrolledCourse {
  id?: number;
  person?: ProfileType;
  course?: FullCourse;

  completed?: string[];
}

export interface CourseDetails {
  sectionId?: string;
  lessonId?: string;
  title: string;
  url: string;
  completed_lesson?: string;
  completed?: CompletedParts[];
}

export interface CompletedParts {
  sectionId: string;
  lessonId: string;
}
