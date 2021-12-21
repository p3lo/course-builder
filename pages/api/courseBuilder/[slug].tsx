import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import CourseBuilder from '../../../models/CourseBuilder';
import { Course } from '../../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { slug } = req.query;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const course: Course = await CourseBuilder.findOne({ slug })
          .select('-_id -__v -sections._id -sections.lessons._id')
          .exec();
        res.status(201).json({ success: true, course });
      } catch (err) {
        res.status(400).json({ success: false, err });
      }
      break;
    case 'DELETE':
      try {
        await CourseBuilder.deleteOne({ slug });
        res.status(200).json({ success: true });
      } catch (err) {
        res.status(400).json({ success: false, err });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
