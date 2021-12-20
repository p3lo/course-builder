import { modalCourseNameAtom } from '../recoil/atoms/modalsAtom';
import { useRecoilState } from 'recoil';
import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import { Modal, ModalBody, ModalHeader, ModalFooter } from './Modal';

function ModalCourseName() {
  const [showModal, setShowModal] = useRecoilState(modalCourseNameAtom);
  const [courseInfo, setCourseInfo] = useRecoilState(courseBuildAtom);

  const toggleModal = (): void => {
    let toggle = { ...showModal };
    toggle.isOpen = false;
    setShowModal(toggle);
  };

  const updateCourse = (): void => {
    let course = { ...courseInfo };
    course.courseName = 'Prvy moj kokot';
    course.courseDescription = 'Description kokota';
    course.author = 'Granko ne?';
    course.isDraft = true;
    setCourseInfo(course);
  };

  return (
    <>
      <Modal isOpen={showModal.isOpen} toggle={toggleModal}>
        <ModalHeader>Modal title</ModalHeader>

        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </ModalBody>

        <ModalFooter>
          <button
            onClick={toggleModal}
            className="text-white focus:outline-none m-1.5 rounded px-6 py-2 font-medium bg-red-500"
          >
            Close
          </button>
          <button
            onClick={updateCourse}
            className="text-white focus:outline-none m-1.5 rounded px-6 py-2 font-medium bg-blue-600"
          >
            Confirm
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalCourseName;
