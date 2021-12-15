import Modal from '@material-tailwind/react/Modal';
import ModalHeader from '@material-tailwind/react/ModalHeader';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import Button from '@material-tailwind/react/Button';
import { modalCourseNameAtom } from '../recoil/atoms/modalsAtom';
import { useRecoilState } from 'recoil';
import Input from '@material-tailwind/react/Input';
import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';

function ModalCourseName() {
  const [showModal, setShowModal] = useRecoilState(modalCourseNameAtom);
  const [courseInfo, setCourseInfo] = useRecoilState(courseBuildAtom);

  const toggleModal = (e) => {
    e.preventDefault();
    let toggle = { ...showModal };
    toggle.isOpen = false;
    setShowModal(toggle);
  };

  const updateCourse = (e) => {
    e.preventDefault();
    let course = { ...courseInfo };
    course.courseName = 'Prvy moj kokot';
    course.courseDescription = 'Description kokota';
    course.author = 'Granko ne?';
    course.isDraft = true;
    setCourseInfo(course);
  };

  return (
    <>
      <Modal size="sm" active={showModal.isOpen} toggler={toggleModal}>
        <ModalHeader toggler={toggleModal}>Course Name</ModalHeader>
        <ModalBody>
          <Input type="text" color="lightBlue" size="sm" outline={false} placeholder="Small Input" />
        </ModalBody>
        <ModalFooter>
          <Button color="red" buttonType="link" onClick={toggleModal} ripple="dark">
            Close
          </Button>
          <Button color="green" onClick={updateCourse} ripple="light">
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalCourseName;
