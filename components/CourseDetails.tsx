import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { Category, CategoryIndex, FullCourse } from '../types';
import RichTextEditor from './rte/RichTextEditor';
import Categories from './select/Categories';

const CourseDetails: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const courseInfo = useRecoilValue<FullCourse>(courseBuildAtom);
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({ catIndex: 0, subcatIndex: 0 });

  useEffect(() => {
    const mainCat: number = categories.findIndex((cat) => courseInfo.subcategory.main_category.id === cat.id);
    const subCat: number = categories[mainCat].subcategories.findIndex(
      (subcat) => courseInfo.subcategory.id === subcat.id
    );
    setCategoryIndex({ catIndex: mainCat, subcatIndex: subCat });
  }, []);

  return (
    <div className="flex flex-col m-5 space-y-3 text-sm">
      <div className="">
        <Categories categories={categories} catIndex={categoryIndex} />
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
