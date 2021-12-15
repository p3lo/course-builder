import Head from 'next/head';
import { modalCourseNameAtom } from '../recoil/atoms/modalsAtom';
import { useRecoilState } from 'recoil';
import BuilderAccordion from '../components/BuilderAccordion';

export default function Home() {
  const [showModal, setShowModal] = useRecoilState(modalCourseNameAtom);

  const toggleModal = (e) => {
    e.preventDefault();
    let toggle = { ...showModal };
    toggle.isOpen = true;
    setShowModal(toggle);
  };

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <BuilderAccordion />
      </div>
    </div>
  );
}
