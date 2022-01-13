import BuilderAccordion from '../../components/builder/BuilderAccordion';
import { courseBuildAtom } from '../../recoil/atoms/courseBuildAtom';
import { useRecoilState } from 'recoil';
import { Category, FullCourse } from '../../types';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { toast } from 'react-toastify';
import CourseDetails from '../../components/builder/CourseDetails';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import PriceTab from '../../components/builder/PriceTab';

const Builder: React.FC<{ courses: FullCourse; categories: Category[] }> = ({ courses, categories }) => {
  const [courseInfo, setCourseInfo] = useRecoilState<FullCourse>(courseBuildAtom);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (courses) {
      setCourseInfo(courses);
    }
    // if (courseInfo.title === '') {
    //   router.push('/');
    // }
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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
        preview: courseInfo.preview,
        subcategory: courseInfo.subcategory.id,
        author: courseInfo.author.id,
        price: courseInfo.price,
        discount_price: courseInfo.discount_price,
        content: courseInfo.content,
      });
      console.log(data, error);
    } else {
      const { data, error } = await supabase.from('courses').upsert({
        title: courseInfo.title,
        slug: courseInfo.slug,
        description: courseInfo.description,
        image: courseInfo.image,
        preview: courseInfo.preview,
        subcategory: courseInfo.subcategory.id,
        author: session.user.id,
        price: courseInfo.price,
        discount_price: courseInfo.discount_price,
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
    <div className="w-full px-3 sm:px-5 md:px-14 xl:px-[100px] h-full text-white bg-gray-700 pb-5">
      <h1 className="py-3 mx-auto text-2xl font-bold text-center">{courseInfo.title}</h1>
      <div className="border-b border-gray-400" />
      <Tab.Group>
        <Tab.List className="m-3 space-x-1 ">
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm outline-none text-gray-200 bg-gray-600 w-56'
                : 'p-3 text-sm w-56 text-white hover:bg-gray-500 hover:shadow-md shadow-gray-800'
            }
          >
            Build course
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm outline-none text-gray-200 bg-gray-600 w-56'
                : 'p-3 text-sm w-56 text-white hover:bg-gray-500 hover:shadow-md shadow-gray-800'
            }
          >
            Course details
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm outline-none text-gray-200 bg-gray-600 w-56'
                : 'p-3 text-sm w-56 text-white hover:bg-gray-500 hover:shadow-md shadow-gray-800'
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
            <CourseDetails categories={categories} />
          </Tab.Panel>
          <Tab.Panel className="outline-none">
            <PriceTab />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <div className="flex py-5 space-x-2">
        <button onClick={saveData} className="px-3 py-2 w-[200px] border">
          Save course
        </button>
      </div>
    </div>
  );
};
export default Builder;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/login', permanent: false } };
  }
  // if (user?.app_metadata?.role !== 'admin') {
  //   return { props: {}, redirect: { destination: '/', permanent: false } };
  // }

  const slug = context.params.slug;
  const { data: course } = await supabase
    .from('courses')
    .select(`*, author(*), subcategory(id, main_category(id))`)
    .match({ slug });
  const { data: categories } = await supabase.from('categories').select('id,name, subcategories!inner(id, name)');
  if (course.length === 0) {
    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  }
  return {
    props: {
      courses: JSON.parse(JSON.stringify(course[0])),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};
