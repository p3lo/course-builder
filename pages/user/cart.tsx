import produce from 'immer';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { sumPrice } from '../../lib/helpers';
import { cartAtom } from '../../recoil/atoms/cartAtom';
import { FullCourse } from '../../types';

const UserCart = () => {
  const [cart, setCart] = useRecoilState<FullCourse[]>(cartAtom);

  const removeFromCart = (id: number) => {
    const index = cart.findIndex((item) => item.id === id);
    const remove = produce(cart, (draft) => {
      draft.splice(index, 1);
    });
    setCart(remove);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full text-gray-300">
      <h1 className="flex py-10 text-4xl font-bold ">My cart</h1>
      {cart.length === 0 ? (
        <p className="py-[200px] flex justify-center ">Your cart is empty</p>
      ) : (
        <>
          <div className="flex flex-col w-2/3 p-5 space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="grid grid-cols-6 border ">
                <Image src={item.image} alt={item.title} width={150} height={100} objectFit="cover" />

                <div className="col-span-4 ">
                  <div className="flex flex-col px-3 py-2">
                    <Link href={`/detail/${item.slug}`}>
                      <a className="text-xl font-bold text-white truncate hover:text-blue-300">{item.title}</a>
                    </Link>
                    <p className="text-sm truncate ">{item.brief_description}</p>
                    <p className="text-sm text-white">{item.author.username}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center px-3 py-2 space-y-2">
                  <button className="text-xs" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                  {item.price === 0 ? (
                    <p className="text-2xl font-bold text-white">Free</p>
                  ) : item.discount_price !== 0 ? (
                    <p className="text-2xl font-bold text-white">{item.discount_price}$</p>
                  ) : (
                    <p className="text-2xl font-bold text-white">{item.price}$</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-end w-2/3 p-5 space-y-2">
            <div className="flex items-center justify-end px-2 space-x-3">
              <p className="mt-2 ">Summary:</p>
              <p className="mt-2 text-xl font-bold">{sumPrice(cart)}$</p>
            </div>
            <div className="flex items-center justify-end space-x-3">
              <button className="w-[150px] justify-end px-3 py-2 border">Payment</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCart;
