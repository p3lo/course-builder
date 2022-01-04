import { useEffect, useState } from 'react';
import { Category } from '../types';
import RichTextEditor from './rte/RichTextEditor';
import Categories from './select/Categories';

const CourseDetails: React.FC<{ categories: Category[] }> = ({ categories }) => {
  return (
    <div className="flex flex-col m-5 space-y-3 text-sm">
      <div className="">
        <Categories categories={categories} />
      </div>
      <div className="flex flex-col">
        <label className="mx-3 text-xs">Description</label>
        <input type="text" className="p-2 border outline-none"></input>
      </div>
      <div className="flex flex-col">
        <label className="mx-3 text-xs">Description</label>
        <RichTextEditor />
      </div>
    </div>
  );
};

export default CourseDetails;
