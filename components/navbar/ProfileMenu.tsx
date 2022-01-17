import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRef } from 'react';

const ProfileMenu = ({ session }) => {
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutDuration = 200;
  let timeout;

  const openMenu = () => buttonRef?.current.click();
  const closeMenu = () =>
    dropdownRef?.current?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      })
    );

  const onMouseEnter = (closed) => {
    clearTimeout(timeout);
    closed && openMenu();
  };
  const onMouseLeave = (open) => {
    open && (timeout = setTimeout(() => closeMenu(), timeoutDuration));
  };

  return (
    <Menu>
      {({ open }) => (
        <>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className="rounded-md shadow-sm focus:outline-none focus:border-white focus:ring-white"
            onClick={openMenu}
            onMouseEnter={() => onMouseEnter(!open)}
            onMouseLeave={() => onMouseLeave(open)}
          >
            <Menu.Button
              ref={buttonRef}
              className="flex items-center rounded-full cursor-pointer ring-1 ring-gray-200"
              as="div"
            >
              <Image
                src={session?.user.user_metadata.avatar_url}
                alt="Profile image"
                width={40}
                height={40}
                objectFit="fill"
                className="overflow-hidden rounded-full"
              />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              ref={dropdownRef}
              onMouseEnter={() => onMouseEnter(!open)}
              onMouseLeave={() => onMouseLeave(open)}
              static
              className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  <a>Kokot</a>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
export default ProfileMenu;
