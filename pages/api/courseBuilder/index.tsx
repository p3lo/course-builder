import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../../../lib/dbConnect';
import course from '../../../models/course';
import user from '../../../models/user';
import { CourseType } from '../../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
  //   return res.status(401).send('You are not authorized to call this API');
  // }
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { user: usr } = await getSession({ req });
        const uid = await user.findOne({ email: usr.email }).select('_id');
        req.body.courseInfo.author = uid._id;

        const courses: CourseType = await course.create(req.body.courseInfo);
        await user.updateOne(
          {
            _id: uid._id,
          },
          {
            $push: {
              createdCourses: courses._id,
            },
          }
        );
        res.status(200).json({ success: true, data: courses });
      } catch (err) {
        res.status(400).json({ success: false, err });
      }
      break;
    case 'GET':
      try {
        const courses: CourseType[] = await course.find().select('_id courseName');
        res.status(201).json({ success: true, data: courses });
      } catch (err) {
        res.status(400).json({ success: false, err });
      }
      break;
    case 'DELETE':
      try {
        await course.deleteOne();
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
