import { Dialog, Transition } from '@headlessui/react';
import produce from 'immer';
import { Fragment, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalLessonVideoAtom } from '../recoil/atoms/modalsAtom';
import { ToggleWithVideo } from '../types';
import VideoPlayer from './VideoPlayer';
import { AiOutlineClose } from 'react-icons/ai';

export default function VideoPreviewModal() {
  const [videoModal, setVideoModal] = useRecoilState<ToggleWithVideo>(modalLessonVideoAtom);

  function closeModal() {
    const close = produce(videoModal, (draft) => {
      draft.isOpen = false;
    });
    setVideoModal(close);
  }

  return (
    <>
      <Transition appear show={videoModal.isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto " onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className=" bg-opacity-0 inline-block w-full max-w-[500px] overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                <Dialog.Title as="div" className="flex justify-end">
                  <AiOutlineClose
                    className="w-5 h-5 text-black cursor-pointer hover:text-white "
                    onClick={closeModal}
                  />
                </Dialog.Title>
                <div className="">
                  <VideoPlayer videoUrl={videoModal.url} videoTitle={videoModal.title} />
                </div>

                {/* <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div> */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
