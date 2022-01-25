import { FullCourse } from '../../types';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useRecoilState } from 'recoil';
import { cartAtom } from '../../recoil/atoms/cartAtom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';
import { sumPrice } from '../../lib/helpers';

const Cart: React.FC<{}> = () => {
  const [cart, setCart] = useRecoilState<FullCourse[]>(cartAtom);
  const courses = (
    <div className="w-[250px] space-y-2 p-2">
      {cart.map((item, index) => (
        <div key={item.id}>
          {index < 4 && (
            <div className="flex space-x-1">
              <Image src={item.image} alt={item.title} width={40} height={40} objectFit="cover" layout="fixed" />
              <div className="flex flex-col">
                <p className="font-bold truncate ">{item.title}</p>
                <p className="text-gray-400 truncate text-2xs">{item.author.username}</p>
                {item.price === 0 ? (
                  <p className="text-xs">Free</p>
                ) : item.discount_price !== 0 ? (
                  <p className="text-xs">${item.discount_price}</p>
                ) : (
                  <p className="text-xs">${item.price}</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      {cart.length > 3 && (
        <div className="flex items-center justify-center">
          <p>...</p>
        </div>
      )}

      <div className="flex justify-between items-center border-t border-gray-400">
        <p className="mt-2">Summary:</p>
        <p className="font-bold text-xl mt-2">{sumPrice(cart)}$</p>
      </div>
      <div className="border-b border-gray-400" />
      <div className="flex justify-center w-full">
        <Link href="#">
          <a className="text-blue-400">Go to cart</a>
        </Link>
      </div>
    </div>
  );
  return (
    <div className="relative">
      {cart.length > 0 ? (
        <Tippy
          content={courses}
          animation="fade"
          interactive={true}
          arrow={false}
          theme="dark"
          placement="bottom-start"
          offset={[0, 20]}
          maxWidth="100%"
        >
          <div className="relative">
            <AiOutlineShoppingCart className="relative w-5 h-5 transition duration-150 ease-out transform cursor-pointer hover:scale-125" />
            {cart.length > 0 && (
              <span className="absolute z-10 text-[10px] font-bold text-red-300 -right-2 -top-3">{cart.length}</span>
            )}
          </div>
        </Tippy>
      ) : (
        <div className="relative">
          <AiOutlineShoppingCart className="relative w-5 h-5 transition duration-150 ease-out transform cursor-pointer hover:scale-125" />
        </div>
      )}
    </div>
  );
};

export default Cart;
