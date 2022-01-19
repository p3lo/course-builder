import produce from 'immer';
import { useCallback } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import { courseBuildAtom } from '../../recoil/atoms/courseBuildAtom';
import { WhatYoullLearn } from '../../types';
var _ = require('lodash');

const WhatYouLearn: React.FC<{ item: WhatYoullLearn }> = ({ item }) => {
  const [courseInfo, setCourseInfo] = useRecoilState(courseBuildAtom);
  const setWhatYouLearn = _.debounce((value: string) => {
    const index = courseInfo.what_youll_learn.findIndex((it) => it.id === item.id);
    const setLearn = produce(courseInfo, (draft) => {
      draft.what_youll_learn[index].title = value;
    });
    setCourseInfo(setLearn);
  }, 1000);

  const delWhatLearn = _.debounce(() => {
    const index = courseInfo.what_youll_learn.findIndex((it) => it.id === item.id);
    const setLearn = produce(courseInfo, (draft) => {
      draft.what_youll_learn.splice(index, 1);
    });
    setCourseInfo(setLearn);
  }, 1000);

  return (
    <div className="flex items-center space-x-2">
      <input
        className="w-full p-2 border border-gray-300 rounded-sm shadow-sm outline-none focus-within:border-blue-600"
        defaultValue={item.title}
        onChange={(e) => {
          setWhatYouLearn(e.target.value);
        }}
      />
      <HiOutlineTrash
        onClick={() => {
          delWhatLearn();
        }}
        className="w-5 h-5 text-gray-200 transition ease-in-out delay-150 cursor-pointer hover:scale-125 hover:text-red-200"
      />
    </div>
  );
};

export default WhatYouLearn;
