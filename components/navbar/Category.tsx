import { CategoryType } from '../../types';
import { CgMenuGridO } from 'react-icons/cg';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Category: React.FC<{ categories: CategoryType[] }> = ({ categories }) => {
  const categoriesList = (
    <div className="flex flex-col space-y-3 m-2 w-[150px] ">
      {categories?.map((item) => (
        <a key={item.id}>{item.name}</a>
      ))}
    </div>
  );
  return (
    <div>
      <Tippy
        content={categoriesList}
        animation="fade"
        interactive={true}
        arrow={false}
        theme="dark"
        placement="bottom-start"
        offset={[0, 18]}
      >
        <div>
          <CgMenuGridO className="w-6 h-6 cursor-pointer" />
        </div>
      </Tippy>
    </div>
  );
};

export default Category;
