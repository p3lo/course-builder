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
import { cartAtom } from '../../recoil/atoms/cartAtom';
import { useRouter } from 'next/router';
import { enrolledAtom } from '../../recoil/atoms/enrolledAtom';
import { arrContains } from '../../lib/helpers';

const RightPanel: React.FC<{ course: FullCourse }> = ({ course }) => {
  const [cart, setCart] = useRecoilState<FullCourse[]>(cartAtom);
  const [videoModal, setVideoModal] = useRecoilState<ToggleWithVideo>(modalLessonVideoAtom);
  const [enrolled, setEnrolled] = useRecoilState<any[]>(enrolledAtom);
  const router = useRouter();
  function openModal() {
    const close = produce(videoModal, (draft) => {
      draft.isOpen = true;
      draft.url = course.preview;
      draft.title = course.title;
    });
    setVideoModal(close);
  }
  const findNestedSum = (content) => {
    let sum = 0;
    for (let len = 0; len < content.length; len++) {
      sum += content[len].lessons.length;
    }
    return sum;
  };
  const addToCart = () => {
    if (!cart.some((incart) => incart.id === course.id)) {
      const removeContent = produce(course, (draft) => {
        draft.content = [];
      });
      setCart((prev) => [...prev, removeContent]);
    }
  };
  return (
    <div className="w-[340px] shadow-md bg-gray-600 sticky top-[80px] ">
      <div
        className="relative border border-gray-600 bg-gradient-to-t from-gray-900 cursor-pointer to-white w-[340px] h-[170px]"
        onClick={openModal}
      >
        <Image src={course.image} alt="Course image" layout="fill" className="opacity-50" objectFit="cover" />
        <AiOutlinePlayCircle className="absolute justify-center w-12 h-12 top-[60px] left-[150px]  text-gray-600 rounded-full bg-gray-300" />
        <label className="absolute font-bold text-gray-300 bottom-2 left-[110px] cursor-pointer">Course preview</label>
      </div>
      <div className="px-5 pt-5 space-y-3 text-gray-100">
        <div className="flex space-x-2">
          <h1 className="text-3xl font-bold">
            {course.price === 0
              ? `Free`
              : course.discount_price === 0
              ? `$${course.price}`
              : `$${course.discount_price}`}
          </h1>
          {course.discount_price !== 0 && <h1 className="line-through ">${course.price}</h1>}
        </div>
        {arrContains(enrolled, course.id) ? (
          <div className="flex flex-col">
            <Link href={`/course/${course.slug}`}>
              <a className="justify-center w-full py-3 font-bold text-center text-gray-700 bg-blue-300 border">
                Go to course
              </a>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col">
            <button
              onClick={() => addToCart()}
              className="justify-center w-full py-3 font-bold text-center text-gray-700 bg-blue-300 border"
            >
              Add to cart
            </button>
            <button
              onClick={() => {
                addToCart();
                router.push('/user/cart');
              }}
              className="justify-center w-full py-3 my-3 font-bold text-center border"
            >
              Buy now
            </button>
          </div>
        )}
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
            <p className="text-sm"> {findNestedSum(course.content)} coding exercises</p>
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
