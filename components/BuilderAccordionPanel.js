import { Disclosure, Transition } from '@headlessui/react';

function BuilderAccordionPanel({ index }) {
  return (
    <div>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
          If youre unhappy with your purchase for any reason, email us within 90 days and well refund you in full, no
          questions asked. {index}
        </Disclosure.Panel>
      </Transition>
    </div>
  );
}

export default BuilderAccordionPanel;
