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
    <div className="flex flex-col items-center w-full px-5 py-4 space-x-10 sm:py-0 sm:flex-row">
      <div className="flex flex-col py-10 space-y-1">
        <label className="text-xs ">{enabled ? 'Free course' : 'Course price'}</label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? 'bg-gray-500' : 'bg-gray-300'}
          relative  inline-flex flex-shrink-0 h-[28px] w-[52px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-gray-700 shadow-lg transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
      </div>
      {!enabled && (
        <div className="flex flex-col space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0 ">
          <div className="flex flex-col">
            <label className="pl-2 text-xs ">Price</label>
            <input
              className="px-3 py-2 text-gray-700 border outline-none"
              type="text"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              defaultValue={price}
              onChange={(e) => setPrice(+e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="pl-2 text-xs ">Discounted price</label>
            <input
              className="px-3 py-2 text-gray-700 border outline-none"
              type="text"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              defaultValue={discountPrice}
              onChange={(e) => setDiscountPrice(+e.target.value)}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
}
