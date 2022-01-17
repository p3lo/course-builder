import produce from 'immer';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { courseBuildAtom } from '../../recoil/atoms/courseBuildAtom';
import { CategoryType, CategoryIndex, FullCourse } from '../../types';
import CKEditor from './rte/CKEditor';
import Categories from './select/Categories';
import VideoPlayer from './VideoPlayer';
import WasabiUpload from './WasabiUpload';

const CourseDetails: React.FC<{ categories: CategoryType[] }> = ({ categories }) => {
  const [courseInfo, setCourseInfo] = useRecoilState(courseBuildAtom);
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({ catIndex: 0, subcatIndex: 0 });
  const [userDescription, setUserDescription] = useState<string>(courseInfo.description);
  const [briefDescription, setBriefDescription] = useState<string>(courseInfo.brief_description);
  const [editorLoadedDescription, setEditorLoadedDescription] = useState<boolean>(false);

  useEffect(() => {
    const mainCat: number = categories.findIndex((cat) => courseInfo.subcategory.main_category.id === cat.id);
    const subCat: number = categories[mainCat].subcategories.findIndex(
      (subcat) => courseInfo.subcategory.id === subcat.id
    );
    setCategoryIndex({ catIndex: mainCat, subcatIndex: subCat });
  }, []);
  useEffect(() => {
    setEditorLoadedDescription(true);
  }, []);
  useEffect(() => {
    const descriptions = produce(courseInfo, (draft) => {
      draft.description = userDescription;
      draft.brief_description = briefDescription;
    });
    setCourseInfo(descriptions);
  }, [userDescription, briefDescription]);

  return (
    <div className="relative flex flex-col space-y-3 text-sm ">
      <div className="">
        <Categories categories={categories} catIndex={categoryIndex} />
      </div>

      <div className="flex flex-col text-gray-800">
        <label className="mx-3 text-xs text-white">Brief description</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-sm shadow-sm outline-none focus-within:border-blue-600"
          value={briefDescription}
          onChange={(e) => setBriefDescription(e.target.value)}
          placeholder="Brief description"
        />
      </div>

      <div className="flex flex-col text-gray-800">
        <label className="mx-3 text-xs text-white">Description</label>
        <CKEditor
          name="description"
          onChange={(description) => {
            setUserDescription(description);
          }}
          // value={description}
          toolbar="details"
          value={userDescription}
          editorLoaded={editorLoadedDescription}
        />
      </div>
      <div className="flex flex-col">
        <label className="mx-3 text-xs">Preview image</label>
        <div className="grid items-center justify-center grid-cols-1 border sm:grid-cols-2">
          <WasabiUpload type={['image/*']} uppyId="details_image" path={`${courseInfo.slug}/details/`} />
          <div className="flex items-center justify-center my-2">
            {courseInfo.image && (
              <Image src={courseInfo.image} alt="details" width={200} height={200} objectFit="scale-down" />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mx-3 text-xs">Preview video</label>
        <div className="grid items-center justify-center grid-cols-1 border sm:grid-cols-2">
          <WasabiUpload type={['video/*']} uppyId="details_video" path={`${courseInfo.slug}/details/`} />
          <div className="flex items-center justify-center my-2">
            {courseInfo.preview && (
              <div className="h-[250px] w-[450px]">
                <VideoPlayer videoUrl={courseInfo.preview} videoTitle={courseInfo.title} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
