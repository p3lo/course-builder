import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import { FullCourse } from '../../types';
import { courseBuildAtom } from '../../recoil/atoms/courseBuildAtom';
import produce from 'immer';

export default function PriceTab() {
  const [courseInfo, setCourseInfo] = useRecoilState<FullCourse>(courseBuildAtom);
  const [enabled, setEnabled] = useState<boolean>(() => (courseInfo.price === 0 ? true : false));
  const [price, setPrice] = useState(courseInfo.price);
  const [discountPrice, setDiscountPrice] = useState(courseInfo.discount_price);

  useEffect(() => {
    if (enabled) {
      const coursePrice = produce(courseInfo, (draft) => {
        draft.price = 0;
        draft.discount_price = 0;
      });
      setCourseInfo(coursePrice);
    } else {
      const coursePrice = produce(courseInfo, (draft) => {
        draft.price = price;
        draft.discount_price = discountPrice;
      });
      setCourseInfo(coursePrice);
    }
  }, [price, discountPrice]);

  return (
    <div className="px-5 py-4 sm:py-0 flex flex-col sm:flex-row w-full items-center space-x-10">
      <div className="py-10 flex flex-col space-y-1">
        <label className=" text-xs">{enabled ? 'Free course' : 'Course price'}</label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
          relative  inline-flex flex-shrink-0 h-[28px] w-[52px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
      </div>
      {!enabled && (
        <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-5 sm:space-y-0 ">
          <div className="flex flex-col">
            <label className=" text-xs pl-2">Price</label>
            <input
              className="px-3 py-2 outline-none border"
              type="number"
              defaultValue={price}
              onChange={(e) => setPrice(+e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label className=" text-xs pl-2">Discounted price</label>
            <input
              className="px-3 py-2 outline-none border"
              type="number"
              defaultValue={discountPrice}
              onChange={(e) => setDiscountPrice(+e.target.value)}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
}
