import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { Category, CategoryIndex, FullCourse } from '../types';
import RichTextEditor from './rte/RichTextEditor';
import Categories from './select/Categories';
import WasabiUpload from './WasabiUpload';

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
    <div className="relative flex flex-col space-y-3 text-sm">
      <div className="">
        <Categories categories={categories} catIndex={categoryIndex} />
      </div>
      <div className="flex flex-col">
        <label className="mx-3 text-xs">Description</label>
        <RichTextEditor />
      </div>
      <div className="flex flex-col">
        <label className="mx-3 text-xs">Preview Image</label>
        <div className="grid items-center justify-center grid-cols-2 border">
          <WasabiUpload type={['video/*', 'image/*']} uppyId="details_image" path={`${courseInfo.slug}/details/`} />

          {courseInfo.image && (
            <Image src={courseInfo.image} alt="details" width={200} height={200} objectFit="scale-down" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
