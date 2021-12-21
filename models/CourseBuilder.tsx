import mongoose from 'mongoose';
import { Course } from '../types';

const newCourse = new mongoose.Schema<Course>({
  courseName: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  courseDescription: String,
  isDraft: Boolean,
  author: String,
  sections: [
    {
      sectionTitle: {
        type: String,
        required: true,
      },

      lessons: [
        {
          lessonTitle: {
            type: String,
            required: true,
          },
          lessonDescription: String,
        },
      ],
    },
  ],
});

export default mongoose.models.CourseBuilder || mongoose.model('CourseBuilder', newCourse);
