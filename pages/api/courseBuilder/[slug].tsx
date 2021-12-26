import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import course from '../../../models/course';
import { CourseType } from '../../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { slug } = req.query;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const courses: CourseType = await course
          .findOne({ slug })
          .select('-_id -__v -sections._id -sections.lessons._id')
          .exec();
        res.status(201).json({ success: true, courses });
      } catch (err) {
        res.status(400).json({ success: false, err });
      }
      break;
    case 'PUT':
      try {
        console.log(slug, req.body.courseInfo);
        const courses: CourseType = await course.findOneAndReplace({ slug }, req.body.courseInfo);
        res.status(200).json({ success: true, data: courses });
      } catch (err) {
        res.status(400).json({ success: false, err });
      }
      break;
    case 'DELETE':
      try {
        await course.deleteOne({ slug });
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
