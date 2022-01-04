import BuilderAccordion from '../../components/BuilderAccordion';
import { courseBuildAtom } from '../../recoil/atoms/courseBuildAtom';
import { useRecoilState } from 'recoil';
import { FullCourse } from '../../types';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { toast } from 'react-toastify';
import CourseDetails from '../../components/CourseDetails';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';

const Builder: React.FC<{ courses: FullCourse }> = ({ courses }) => {
  const [courseInfo, setCourseInfo] = useRecoilState<FullCourse>(courseBuildAtom);
  const [session, setSession] = useState(null);
  const router = useRouter();

  console.log(courseInfo);
  useEffect(() => {
    if (courses) {
      setCourseInfo(courses);
    }
    if (courseInfo.title === '') {
      router.push('/');
    }
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setCourseInfo, courses, router, courseInfo.title]);

  const saveData = async () => {
    const id = toast.loading('Please wait...', {
      isLoading: true,
      position: toast.POSITION.BOTTOM_CENTER,
      theme: 'colored',
      closeOnClick: true,
    });
    if (courseInfo.id) {
      const { data, error } = await supabase.from('courses').upsert({
        id: courseInfo.id,
        title: courseInfo.title,
        slug: courseInfo.slug,
        description: courseInfo.description,
        image: courseInfo.image,
        subcategory: courseInfo.subcategory.id,
        author: courseInfo.author.id,
        content: courseInfo.content,
      });
      console.log(data, error);
    } else {
      const { data, error } = await supabase.from('courses').upsert({
        title: courseInfo.title,
        slug: courseInfo.slug,
        description: courseInfo.description,
        image: courseInfo.image,
        subcategory: courseInfo.subcategory.id,
        author: session.user.id,
        content: courseInfo.content,
      });
      console.log(data, error);
    }
    toast.update(id, {
      render: 'All is good',
      type: 'success',
      isLoading: false,
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 4000,
      theme: 'colored',
      closeOnClick: true,
    });
    toast.clearWaitingQueue();
  };

  return (
    <div className="w-full screen-h">
      <h1 className="mx-auto my-3 text-2xl text-center">{courseInfo.title}</h1>
      <Tab.Group>
        <Tab.List className="m-3 space-x-10 ">
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm outline-none text-gray-600'
                : 'bg-white p-3 text-sm text-gray-600'
            }
          >
            Build course
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 text-sm font-bold outline-none text-gray-600'
                : 'bg-white p-3 text-sm text-gray-600'
            }
          >
            Course details
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm outline-none text-gray-600'
                : 'bg-white p-3 text-sm text-gray-600'
            }
          >
            Price settings
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="outline-none">
            <div>
              <BuilderAccordion />
            </div>
          </Tab.Panel>
          <Tab.Panel className="outline-none">
            <CourseDetails />
          </Tab.Panel>
          <Tab.Panel className="outline-none">Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <div>
        <button onClick={saveData} className="p-3 border">
          Save course
        </button>
        <Link href="/">
          <a className="p-3 border">Home</a>
        </Link>
      </div>
    </div>
  );
};
export default Builder;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params.slug;
  const { data, error } = await supabase
    .from('courses')
    .select(`*, author(*), subcategory(id, name, main_category(name))`)
    .match({ slug });
  if (data.length === 0) {
    return {
      props: {},
    };
  }
  return {
    props: {
      courses: JSON.parse(JSON.stringify(data[0])),
    },
  };
};
