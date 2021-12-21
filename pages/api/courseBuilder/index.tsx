import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import CourseBuilder from '../../../models/CourseBuilder';
import { Course } from '../../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
  //   return res.status(401).send('You are not authorized to call this API');
  // }
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        console.log(req.body.courseInfo);
        const course: Course = await CourseBuilder.create(req.body.courseInfo);

        res.status(200).json({ success: true, data: course });
      } catch (err) {
        res.status(400).json({ success: false, err });
      }
      break;
    case 'GET':
      try {
        const courses: Course[] = await CourseBuilder.find().select('_id courseName');
        res.status(201).json({ success: true, data: courses });
      } catch (err) {
        res.status(400).json({ success: false, err });
      }
      break;
    case 'DELETE':
      try {
        await CourseBuilder.deleteOne();
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
