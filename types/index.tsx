export interface Toggle {
  isOpen: boolean;
}

export interface Author {
  id?: string;
  username?: string;
  avatar_url?: string;
  website?: string;
  role?: string;
}

export interface CategoryIndex {
  catIndex: number;
  subcatIndex: number;
}

export interface Category {
  id?: number;
  created_at?: Date;
  name: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id?: number;
  created_at?: Date;
  name: string;
  main_category?: Category;
}

export interface Lesson {
  title: string;
  description?: string;
}

export interface Section {
  section: string;
  lessons?: Lesson[];
}

export interface CourseName {
  id?: number;
  title: string;
  slug: string;
  author: Author;
}

export interface FullCourse extends CourseName {
  created_at?: Date;
  description: string;
  isDraft?: boolean;
  subcategory: Subcategory;
  image?: string;
  preview?: string;
  content: Section[];
}
