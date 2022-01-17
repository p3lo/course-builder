import { FullCourse, ToggleWithVideo } from '../../types';
import Image from 'next/image';
import Link from 'next/link';
import {
  HiOutlineVideoCamera,
  HiOutlineNewspaper,
  HiOutlineCode,
  HiOutlineRefresh,
  HiOutlineClipboardList,
} from 'react-icons/hi';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { modalLessonVideoAtom } from '../../recoil/atoms/modalsAtom';
import produce from 'immer';

const RightPanel: React.FC<{ course: FullCourse }> = ({ course }) => {
  const [videoModal, setVideoModal] = useRecoilState<ToggleWithVideo>(modalLessonVideoAtom);
  function openModal() {
    const close = produce(videoModal, (draft) => {
      draft.isOpen = true;
      draft.url = course.preview;
      draft.title = course.title;
    });
    setVideoModal(close);
  }
  return (
    <div className="w-[340px] shadow-md bg-gray-600 sticky top-5 ">
      <div
        className="relative border border-gray-600 bg-gradient-to-t from-gray-900 cursor-pointer to-white w-[340px] h-[170px]"
        onClick={openModal}
      >
        <Image src={course.image} alt="Course image" layout="fill" className="opacity-50" objectFit="contain" />
        <AiOutlinePlayCircle className="absolute justify-center w-12 h-12 top-[60px] left-[150px]  text-gray-600 rounded-full bg-gray-300" />
        <label className="absolute font-bold text-gray-300 bottom-2 left-[110px] cursor-pointer">Course preview</label>
      </div>
      <div className="px-5 pt-5 space-y-3 text-gray-100">
        <h1 className="text-3xl font-bold">$89.99</h1>
        <div className="flex flex-col">
          <Link href="#">
            <a className="justify-center w-full py-3 font-bold text-center text-gray-700 bg-blue-300 border">
              Add to cart
            </a>
          </Link>
          <Link href="#">
            <a className="justify-center w-full py-3 my-3 font-bold text-center border">Buy now</a>
          </Link>
        </div>
        <h1 className="pb-1 font-bold text-md">This course includes:</h1>
        <div className="pb-3 space-y-1 text-gray-300">
          <div className="flex space-x-3">
            <HiOutlineVideoCamera className="w-5 h-5" />
            <p className="text-sm"> 22 hours on-demand video</p>
          </div>
          <div className="flex space-x-3">
            <HiOutlineNewspaper className="w-5 h-5" />
            <p className="text-sm"> 14 articles</p>
          </div>
          <div className="flex space-x-3">
            <HiOutlineCode className="w-5 h-5" />
            <p className="text-sm"> 19 coding exercises</p>
          </div>
          <div className="flex space-x-3">
            <HiOutlineRefresh className="w-5 h-5" />
            <p className="text-sm"> Full lifetime access</p>
          </div>
          <div className="flex space-x-3">
            <HiOutlineClipboardList className="w-5 h-5" />
            <p className="text-sm"> Certificate of completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
