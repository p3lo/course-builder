export interface Toggle {
  isOpen: boolean;
}

export interface Author {
  id?: number;
  username?: string;
  avatar_url?: string;
  website?: string;
  role?: string;
}

export interface Category {
  id?: number;
  created_at?: Date;
  name: string;
}

export interface Subcategory {
  id?: number;
  created_at?: Date;
  name: string;
  main_category: Category;
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
  content: Section[];
}
