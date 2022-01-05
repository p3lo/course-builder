import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiCheck, HiSelector } from 'react-icons/hi';
import { Category, CategoryIndex, FullCourse } from '../../types';
import produce from 'immer';
import { useRecoilState } from 'recoil';
import { courseBuildAtom } from '../../recoil/atoms/courseBuildAtom';

const Categories: React.FC<{ categories: Category[]; catIndex: CategoryIndex }> = ({ categories, catIndex }) => {
  const [selectedMain, setSelectedMain] = useState<Category>(categories[0]);
  const [selectedSub, setSelectedSub] = useState<Category>(categories[0].subcategories[0]);
  const [index, setIndex] = useState<CategoryIndex>(catIndex);
  const [courseInfo, setCourseInfo] = useRecoilState<FullCourse>(courseBuildAtom);

  useEffect(() => {
    setSelectedMain(categories[catIndex.catIndex]);
    setSelectedSub(categories[catIndex.catIndex].subcategories[catIndex.subcatIndex]);
  }, [catIndex]);

  useEffect(() => {
    const maincat: number = categories.findIndex((item) => item.id === selectedMain.id);
    let subcats: number = categories[maincat].subcategories.findIndex((item) => item.id === selectedSub.id);
    if (subcats === -1) {
      subcats = 0;
    }
    const ind = produce(index, (draft) => {
      draft.subcatIndex = subcats;
      draft.catIndex = maincat;
    });
    setIndex(ind);
    setSelectedMain(categories[maincat]);
    setSelectedSub(categories[maincat].subcategories[subcats]);
  }, [selectedMain, selectedSub]);

  useEffect(() => {
    const subCatId = produce(courseInfo, (draft) => {
      draft.subcategory.main_category.id = selectedMain.id;
      draft.subcategory.id = selectedSub.id;
    });
    setCourseInfo(subCatId);
  }, [index]);

  return (
    <div className="flex space-x-5">
      <div className="flex flex-col">
        <label className="mx-3 text-xs">Category</label>
        <div className="w-72">
          <Listbox value={selectedMain} onChange={setSelectedMain}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                <span className="block truncate">{selectedMain?.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <HiSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {categories.map((category) => (
                    <Listbox.Option
                      key={category.name}
                      className={({ active }) =>
                        `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4 outline-none`
                      }
                      value={category}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                            {category.name}
                          </span>
                          {selected ? (
                            <span
                              className={`${active ? 'text-amber-600' : 'text-amber-600'}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <HiCheck className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="mx-3 text-xs">Sub-category</label>
        <div className="w-72">
          <Listbox value={selectedSub} onChange={setSelectedSub}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                <span className="block truncate">{selectedSub.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <HiSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {categories[index.catIndex].subcategories.map((category) => (
                    <Listbox.Option
                      key={category.name}
                      className={({ active }) =>
                        `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4 outline-none`
                      }
                      value={category}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                            {category.name}
                          </span>
                          {selected ? (
                            <span
                              className={`${active ? 'text-amber-600' : 'text-amber-600'}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <HiCheck className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default Categories;
