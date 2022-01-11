import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Tab } from '@headlessui/react';
import Profile from '../../components/user/Profile';
import { FullCourse, ProfileType } from '../../types';
import MyCourses from '../../components/user/MyCourses';

const User: React.FC<{ courses: FullCourse[]; profile: ProfileType }> = ({ courses, profile }) => {
  useEffect(() => {
    console.log(profile, courses);
  }, [profile, courses]);
  return (
    <div className="w-full px-3 sm:px-5 md:px-14 xl:px-[100px] screen-h">
      <Tab.Group>
        <Tab.List className="m-3 space-x-10 ">
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 font-bold text-sm outline-none text-gray-600'
                : 'bg-white p-3 text-sm text-gray-600'
            }
          >
            Profile
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'border-blue-300 border-b-2 p-3 text-sm font-bold outline-none text-gray-600'
                : 'bg-white p-3 text-sm text-gray-600'
            }
          >
            My courses
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
            <Profile profile={profile} />
          </Tab.Panel>
          <Tab.Panel className="outline-none">
            <MyCourses courses={courses} />
          </Tab.Panel>
          <Tab.Panel className="outline-none"></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);

  const id = context.params.id;

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/login', permanent: false } };
  }
  if (user.id !== id) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }

  const { data: profile } = await supabase.from('profiles').select(`*`).match({ id });
  const { data: course } = await supabase
    .from('courses')
    .select(`*, author(*), subcategory(name, main_category(name))`)
    .eq('author', id);

  return {
    props: {
      profile: JSON.parse(JSON.stringify(profile[0])),
      courses: JSON.parse(JSON.stringify(course)),
    },
  };
};
