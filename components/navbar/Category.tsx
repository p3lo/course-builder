import { CategoryType } from '../../types';
import { CgMenuGridO } from 'react-icons/cg';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useState } from 'react';

const Category: React.FC<{ categories: CategoryType[] }> = ({ categories }) => {
  const [subCategories, setSubCategories] = useState([]);
  const setSubCats = (id: number) => {
    const index = categories.findIndex((item) => id === item.id);
    setSubCategories(categories[index].subcategories);
  };
  const categoriesList = (
    <div
      className=" group w-[200px] hover:w-[400px] hover:grid hover:grid-cols-2 "
      onMouseLeave={() => setSubCategories([])}
    >
      <div className="flex flex-col space-y-1 ">
        {categories?.map((item) => (
          <a className="p-1 cursor-pointer hover:text-blue-200" onMouseEnter={() => setSubCats(item.id)} key={item.id}>
            {item.name}
          </a>
        ))}
      </div>
      <div className="flex flex-col space-y-1 border-gray-500 group-hover:border-l ">
        {subCategories?.map((item) => (
          <a className="px-2 py-1 cursor-pointer hover:text-blue-200" key={item.id}>
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
  return (
    <div className="relative">
      <Tippy
        content={categoriesList}
        animation="fade"
        interactive={true}
        arrow={false}
        theme="dark"
        placement="bottom-start"
        offset={[0, 18]}
        maxWidth="100%"
      >
        <div>
          <CgMenuGridO className="w-6 h-6 cursor-pointer" />
        </div>
      </Tippy>
    </div>
  );
};

export default Category;
