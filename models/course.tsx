import mongoose from 'mongoose';
import { CourseType } from '../types';

const newCourse = new mongoose.Schema<CourseType>({
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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
  },
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
delete mongoose.connection.models['Course'];
// export default mongoose.models.course || mongoose.model('Course', newCourse);
const Course = mongoose.models.course || mongoose.model('Course', newCourse);
export default Course;
